## The core module

`solizone_module` is a Logos **core module** written in Rust. The Rust trait `SolizoneModule` in `rust-lib/src/lib.rs` is its contract. Logos' module builder derives the interface from it.

- Every method returns JSON text. Failures return `{"error": "…"}`.
- Amounts are decimal wei strings.
- Bytecode, calldata and constructor arguments are hex strings.
- `account` is the index of a pre-funded development account.

## Methods

| Group | Methods |
|---|---|
| Lifecycle | `start(dataDir)`, `stop`, `status`, `accounts` |
| Rooms | `list_rooms`, `create_room`, `open_room`, `share_room`, `join_room` |
| Compile | `compile(source)`, `compile_file(path)` |
| Files | `fs_list`, `fs_read`, `fs_write`, `fs_create`, `fs_mkdir`, `fs_rename`, `fs_delete` |
| Chain | `deploy`, `send`, `read`, `receipt`, `encode`, `decode`, `rpc` |
| Collaboration | `net_start`, `net_stop`, `net_status`, `collab_hello`, `collab_poll`, `collab_incoming` |
| Publishing | `publish_status`, `publish_start`, `publish_stop`, `publish_use_address`, `publish_import` |

`start("")` uses `~/.solicamp`.

## Calling it from QML

The interface has no chain logic. It calls the module through the Basecamp bridge:

```qml
logos.callModuleAsync("solizone_module", "compile_file", [path], function (result) {
    // result is JSON text
})
```

## Source map

```text
rust-lib/src/
├── lib.rs        the module contract and thin wrappers
├── engine.rs     chain logic: start, rooms, deploy, send, compile
├── solc.rs       finds, verifies and runs the Solidity compiler
├── workspace.rs  per-room .sol files and folders
├── rooms.rs      separate chains with their own ids
├── collab.rs     host and guest protocol (no networking)
├── net.rs        carries collaboration messages over Logos Messaging
├── publish.rs    Publish to Bedrock: wallet, funding, status
└── vendor/       the Solizone node and a patched Logos Rust SDK
```

## Tests

```bash
cd solizone-module/rust-lib
cargo test --lib
```

The tests cover the workspace and path checks, solc output parsing and compiler lookup, the collaboration protocol (including an in-memory two-person room), the publishing state machine and the funding choice.