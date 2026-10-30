## Rooms

A **room** is a separate local chain. It has its own chain id, its own data directory and its own history.

- A transaction signed for one room is invalid in every other room.
- The built-in `main` room is the canonical Solizone development chain, with chain id `9001`.
- Other rooms get a chain id derived for them, and live under `~/.solicamp/rooms/<id>`.

### There is no reset

History in a room only grows. To start over, create a new room.

This is deliberate. It keeps chains honest and discourages spam and misuse, which matters once a room can be published or shared.

## Files and folders

Each room has its own workspace: plain `.sol` files in `<room data dir>/contracts`.

You can create, rename, move and delete files and folders from the file explorer. Files autosave.

### Safe by default

The workspace checks every path before it touches the disk:

- no `..`, no absolute paths, no hidden names, no backslashes, no control characters
- depth of at most 8 folders, names of at most 100 characters
- files of at most 1 MB
- symlinks cannot be used to reach outside the workspace
- writes are atomic: the content goes to a temporary file first and then replaces the old one

### Imports

`compile_file` runs the compiler with the workspace as its working directory and base path, so imports between files resolve.

```solidity
import "./Token.sol";
import "assets/Counter.sol";
```