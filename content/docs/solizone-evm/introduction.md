## What is Solizone EVM?

**An EVM execution environment built for the Logos ecosystem.**

Solizone EVM is a stateful, restartable EVM execution layer that lets developers execute Solidity contracts and Ethereum-style transactions while using the Logos stack for publication, persistence, ordering, and finality.

Think of it as the EVM side of a modular Logos-native execution architecture.

```text
Solidity
   ↓
Solizone EVM
   ↓
Execution + State + Blocks
   ↓
Logos
```

Solizone EVM is part of the broader **Solizone ecosystem**.

Over time, Solizone may include multiple products and developer tools such as:

```text
Solizone
├── Solizone EVM
├── Zoner
├── Solicamp
└── future tooling
```

This page focuses entirely on **Solizone EVM**.

> Solizone EVM is an independent project and is not an official Logos project.

## Why Solizone EVM?

Ethereum developers already have a powerful programming environment.

They have:

- Solidity
- the EVM
- Foundry
- ethers
- viem
- wallets
- years of tooling and developer knowledge

The question behind Solizone EVM is:

> Can we bring that familiar execution environment into the Logos ecosystem without rebuilding the entire blockchain stack from scratch?

That is the direction Solizone EVM is taking.

Instead of trying to make Solizone EVM responsible for everything, the architecture separates responsibilities.

```text
Solizone EVM
→ execute transactions
→ maintain EVM state
→ produce blocks
→ maintain execution history
→ verify execution data

Logos Storage
→ persist checkpoints
→ store older block history

Logos blockchain
→ publication
→ ordering
→ consensus
→ finality
```

This keeps the execution environment focused on one thing:

**executing EVM programs well.**

## The simple mental model

The easiest way to understand Solizone EVM is to think of it as an execution machine with memory.

A transaction enters.

REVM executes it.

The EVM state changes.

Solizone EVM records the result.

A block is produced.

That block becomes part of the Solizone EVM chain.

```text
transaction
    ↓
   REVM
    ↓
state transition
    ↓
receipt
    ↓
Solizone block
```

Then the cycle continues.

```text
block #0
   ↓
block #1
   ↓
block #2
   ↓
block #3
   ↓
...
```

Each block points to the previous block using its parent hash.

That gives Solizone EVM its own canonical execution history.