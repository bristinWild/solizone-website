## Publication to Logos

Solizone EVM also has a publication boundary.

Canonical Solizone block bytes can be passed through:

```text
Solizone block
      ↓
BlockPublisher
      ↓
LogosPublisher
      ↓
ZoneSequencer
      ↓
Logos
```

This lets Solizone EVM keep block production independent from the underlying publication implementation.

The block producer does not need to understand Logos internals.

It simply produces canonical blocks.

The publisher handles the next boundary.

## Publication and storage are different

A Solizone block can interact with Logos in two fundamentally different ways.

### Logos Storage

```text
block bytes
→ stored
→ retrieved by CID
```

Purpose:

```text
persistence
history
recovery
```

### Logos blockchain

```text
canonical block data
→ published
→ ordered
→ finalized
```

Purpose:

```text
shared ordering
consensus
finality
```

These responsibilities should not be mixed.