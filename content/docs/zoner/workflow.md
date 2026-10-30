## From zero to a deployed contract

```bash
zoner init hello-logos
cd hello-logos
```

Start a local chain in a second terminal:

```bash
zoner node
```

Deploy the example contract:

```bash
zoner deploy src/Counter.sol:Counter
```

Use it with the tools you know:

```bash
cast send <deployed address> "increment()" \
  --rpc-url http://127.0.0.1:8545 --private-key <dev key from `zoner accounts`>

cast call <deployed address> "count()(uint256)" --rpc-url http://127.0.0.1:8545
```

See what is happening:

```bash
zoner status
```

## Publish to Logos

```bash
zoner node --publish
zoner status
```

Every block is sent to a Logos zone channel in height order. A block shows as `finalized` once Logos finalizes it, which takes about 12 hours on the current network.

Publishing needs a running Logos node and a funded wallet key. See [Publishing to Logos](/docs/solizone-evm/publication).

## Rebuild a chain from Logos

```bash
zoner node reset      # a sync needs an empty data directory
zoner sync
```

Zoner reads the published blocks back, replays each one through the EVM and checks every commitment. A node can recover from the network alone, with no trust in a server.

## What the project template contains

```text
hello-logos/
├── foundry.toml        solc 0.8.20, plus a `solizone` RPC endpoint on 127.0.0.1:8545
├── src/Counter.sol     an example contract with an Incremented event
├── .gitignore          out/, cache/, .env
└── README.md           the commands above
```