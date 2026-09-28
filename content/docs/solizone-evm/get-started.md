## Start locally

Enter the implementation:

```bash
cd solizone-evm
```

Check the project:

```bash
cargo check
```

Run the tests:

```bash
cargo test
```

Run the long-running Solizone EVM node:

```bash
cargo run --bin solizone_node
```

Reset its current runtime state:

```bash
cargo run --bin solizone_node -- reset
```

Run the Logos publication harness:

```bash
cargo run --bin publish
```

Check the Logos Storage peer:

```bash
logosctl call storage_module peerId
```