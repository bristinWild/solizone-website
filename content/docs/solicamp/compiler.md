## A pinned compiler

Solicamp compiles with a **pinned `solc` release**. Every install uses the same version, and it is checked, not trusted.

Lookup order:

1. `$SOLIZONE_SOLC`, an explicit path you set.
2. The pinned release in `~/.solicamp/solc/<version>/solc`. It is downloaded once from the official GitHub release and verified against a SHA-256 that is compiled into the module.
3. If the download is impossible (you are offline): `solc` on your `PATH`, then Foundry's compiler cache.

## What a compile returns

The compiler runs with `--combined-json abi,bin --optimize`. For each contract, Solicamp gets:

- the ABI, which drives the Interact panel
- the bytecode, which is deployed
- the file it came from, so a multi-file project shows which contract lives where

Errors come back with the compiler's own messages.

## Single source or a file

- `compile(source)` compiles one piece of source text.
- `compile_file(path)` compiles a file in the workspace, following its imports.