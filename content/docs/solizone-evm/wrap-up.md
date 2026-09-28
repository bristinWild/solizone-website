## Solizone EVM in one sentence

If you only remember one thing:

> **Solizone EVM is an EVM execution environment that owns execution and canonical EVM state while using the Logos stack for persistence, publication, ordering, and finality.**

## In slightly more fun terms

Think of Solizone EVM as the kitchen.

```text
transactions
→ ingredients

REVM
→ chef

EVM state
→ current dish

Solizone blocks
→ recipe history
```

The kitchen doesn't need to keep every old ingredient box stacked beside the stove forever.

Older records can move into storage.

But if someone brings one back, we still check the label before trusting it.

Meanwhile, Logos provides the wider infrastructure around the kitchen.

Different jobs.

Different layers.

One system.

## Final mental model

When you're reading the Solizone EVM codebase, keep this picture in mind:

```text
developer
    ↓
transaction
    ↓
execution
    ↓
state
    ↓
block
   /   \
  /     \
 ↓       ↓
storage  publication
 ↓       ↓
Logos    Logos
Storage  blockchain
```

And remember the responsibility split:

```text
Solizone EVM
→ executes

Logos Storage
→ persists

Logos blockchain
→ orders and finalizes
```

That separation is one of the core ideas behind the architecture.

## Product family

Solizone EVM is one product inside the broader Solizone ecosystem.

```text
Solizone
│
├── Solizone EVM
│   └── EVM execution environment
│
├── Zoner
│   └── coming later
│
├── Solicamp
│   └── coming later
│
└── future developer tooling
```

This separation is intentional.

The name **Solizone EVM** refers specifically to the execution layer documented on this page.

The wider **Solizone** name can grow into a broader developer and infrastructure ecosystem around Logos.