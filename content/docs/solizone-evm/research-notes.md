## Notes for researchers

This chapter lists the design choices and open questions that matter if you want to evaluate Solizone or build on it. It is deliberately plain about what is and is not claimed.

## Validity model

Validity is checked by **replay**, not by proofs.

A verifier re-executes every transaction from genesis and compares the state root, the receipts root and the block hash. There are no fraud proofs and no validity proofs.

The cost of verification grows with the length of the chain. Checkpoints exist so that a node can restart quickly. A checkpoint is a convenience for the node that made it. It is not a proof for anyone else.

## Data availability

Blocks are published to a Logos zone channel as inscriptions. Logos provides the ordering and availability of those bytes.

A block that is too large for one inscription stops publication. Splitting large blocks is open work.

## Finality

Solizone inherits Logos finality, which is slow: about 43,000 slots, roughly 12 hours at one slot per second.

That gives two states for a block:

```text
locally executed   →   instant
finalized on Logos →   hours later
```

Other nodes can read a block only after it finalizes. The `orphaned` publication state exists because Logos can drop a transaction. The node then rewinds its cursor and publishes that block and the following ones again.

## Sequencing

A single sequencer key produces blocks for a chain. There is no decentralized sequencing and no forced-inclusion path. Verifiers can detect a bad block after the fact, but nothing prevents a sequencer from censoring a transaction.

That is acceptable for a developer network and a research prototype. It is not a production design.

## Commitments

`state_root` is a Solizone commitment. It is **not** an Ethereum Merkle-Patricia root.

- Tools that expect Ethereum state proofs, such as `eth_getProof`, do not work.
- Fixed-size headers and Keccak-256 hashing keep the format simple to implement in another language.

## Storage trust

Logos Storage is treated as untrusted content storage. Every block fetched from it is decoded, validated and hash-checked.

The latest checkpoint CID and the `height → block hash → CID` index are held locally today. A network-level way to discover them is open work.

## Privacy

The execution layer is a **transparent EVM**. There is no confidential execution today.

The privacy properties in the Solizone ecosystem are about how developers work:

- the node and the compiler run on your machine
- nothing leaves the machine until you choose to publish
- shared rooms in [Solicamp](/docs/solicamp) are sealed end to end

Contract-level privacy would need a different execution layer. It is not claimed here.

## Open research questions

- Replacing replay with succinct validity proofs, and what that would cost.
- A safe way to run more than one sequencer for a chain.
- A canonical-head discovery protocol on top of Logos Storage.
- Compact block encoding and splitting for large blocks.
- Fee design when a chain pays Logos for inscriptions but charges its own users nothing.
- Ethereum-compatible state proofs on a commitment that is not a Merkle-Patricia trie.