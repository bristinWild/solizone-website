## What you can do

1. **Write Solidity** in a large editor, with several files and folders in each project.
2. **Compile** with one click. Imports between files work.
3. **Deploy** to a local chain and **call** any function from an Interact panel.
4. **Work in rooms.** Each room is its own chain with its own files.
5. **Share a room** with a teammate through an invite.
6. **Publish to Bedrock** when you want a room on the network. It is off by default.

## The layout

```text
┌ top bar: files · rooms toggles        interact · publish toggles   chain · signer ┐
├───────────┬───────────┬─────────────────────────────┬──────────────────┤
│  Rooms    │  Files    │                             │  Interact        │
│  (drawer) │  (drawer) │        Code editor          │  Publish         │
│           │           │       (the big part)        │  (drawer)        │
├───────────┴───────────┴─────────────────────────────┴──────────────────┤
│ Output (fold it away with the arrow next to its title)                   │
└──────────────────────────────────────────────────────────────────────────┘
```

The editor gets the space. Rooms, files, interact and publish are drawers that you open only when you need them. Panes are resizable, and the output panel folds away.

## Highlights

- **File explorer.** Create, rename and delete files and folders. Drag and drop to move them. Files autosave, and `Ctrl+S` saves immediately.
- **Interact panel.** Functions are read from the compiled ABI. Reads run for free, writes send a transaction, and results and events are decoded for you.
- **Signer.** Pick which pre-funded development account signs.
- **Publish panel.** Shows the publishing state, the paying wallet address and its balance, the list of wallet addresses, the channel, and block progress.
- **Narrow-pane friendly.** The layout adapts to small Basecamp panels.

## A typical session

```text
open Counter.sol
      ↓
Compile
      ↓
Deploy (pick a signer)
      ↓
call increment() from the Interact panel
      ↓
call count() and read the result
```

All of this runs on your machine. No server and no hosted RPC are involved.