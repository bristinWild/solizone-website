## Shared rooms

One person **hosts** a room. Their node orders transactions and produces blocks.

Everyone else is a **guest**. A guest's node is a follower that replays and verifies every block the host publishes. Guests send their signed transactions to the host.

```text
guest ── signed transactions ──→ host
guest ←── blocks ──────────────  host
```

## Nobody has to trust anybody

- **A guest executes every block itself**, so a host cannot fake state.
- **Blocks are signed by the host key** named in the invite, so another room member cannot substitute a different chain.
- **All traffic is sealed** (ChaCha20-Poly1305) with a key that only travels inside the invite. The messaging network itself is public, so this keeps room contents private.

Share an invite only with people you want in the room. Anyone who holds it can read the room's traffic.

## Messages can be lost

Messages may be lost, duplicated or reordered. A guest simply asks again (`hello`) from the height it is missing, and the host replies with the blocks produced since.

## Transport: Logos Messaging

Shared rooms travel over Logos Messaging (`delivery_module`) on a content topic of the form:

```text
/solicamp/1/<room-id>/proto
```

An invite starts with `solicamp1:` and carries the room, the host key and the sealing key.

## How the code is split

| Part | Role |
|---|---|
| `collab.rs` | The protocol. It has no networking and turns incoming payloads into outgoing ones. It is tested against an in-memory bus. |
| `net.rs` | The thin binding to Logos Messaging. It only works inside Basecamp. |

A background bridge connects the two and never holds the engine lock while it calls the network, so a slow network call cannot freeze the chain.

## Status

The protocol is built and tested in memory, including a two-person room. A two-window test inside Basecamp is still to do.