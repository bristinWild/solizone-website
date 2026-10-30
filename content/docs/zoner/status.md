## Where Zoner stands

Zoner is at **v0.1**. The core commands work. The pure logic (argument parsing, deploy command building, the project template and the status summary) has unit tests.

| Feature | State |
|---|---|
| `init`, `node`, `deploy`, `status`, `accounts` | Working |
| `sync` (rebuild and verify from Logos) | Working. Verified on in-memory chains. A run against a live channel is next. |

## Limits

- Fees on Solizone are zero for now, so there is no gas market to configure.
- Zoner needs `solizone_node` and Foundry installed. It bundles neither.
- `zoner sync` can only read finalized blocks, which arrive about 12 hours after publication.

## Roadmap

- A live-channel sync test and a short demo recording
- `zoner test` helpers and a snapshot workflow
- Prebuilt node binaries, so installation is a single command
- Helpers for published blocks, such as a block explorer view
- Windows and Linux packaging

## Contributing

Issues and pull requests are welcome, especially from builders who try the quick start and tell us where it was hard. The code is at [github.com/bristinWild/Zoner](https://github.com/bristinWild/Zoner).