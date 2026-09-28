## What Solizone EVM can do today

The current implementation supports:

### Execution

- generic REVM execution
- native value transfers
- Solidity contract deployment
- contract calls
- mutable contract storage
- read-only contract calls
- persistent nonce handling
- persistent balances
- persistent bytecode
- persistent storage slots

### Commitments

- deterministic transaction commitments
- deterministic receipt commitments
- deterministic state commitments
- snapshot commitments

### Blocks

- canonical `SZB1` block encoding
- deterministic block hashes
- transaction-root validation
- parent-linked blocks
- multi-block production

### Persistence

- deterministic snapshots
- snapshot reconstruction
- file-backed state persistence
- Solizone checkpoints
- Logos Storage checkpoints

### Block storage

- memory block storage
- file-backed block storage
- hybrid block storage
- automatic historical archival
- bounded local retention
- remote historical retrieval
- block hash verification

### Recovery

- recover EVM state
- recover producer height
- recover parent hash
- verify chain head
- continue the same chain after restart

### Logos integration

- Logos Storage upload / download
- checkpoint persistence
- historical block persistence
- Zone SDK block publication
- observed block inclusion
- observed finality

## What is not implemented yet

Solizone EVM is not finished.

The current development boundary intentionally stops before the Ethereum-facing networking layer.

Not implemented yet:

- raw signed Ethereum transaction ingestion
- EIP-2718 transaction decoding
- RLP decoding
- secp256k1 sender recovery
- Ethereum transaction admission rules
- Ethereum fee handling
- mempool / transaction pool
- Ethereum JSON-RPC
- MetaMask connection
- Foundry RPC integration
- ethers RPC integration
- viem RPC integration
- full imported-block re-execution validation
- Ethereum MPT-compatible state roots
- network-distributed canonical head discovery
- fully distributed height → CID discovery
- production-grade Storage replication policy
- atomic crash-safe block + checkpoint persistence
- production-grade shutdown handling

These are development milestones, not claims about current functionality.

## Current development philosophy

Solizone EVM is being built incrementally.

Each major capability is implemented and validated before moving to the next layer.

The progression so far has been roughly:

```text
REVM execution
      ↓
persistent state
      ↓
generic transactions
      ↓
Solidity contracts
      ↓
state snapshots
      ↓
checkpoints
      ↓
canonical blocks
      ↓
block history
      ↓
restart recovery
      ↓
Logos publication
      ↓
Logos Storage
      ↓
HybridBlockStore
      ↓
long-running node runtime
```

The next stage begins at the Ethereum developer boundary:

```text
raw Ethereum transactions
      ↓
mempool
      ↓
JSON-RPC
      ↓
developer tooling
```