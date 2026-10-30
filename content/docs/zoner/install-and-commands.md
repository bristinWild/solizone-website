## Install

You need [Rust](https://rustup.rs) and [Foundry](https://getfoundry.sh).

```bash
git clone https://github.com/bristinWild/Zoner
cd Zoner
cargo install --path .
```

`zoner node` runs the `solizone_node` binary, which you build from the [Solizone repository](https://github.com/bristinWild/solizone):

```bash
cd solizone/solizone-evm
cargo build --release --bin solizone_node
```

Then do one of these:

- put `solizone_node` next to the `zoner` binary
- put it on your `PATH`
- point to it with `SOLIZONE_NODE=/path/to/solizone_node`

## Commands

### `zoner init [DIR]`

Creates a Foundry project preconfigured for Solizone (chain id `9001`):

- `foundry.toml` with a `solizone` RPC endpoint
- an example `Counter` contract
- a `.gitignore` and a short README

It never overwrites files. If one of them already exists, Zoner stops and says which.

### `zoner node [flags]`

Runs `solizone_node`. All flags after `node` are passed through, and so is the `reset` subcommand.

- It defaults to `--storage local`, so you do not need Basecamp.
- Chain data goes in `~/.zoner`, not in your project folder. Use `--data-dir DIR` to change it.

### `zoner sync [flags]`

The same as `node`, with `--sync-from-logos` added. It rebuilds the chain from Logos, replays and verifies every block, then keeps running.

A sync needs an empty data directory, so run `zoner node reset` first. See [Syncing from Logos](/docs/solizone-evm/syncing).

### `zoner deploy CONTRACT`

Runs `forge create` against the node.

```text
zoner deploy CONTRACT [--rpc URL] [--account N | --private-key KEY]
                      [--constructor-args ARG...]
```

- `CONTRACT` is `path/File.sol:Contract`, or just `Contract`, which Forge resolves.
- `--account N` picks one of the five development accounts (0 to 4). The default is 0.
- `--private-key KEY` overrides the account.
- Everything after `--constructor-args` goes to the constructor, flags included.

### `zoner status [--rpc URL]`

Shows the chain id, the head block, and how far publication to Logos has got.

```text
chain id:    9001
head block:  #12
publishing:  next block #13, 0 not yet submitted, 3 waiting for Logos finalization
  block #12     submitted
  block #11     submitted
  block #10     finalized
```

If publishing is off, it says so and tells you to start the node with `--publish`.

### `zoner accounts`

Lists the five pre-funded development accounts and their balance. The keys are **public test keys**. Never use them for real value.

## Configuration

| Variable | Meaning |
|---|---|
| `SOLIZONE_NODE` | Path to the `solizone_node` binary. Default: next to `zoner`, then `PATH`. |
| `FORGE_FLAGS` | Extra flags for `forge create`, for example `--use /path/to/solc` or `--offline`. They go before `--constructor-args`, which must stay last. |

Defaults: RPC `http://127.0.0.1:8545`, chain id `9001`, chain data in `~/.zoner`.