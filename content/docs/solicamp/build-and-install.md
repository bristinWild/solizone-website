## Build

Solicamp builds with Nix, using Logos' module builder. Do this in each of `solizone-module/` and `solicamp-ui/`:

```bash
git add -A                 # flakes only see tracked files
nix build .#lgx-portable
```

This produces a `.lgx` package for Basecamp.

## Install

1. In Basecamp, open the Package Manager.
2. Uninstall any older Solicamp packages.
3. Install `solizone_module` and `solicamp_ui`.
4. Open **Solicamp**.

## The module flake

The core module vendors two things so it builds offline:

- a patched copy of the Logos Rust SDK (`vendor/logos-rust-sdk-compat`), so the module announces its own name
- a copy of the Solizone node (`vendor/solizone-evm`), synced with `scripts/sync-solizone-evm.sh`

The UI's flake finds the core module at `github:bristinWild/solicamp?dir=solizone-module`.

## Release to the Logos module catalog

The packages are being released to a Logos module catalog, which builds them on GitHub for Mac and Linux. Once that is done, you will be able to install Solicamp from the catalog in Basecamp instead of building it.

## Notes for UI contributors

- Basecamp's QML engine rejects JavaScript reserved and future-reserved words used as names (`short`, `long`, `int`, `char`, `byte`, `final`, `native`, `static`, `public`, `private`, `package`, `interface`, `enum`, `export` and others), even when a desktop Qt accepts them.
- `SplitView` handles write `preferredWidth` and `preferredHeight` when dragged, which breaks bindings. Toggle panes imperatively.
- Keep layouts tolerant of narrow panes.