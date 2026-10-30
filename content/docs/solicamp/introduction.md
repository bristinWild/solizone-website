## What is Solicamp?

**Remix for Logos.** Write, compile, deploy and test Solidity inside Logos Basecamp, then publish to Bedrock when you are ready.

Solicamp is a Solidity playground that runs inside [Logos Basecamp](https://logos.co). It is a local, Anvil-like sandbox first. **Nothing is published and no fees are paid until you press Publish.**

```text
┌ Solicamp UI (native Qt QML) ──────────────┐
│ editor · files · rooms · interact · publish│
└──────────────────┬─────────────────────────┘
                   ↓  Basecamp bridge
┌ solizone_module (Rust core module) ────────┐
│ embedded Solizone EVM node (REVM)          │
│ solc · workspace · rooms · collaboration   │
│ optional publishing to Logos               │
└────────────────────────────────────────────┘
```

> Solicamp is an independent project and is not an official Logos project.

## Why it exists

Logos needs builders, and most builders already know Solidity. Solicamp gives them a familiar place to try an idea inside Basecamp, with nothing to install except two packages and no server to run.

## What makes it different

- **Native.** A Rust module and a native QML interface. There is no web view and no hosted backend.
- **Private by design.** Your chain and your files stay on your machine. Shared rooms are sealed with a key that only travels inside the invite.
- **Trustless sharing.** Guests re-execute every block the host produces, so the host cannot fake state.
- **Opt-in publishing.** Each room has its own channel and key, paid from your Basecamp wallet.
- **Part of a stack.** It runs on [Solizone EVM](/docs/solizone-evm) and pairs with [Zoner](/docs/zoner) for people who prefer the terminal.

## The two packages

| Package | What it is |
|---|---|
| `solizone_module` | The core module. It runs the chain, the compiler, the files and the networking. |
| `solicamp_ui` | The interface. It holds no chain logic and calls the core module. |

Install both in Basecamp's Package Manager. See [Build and install](/docs/solicamp/build-and-install).