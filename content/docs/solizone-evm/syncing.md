## Everything published can be read back

A Solizone chain is published to a Logos channel. That means a new node can rebuild the whole chain from Logos, and check it as it goes.

```bash
cargo run --bin solizone_node -- --storage local --sync-from-logos
```

Zoner wraps the same thing as `zoner sync`.

## How the sync works

```text
Logos channel (finalized history)
              ↓
take the Solizone blocks
(SZB1 and SZB2 inscriptions, in on-chain order)
              ↓
for each block:
  re-execute its transactions from the previous state
              ↓
  does the result match the block?
  - state root
  - receipts root
  - block hash
              ↓
accept the block, or stop
```

The node skips anything on the channel that is not a Solizone block, and it ignores blocks that were published twice.

A block is accepted only if executing its transactions **reproduces** the state root, the receipts root and the hash the block claims. Nothing is taken on trust.

## What happens when something is wrong

- A forged or corrupted block stops the import. The node keeps the verified blocks before it.
- If the channel has a gap, the importer reports the missing height and how many later blocks it could not import.
- The node refuses to merge into a data directory that already has a chain. Reset it first with `solizone_node reset`.

## Limits

- Only **finalized** blocks are read. Logos finalizes a block about 12 hours after it was included, so the newest blocks of a running chain are not importable yet.
- The first run reads Logos history from the beginning and prints its progress.
- Replay re-executes every block, so the time it takes grows with the length of the chain.

## Continuing after a sync

When the import finishes, the node starts on the imported chain. With `--publish`, it carries on publishing after the imported head instead of starting over.

## The replay engine

The component that does the verification is `solizone_evm::replay::ChainReplayer`. It re-executes blocks and checks every commitment.

Still open: a standalone validator that follows a live channel continuously, instead of importing once. See [The next phase](/docs/solizone-evm/next-phase).

## Tested so far

Sync is tested against in-memory chains. A full run against a live channel is still to do, because blocks only become readable after finality.