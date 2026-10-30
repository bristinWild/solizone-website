## Talking to Solizone EVM

Solizone EVM speaks **Ethereum JSON-RPC**. Tools you already use can connect to it without changes.

```text
Foundry / cast / ethers / viem / wallets
                 ↓
         Ethereum JSON-RPC
                 ↓
      signed Ethereum transaction
                 ↓
           Solizone mempool
                 ↓
     BlockProducer → REVM → state
```

The chain id is `9001`. The default address is `http://127.0.0.1:8545`.

```bash
cargo run --bin solizone_node -- --storage local

forge create contracts/Counter.sol:Counter --broadcast \
  --rpc-url http://127.0.0.1:8545 \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

cast send <counter> "increment()" --rpc-url http://127.0.0.1:8545 --private-key 0xac09…ff80
cast call <counter> "count()(uint256)" --rpc-url http://127.0.0.1:8545
```

That private key is a public development key. Never use it for real funds.

## Supported methods

```text
web3_clientVersion  net_version  net_listening
eth_chainId  eth_blockNumber  eth_syncing  eth_accounts
eth_gasPrice  eth_maxPriorityFeePerGas  eth_feeHistory
eth_getBalance  eth_getTransactionCount  eth_getCode  eth_getStorageAt
eth_call  eth_estimateGas
eth_sendRawTransaction  eth_getTransactionByHash  eth_getTransactionReceipt
eth_getBlockByNumber  eth_getBlockByHash  eth_getLogs
solizone_publicationStatus
```

`solizone_publicationStatus` is Solizone's own method. It reports how far block publication to Logos has got. See [Publishing to Logos](/docs/solizone-evm/publication).

## What happens to a transaction

```text
eth_sendRawTransaction
        ↓
decode the EIP-2718 envelope
        ↓
recover the sender
        ↓
check the chain id
        ↓
dry-run against the pending state
(nonce, funds, gas)
        ↓
Solizone mempool (first in, first out)
        ↓
every block time, if transactions are pending:
produce a block
```

A transaction that cannot succeed is rejected up front instead of waiting in the mempool.

## Behaviour worth knowing

### Transaction types

- Legacy transactions are accepted if they use EIP-155 replay protection.
- EIP-2930 and EIP-1559 transactions are accepted.
- Blob transactions (EIP-4844) and set-code transactions (EIP-7702) are rejected.

### Fees

Fees are not charged yet. Gas price, base fee and priority fee are all `0`.

### Gas limits

A single transaction is capped at 16,777,216 gas (EIP-7825, which REVM's Osaka spec enforces). The block gas limit is 30,000,000.

### Reverts

A reverted call returns error code `3` with the revert data and the decoded `Error(string)` reason. Foundry shows these as readable messages.

### State queries

Only the latest state is kept. Queries accept `latest`, `pending` and the head block. Older block numbers return an error.

### Block production

Blocks are produced only when transactions are pending. The chain does not grow while idle.

### Development accounts

A fresh chain funds the five standard Foundry and Anvil development accounts with 10,000 ETH each. It also writes an empty block `#0`, because Ethereum tools expect a `latest` block to exist.

## Signed transactions in blocks

Transactions that arrive over JSON-RPC are stored in blocks as their exact signed bytes. See [Blocks and the chain](/docs/solizone-evm/blocks) for the `SZT2` and `SZB2` formats.

## Tested with Foundry

The repository includes scripts that run real Foundry flows against a running node:

- `scripts/foundry-smoke.sh` deploys and calls a Counter.
- `scripts/foundry-contracts.sh` runs 35 checks on `contracts/Zoo.sol`: an ERC-20 with constructor arguments and custom errors, CREATE and CREATE2 factories, a payable vault, library linking, precompiles, environment opcodes, Panic reverts, and call, delegatecall and staticcall between contracts.
- `scripts/foundry-restart.sh` restarts the node on the same data and compares receipts, transactions, blocks and logs.