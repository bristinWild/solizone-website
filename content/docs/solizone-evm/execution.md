## What runs the EVM?

Solizone EVM currently uses **REVM** as its execution engine.

REVM is responsible for executing EVM bytecode.

That means Solizone EVM can already work with concepts familiar to Ethereum developers:

- EOAs
- contract deployment
- contract calls
- balances
- nonces
- bytecode
- storage slots
- gas
- transaction execution
- execution receipts

The execution path looks like this:

```text
Solidity contract
      ↓
compiled EVM bytecode
      ↓
Solizone transaction
      ↓
REVM
      ↓
execution result
      ↓
state update
```

The important architectural decision is that **REVM only handles execution**.

REVM does not need to know:

- how Logos Storage works
- how Logos consensus works
- how publication happens
- how old blocks are archived

That separation keeps the execution layer clean.

## Stateful execution

Solizone EVM is not just executing isolated transactions.

It maintains persistent EVM state.

For example:

```text
Alice balance = 1000
Alice nonce   = 0
```

Alice sends a transaction.

After execution:

```text
Alice balance = 900
Alice nonce   = 1
Bob balance   = 100
```

The next transaction starts from this new state.

The same applies to contracts.

Imagine a contract contains:

```text
count = 0
```

Someone calls:

```text
increment()
```

Now:

```text
count = 1
```

The next call sees:

```text
count = 1
```

not:

```text
count = 0
```

This sounds obvious for a blockchain, but it is one of the important transitions from “running the EVM” to building an actual execution environment.

## MemoryState

Inside Solizone EVM, the active execution state is managed through `MemoryState`.

Conceptually:

```text
MemoryState
├── accounts
├── balances
├── nonces
├── contract bytecode
└── contract storage
```

This state is what REVM reads from and writes to during execution.

```text
          ┌─────────────┐
          │ MemoryState │
          └──────┬──────┘
                 │
          read / write
                 │
                 ↓
               REVM
```

The result is a continuously evolving EVM state.

## Transactions

Solizone EVM currently has its own internal transaction representation.

A transaction contains information such as:

```text
sender
nonce
transaction kind
value
data
gas limit
```

Transaction kinds can represent actions such as:

```text
Call(address)
Create
```

The transaction is passed to REVM, executed against the current state, and converted into a Solizone execution result.

Raw signed Ethereum transaction ingestion is part of the next development phase.

Eventually the goal is:

```text
MetaMask / Foundry / ethers / viem
              ↓
      Ethereum JSON-RPC
              ↓
   signed Ethereum transaction
              ↓
        Solizone EVM
              ↓
             REVM
```

## Execution receipts

Every transaction produces an execution result.

Solizone EVM converts this into a receipt containing information about what happened during execution.

Conceptually:

```text
transaction
    ↓
execution
    ↓
receipt
```

Receipts allow the system to record outcomes such as:

- execution success or failure
- gas usage
- output
- execution metadata

Solizone EVM also derives deterministic commitments for transactions and receipts.

These commitments later become part of the block.

## State roots

After execution, Solizone EVM computes a deterministic commitment representing its resulting state.

```text
EVM state
   ↓
deterministic encoding
   ↓
state_root
```

The `state_root` belongs to the **protocol layer**.

It represents the execution state associated with a Solizone block.

It should not be confused with persistence checkpoints.

These are two separate concepts.

```text
state_root
→ protocol commitment

checkpoint
→ recovery mechanism
```

That distinction is important throughout the Solizone EVM architecture.