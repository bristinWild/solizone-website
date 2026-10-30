## Publish to Bedrock

Publishing is **opt-in** and **off by default**. Nothing is published, and no fee is paid, until you turn it on for a room.

```text
local chain (free, instant)
          ↓   you press Publish
Solizone publisher → Logos Zone SDK → Logos blockchain
```

## What turning it on does

- The room gets its **own channel id and sequencer key**, generated on first use and stored on disk. The key file is private to its owner.
- Fees are paid from a **Basecamp blockchain-wallet address**.
- Only the **host** of a shared room publishes. Guests do not.
- You can import an existing channel id and sequencer key while publishing is off.

## The publishing states

| State | Meaning |
|---|---|
| `off` | Publishing is not turned on for this room |
| `guest` | You joined a room as a guest. Only the host publishes |
| `needs_node` | The Logos node in Basecamp is not running |
| `needs_funding` | The paying address has no spendable funds |
| `syncing` | Publication is catching up |
| `published` | Blocks are going out normally |
| `error` | Something went wrong. The message says what |

The Publish panel also shows the channel id, the paying wallet address and its balance, the chain head and the next block to publish. The sequencer key is never shown.

## Paying the fees

Solicamp lists the addresses of the Basecamp wallet with their balances and picks the funded one automatically. You can pin a specific address instead.

If an address reads zero, the panel shows what the wallet answered, so you can tell "no funds" apart from "the wallet could not be read".

Block publishing itself works as described in [Publishing to Logos](/docs/solizone-evm/publication). It is the same publisher the standalone node uses, and finality takes about 12 hours.