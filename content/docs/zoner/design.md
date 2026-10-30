## Design

Zoner is deliberately small, about 750 lines of Rust. These choices keep it that way.

## A companion, not a replacement

`forge` and `cast` stay the daily tools. Zoner only adds the parts that are specific to Solizone: running a node, choosing the right chain settings, and reading publication status.

## A clean boundary

Zoner talks to a node only through two things:

- the Ethereum JSON-RPC endpoint, plus `solizone_publicationStatus`
- the `solizone_node` command line

It has no code dependency on the node crate. The node can change without breaking Zoner.

## Safe by default

- `zoner init` never overwrites your files.
- The development keys are public test keys, and Zoner says so every time it prints them.
- Chain data stays in `~/.zoner` instead of your project folder.

## Local first

No wallet, no tokens and no Logos node are needed to start. Publishing to Logos is a separate, deliberate step.

## Escape hatches

- `FORGE_FLAGS` passes extra flags to forge.
- `SOLIZONE_NODE` selects the node binary.
- `--rpc` points `deploy` and `status` at any node.

## What Zoner does not bundle

Zoner does not include Foundry or the node. You install them yourself.