## Running the node inside another program

`solizone_evm::embedded::EmbeddedNode` runs the whole node inside another Rust program. That includes execution, the mempool, block production, storage and optional publishing to Logos.

This is how [Solicamp](/docs/solicamp) runs a chain inside Logos Basecamp, with no child process and no open port.

```rust
use solizone_evm::embedded::{EmbeddedConfig, EmbeddedNode};

let node = EmbeddedNode::start(EmbeddedConfig::local("/path/to/data"))?;

// One JSON-RPC request in, one response out, no socket involved.
let reply = node.request(r#"{"jsonrpc":"2.0","id":1,"method":"eth_chainId","params":[]}"#);

node.stop();
```

## What the host gets

- The node owns its own runtime and block-production thread, so the host needs neither.
- `node.request(...)` takes one JSON-RPC request and returns one response. It serves the same methods as the HTTP server: `eth_*`, `net_*`, `web3_*` and `solizone_*`.
- A bad request gets a JSON-RPC error response. It never causes a panic.

## Optional extras

`EmbeddedConfig` can also:

```text
publish: Some(PublishSettings { .. })    publish blocks to Logos
rpc:     Some(addr)                      serve HTTP for Foundry, Zoner or a wallet
```

Data directory handling, recovery and reset live in `solizone_evm::service`. The `solizone_node` binary uses the same code, so an embedded node and a standalone node behave the same way.

## Building without Logos

The Logos publishing code sits behind the Cargo feature `logos`. It pulls in the Logos node crates, including RocksDB.

A program that only needs the EVM node (compile, deploy, call) can leave it out:

```toml
solizone-evm = { path = "...", default-features = false }
```

Solicamp turns the feature on, because it offers "Publish to Bedrock".