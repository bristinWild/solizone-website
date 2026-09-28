## Logos Storage integration

Solizone EVM now integrates Logos Storage directly into its persistence architecture.

It is currently used for two major purposes:

```text
1. execution checkpoints
2. historical canonical blocks
```

This means Logos Storage is no longer just an external experiment around Solizone EVM.

It is part of the node's storage lifecycle.

## Checkpoints in Logos Storage

The flow looks like this:

```text
SolizoneCheckpoint
       ↓
serialize
       ↓
Logos Storage
       ↓
CID
```

The returned CID identifies the stored content.

Solizone EVM keeps metadata pointing to the latest checkpoint CID.

During recovery:

```text
latest checkpoint CID
        ↓
Logos Storage
        ↓
download
        ↓
decode
        ↓
restore state
```

## Why use Logos Storage?

A blockchain node can accumulate a lot of historical data.

A simple architecture could say:

```text
keep everything locally forever
```

But that means:

```text
more history
→ more disk
→ higher node requirements
→ harder node operation
```

Solizone EVM takes a different approach.

Keep the data needed frequently close to execution.

Move older history into the storage layer.

```text
hot data
→ local

cold historical data
→ Logos Storage
```

This is where the **Hybrid Storage Layer** comes in.

## HybridBlockStore

`HybridBlockStore` is the main block-storage abstraction currently used by the Solizone EVM runtime.

Its mental model is:

```text
HybridBlockStore
        │
   ┌────┴────┐
   │         │
 local     archive
   │         │
   ↓         ↓
recent     Logos
blocks     Storage
```

The caller does not need to know where the block lives.

You can conceptually ask:

```text
Give me block #2.
```

HybridBlockStore decides how to find it.

## Local-first lookup

Block reads work like this:

```text
request block
     ↓
check local store
     ↓
found?
 ┌───┴───┐
 │       │
yes      no
 │       │
return   archive index
             ↓
             CID
             ↓
        Logos Storage
             ↓
         download
             ↓
         validate
             ↓
          return
```

That makes local and remote history feel like one logical block store.

## Bounded local storage

Solizone EVM supports a configurable retention window.

For example:

```text
retention = 3 blocks
```

Imagine the chain becomes:

```text
0 1 2
```

All three are local.

Then block `3` arrives.

Instead of keeping:

```text
0 1 2 3
```

the node does:

```text
block #0
   ↓
archive to Logos Storage
   ↓
record CID
   ↓
remove local copy
```

Now:

```text
local
1 2 3

archive
0
```

Produce block `4`:

```text
local
2 3 4

archive
0 1
```

Produce block `5`:

```text
local
3 4 5

archive
0 1 2
```

The total chain continues growing.

The local historical window does not.

## Archive index

If an old block is in Logos Storage, Solizone EVM needs to know how to locate it.

The current archive index maps:

```text
height
→ canonical block hash
→ CID
```

For example:

```text
#2
→ 0x7dfb...
→ zDvZR...
```

The block hash matters because storage location and block identity are different concepts.

## Trusting retrieved history

Solizone EVM does not simply download a file from storage and assume it is correct.

Recovered historical blocks go through verification.

```text
download bytes
      ↓
decode SZB1
      ↓
validate block
      ↓
calculate block hash
      ↓
compare with canonical hash
      ↓
accept
```

That leads to one of the core design ideas behind the storage model:

> **Where the bytes live can change. What the canonical block is cannot.**

Logos Storage stores data.

Solizone EVM determines and verifies execution history.

## Storage is not consensus

This distinction matters.

Logos Storage does not decide:

```text
which block wins
which state is canonical
which transaction came first
```

Its responsibility is storage and retrieval.

Conceptually:

```text
Logos Storage
→ bytes

Solizone EVM
→ execution

Logos blockchain
→ ordering / consensus / finality
```

These should remain separate.