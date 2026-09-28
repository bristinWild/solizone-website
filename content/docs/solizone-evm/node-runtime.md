## The long-running Solizone EVM node

Solizone EVM now includes a long-running node runtime.

Run it with:

```bash
cargo run --bin solizone_node
```

The runtime combines:

```text
RevmExecutionEngine

MemoryState

BlockProducer

HybridBlockStore

LogosStorageCheckpointBackend
```

into one continuously operating process.

## Runtime lifecycle

The node currently follows this loop:

```text
execute transaction
      ↓
produce block
      ↓
store block
      ↓
enforce local retention
      ↓
archive old block if needed
      ↓
create checkpoint
      ↓
upload checkpoint
      ↓
next block
```

This happens continuously while the node is running.

## What happens when the node stops?

Suppose the node has reached:

```text
block #6
```

The process stops.

At this point we may have:

```text
latest execution checkpoint
→ Logos Storage

recent blocks
→ local

older blocks
→ Logos Storage
```

The process itself disappears.

The chain state does not.

## Node recovery

When Solizone EVM starts again, it checks for a previous checkpoint.

```text
checkpoint exists?
      │
 ┌────┴────┐
 │         │
no        yes
 │         │
fresh     recover
```

Recovery looks like:

```text
checkpoint CID
      ↓
Logos Storage
      ↓
download checkpoint
      ↓
restore MemoryState
      ↓
restore next_height
      ↓
restore parent_hash
```

If the checkpoint says:

```text
next_height = 7
parent_hash = hash(block #6)
```

then Solizone EVM knows exactly where execution should resume.

## Chain-head verification

Before continuing, the node verifies that the recovered chain position matches the stored block history.

```text
checkpoint parent hash
        ↓
compare
        ↑
hash(block #6)
```

If they match:

```text
Chain-head verification passed
```

Now the node can safely continue.

```text
block #6
   ↓
restart
   ↓
block #7
```

Block `#7` points back to `#6`.

This is the same chain continuing across a process restart.