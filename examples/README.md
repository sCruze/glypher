# Glypher examples

Every example is a standalone workspace package. Run `pnpm install` once at the repository root, then start the example you need.

## Available examples

| Example | Command | Covers |
| --- | --- | --- |
| `examples/nextjs` | `pnpm --filter @glypher/example-nextjs dev` | Next.js App Router, StarterKit, custom toolbar, HTML/JSON save output. |
| `examples/vite-react` | `pnpm --filter @glypher/example-vite-react dev` | Vite React, FullKit, custom toolbar, image upload, tables, colors and HTML/JSON save output. |
| `examples/rails` | snippets in `examples/rails/README.md` | Rails form helper, initializer, ActiveStorage upload endpoint and sanitized rendering. |

## Suggested verification

```bash
pnpm install
pnpm --filter @glypher/example-nextjs build
pnpm --filter @glypher/example-vite-react build
pnpm --filter @glypher/example-vite-react typecheck
```

## Not included yet

- Vue: there is no Vue package in the current repository.
