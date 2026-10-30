## What is Zoner?

**Foundry for Logos. Same Solidity, same tools, one new network.**

Zoner is a small command-line companion to [Foundry](https://getfoundry.sh). It takes a Foundry project from `init` to a running chain, and to blocks published on Logos, in a few commands.

```text
forge / cast / ethers / viem          ← you keep these
            ↓
          Zoner                       ← init, node, deploy, status, sync
            ↓
      Solizone EVM (REVM)             ← executes your Solidity
            ↓
   Logos Zone SDK + Logos Storage     ← ordering, finality, durable history
```

> Zoner is an independent project and is not an official Logos project.

## Why it exists

Logos gives builders a strong privacy and infrastructure stack. But most smart-contract developers already live in Solidity and Foundry, and a network that asks them to start over rarely gets built on.

Zoner removes that cost. It does not replace Foundry. It lets Foundry talk to [Solizone EVM](/docs/solizone-evm), an EVM execution layer whose blocks are published to Logos.

## What you get

| Command | What it does |
|---|---|
| `zoner init [DIR]` | Creates a Foundry project already pointed at Solizone |
| `zoner node [flags]` | Runs a local Solizone node |
| `zoner deploy CONTRACT` | Deploys with `forge create` |
| `zoner status` | Shows chain id, head block and Logos publication progress |
| `zoner sync` | Rebuilds the chain from Logos and verifies every block |
| `zoner accounts` | Lists the pre-funded development accounts |

Everything else, such as `forge build`, `forge test`, `cast call` and `cast send`, is plain Foundry. It works because Solizone speaks standard Ethereum JSON-RPC.