## The next major phase

The next major development phase is about making Solizone EVM look like an Ethereum network to external developer tooling.

The target flow is:

```text
Foundry / MetaMask / ethers / viem
              ↓
      Ethereum JSON-RPC
              ↓
 signed Ethereum transaction
              ↓
           mempool
              ↓
        BlockProducer
              ↓
             REVM
              ↓
      Solizone EVM state
              ↓
       canonical block
```

That requires several components.

## Raw Ethereum transactions

Today, the internal runtime constructs Solizone transactions directly.

The next step is:

```text
raw signed transaction
       ↓
decode envelope
       ↓
recover sender
       ↓
validate nonce
       ↓
validate gas / fees
       ↓
admit transaction
       ↓
Solizone execution
```

This is the bridge between Ethereum tooling and the current execution engine.

## Transaction pool

Once external users can submit transactions, those transactions need somewhere to wait before block production.

```text
RPC
 ↓
transaction
 ↓
mempool
 ↓
BlockProducer
```

The mempool will become the boundary between transaction ingestion and block construction.

## Ethereum JSON-RPC

The developer-facing goal is that familiar tools can talk to Solizone EVM using APIs they already understand.

Examples:

```text
eth_sendRawTransaction

eth_call

eth_getBalance

eth_getTransactionCount

eth_getCode

eth_getTransactionReceipt
```

The exact supported RPC surface will grow gradually.

## Re-execution validation

Another important future milestone is independent block execution.

A verifier should eventually be able to receive a Solizone block and do:

```text
previous state
     ↓
block transactions
     ↓
REVM
     ↓
new state
     ↓
calculate commitments
     ↓
compare with block
```

This strengthens independent verification and is important for a multi-node execution environment.

## Canonical discovery

Today, Solizone EVM has local metadata that knows:

```text
latest checkpoint CID

height
→ block hash
→ CID
```

This works for the current node.

A distributed execution network needs more.

Nodes need a reliable way to discover:

```text
What is the latest canonical Solizone head?

What is the latest accepted checkpoint?

Where is block N?

Which CID corresponds to the canonical block?
```

This discovery mechanism is still future work.

## Replication and durability

Content-addressed storage tells us what object we are retrieving.

It does not automatically answer:

```text
How many nodes store it?

How long will they store it?

What happens if providers leave?

What replication factor do we require?
```

Those are important protocol and operational questions.

Solizone EVM's current integration proves the storage lifecycle.

A production deployment will need an explicit replication strategy.

## Crash consistency

The long-running node currently follows:

```text
produce block
      ↓
store block
      ↓
save checkpoint
```

This is the correct logical order because a checkpoint should never point to a block that does not exist.

But a production node must also handle failures between those steps.

For example:

```text
block saved
      ↓
process crashes
      ↓
checkpoint not yet updated
```

Future hardening needs reconciliation logic or an atomic commit design for this boundary.

## A future Solizone EVM node

The longer-term node architecture looks roughly like this:

```text
             Ethereum tooling
                    ↓
               JSON-RPC
                    ↓
                 mempool
                    ↓
              BlockProducer
                    ↓
                  REVM
                    ↓
                EVM state
                    ↓
             Solizone block
               /        \
              /          \
             ↓            ↓
      recent history    publication
             ↓            ↓
       local storage     Logos
             │
             ↓
      historical archive
             ↓
       Logos Storage
```

A verifier could independently replay blocks and check resulting commitments.

That is the direction Solizone EVM is moving toward.

## What's next?

The next major milestones for Solizone EVM are:

1. raw signed Ethereum transaction support
2. transaction decoding and sender recovery
3. transaction admission rules
4. Solizone transaction pool
5. Ethereum-compatible JSON-RPC
6. Foundry / ethers / viem / wallet connectivity
7. independent block re-execution
8. stronger canonical discovery
9. production storage durability
10. production node hardening

The goal remains simple:

**make EVM development feel familiar while building it natively around the Logos architecture.**