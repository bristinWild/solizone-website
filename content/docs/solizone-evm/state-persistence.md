## Checkpoints

The EVM state also needs to survive restarts.

Solizone EVM uses `SolizoneCheckpoint`.

A checkpoint contains:

```text
SolizoneCheckpoint
├── StateSnapshot
├── next_height
└── parent_hash
```

So the checkpoint captures both:

**execution state**

and

**chain position**

Together they answer:

```text
What does the EVM currently look like?

and

Where should the next block continue from?
```

## State snapshots

A `StateSnapshot` is a deterministic representation of the current EVM state.

It can include:

```text
accounts
balances
nonces
contract bytecode
contract storage
```

The snapshot can be serialized.

Later:

```text
snapshot
   ↓
decode
   ↓
new MemoryState
```

This lets a completely new process reconstruct the execution environment.

## Snapshot commitment vs state root

These two are intentionally separate.

### State root

```text
current protocol state
      ↓
state_root
```

Used for execution and block correctness.

### Snapshot commitment

```text
serialized snapshot
      ↓
Keccak256
      ↓
snapshot_commitment
```

Used to fingerprint persisted state.

They may describe related information, but they serve different jobs.

## Persistence backends

Solizone EVM keeps persistence behind interfaces.

For checkpoints:

```text
CheckpointBackend
├── FileCheckpointBackend
└── LogosStorageCheckpointBackend
```

This is important because the execution layer should not care where the checkpoint lives.

From the node's perspective:

```text
checkpoint_backend.save(checkpoint)
```

could mean:

```text
write to disk
```

or:

```text
upload to Logos Storage
```

without changing REVM itself.