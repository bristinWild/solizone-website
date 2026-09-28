## BlockStore abstraction

The node currently has multiple block-store implementations.

```text
BlockStore
├── MemoryBlockStore
├── FileBlockStore
└── HybridBlockStore
```

This abstraction allows different environments to use different storage policies.

For example:

```text
tests
→ MemoryBlockStore

local persistence
→ FileBlockStore

long-running hybrid node
→ HybridBlockStore
```

The block producer itself does not need to be rewritten for every storage mechanism.

## CheckpointBackend abstraction

The same pattern exists for checkpoints.

```text
CheckpointBackend
├── FileCheckpointBackend
└── LogosStorageCheckpointBackend
```

This is one of the central architectural rules in Solizone EVM:

> Execution should not depend directly on infrastructure.

REVM executes.

State management maintains EVM state.

Backends persist it.

Publishers publish blocks.

Each boundary can evolve independently.

## Why Solizone EVM is being built this way

The architecture follows a few simple principles.

### 1. Execution should stay focused

```text
REVM
→ execute EVM
```

No storage networking.

No consensus logic.

No publisher-specific behavior.

### 2. Infrastructure should be replaceable behind boundaries

```text
CheckpointBackend

BlockStore

BlockPublisher
```

These interfaces let the system evolve without rewriting execution.

### 3. Storage is not consensus

```text
storage
≠
canonical ordering
```

Being able to retrieve some bytes does not automatically make those bytes canonical.

### 4. Historical data should remain verifiable

A remote object should never be trusted simply because it came from storage.

```text
retrieve
→ decode
→ validate
→ hash-check
```

### 5. Normal nodes should not automatically become archive servers

Different node roles should eventually be able to make different storage trade-offs.