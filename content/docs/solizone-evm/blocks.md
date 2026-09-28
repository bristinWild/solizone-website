## Solizone blocks

Transactions are grouped into canonical Solizone EVM blocks.

Solizone EVM currently uses its own block format:

```text
SZB1
```

A block contains the information needed to represent one step in the Solizone execution chain.

Conceptually:

```text
SolizoneBlock
├── header
└── transactions
```

The header contains commitments and chain metadata.

Blocks are deterministic and hashable.

```text
Solizone block bytes
        ↓
      hash
        ↓
canonical block ID
```

## Parent-linked chains

Each block contains the hash of its parent.

That gives us:

```text
block #0
hash A
   ↓
block #1
parent = A
hash B
   ↓
block #2
parent = B
hash C
```

This relationship is what makes the blocks a chain instead of just independent execution batches.

The `BlockProducer` is responsible for maintaining this progression.

## BlockProducer

The `BlockProducer` tracks:

```text
next block height
parent block hash
chain configuration
```

For each new block:

```text
transactions
     ↓
BlockProducer
     ↓
REVM execution
     ↓
new state
     ↓
new Solizone block
```

Then it updates:

```text
parent_hash = newly produced block hash
next_height += 1
```

The next block continues from there.

## Restarting the producer

A blockchain node should not forget where it was every time the process stops.

Solizone EVM can restore the producer using:

```text
next_height
parent_hash
```

For example:

```text
last block = #6

next_height = 7
parent_hash = hash(block #6)
```

After restart:

```text
produce block #7
parent = hash(block #6)
```

The chain continues instead of restarting.