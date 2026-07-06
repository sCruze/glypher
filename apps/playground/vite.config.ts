import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Resolve absolute paths to each workspace package's TypeScript source.
// Without these aliases Vite tries to read `main`/`module` from each
// package.json, which point at `./dist/*` — and `dist/` is only built
// for publication, not for `pnpm playground`. The aliases let us run
// the playground straight off the TS sources with full hot-reload.
const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = (name: string, entry = "src/index.ts") =>
  resolve(__dirname, "../../packages", name, entry);

const aliases: Record<string, string> = {
  "@glypher/core": pkg("core"),
  "@glypher/react": pkg("react", "src/index.tsx"),
  "@glypher/starter-kit": pkg("starter-kit"),
  "@glypher/full-kit": pkg("full-kit"),

  // Original extensions
  "@glypher/extension-paragraph": pkg("extension-paragraph"),
  "@glypher/extension-heading": pkg("extension-heading"),
  "@glypher/extension-bold": pkg("extension-bold"),
  "@glypher/extension-italic": pkg("extension-italic"),
  "@glypher/extension-underline": pkg("extension-underline"),
  "@glypher/extension-strike": pkg("extension-strike"),
  "@glypher/extension-link": pkg("extension-link"),
  "@glypher/extension-blockquote": pkg("extension-blockquote"),
  "@glypher/extension-code-block": pkg("extension-code-block"),
  "@glypher/extension-hard-break": pkg("extension-hard-break"),
  "@glypher/extension-list-item": pkg("extension-list-item"),
  "@glypher/extension-bullet-list": pkg("extension-bullet-list"),
  "@glypher/extension-ordered-list": pkg("extension-ordered-list"),
  "@glypher/extension-task-list": pkg("extension-task-list"),
  "@glypher/extension-task-item": pkg("extension-task-item"),
  "@glypher/extension-text-align": pkg("extension-text-align"),
  "@glypher/extension-clear-formatting": pkg("extension-clear-formatting"),
  "@glypher/extension-placeholder": pkg("extension-placeholder"),
  "@glypher/extension-history": pkg("extension-history"),

  // New in i4
  "@glypher/extension-inline-code": pkg("extension-inline-code"),
  "@glypher/extension-horizontal-rule": pkg("extension-horizontal-rule"),
  "@glypher/extension-subscript": pkg("extension-subscript"),
  "@glypher/extension-superscript": pkg("extension-superscript"),
  "@glypher/extension-highlight": pkg("extension-highlight"),
  "@glypher/extension-text-color": pkg("extension-text-color"),
  "@glypher/extension-text-stroke": pkg("extension-text-stroke"),
  "@glypher/extension-background-color": pkg("extension-background-color"),
  "@glypher/extension-word-count": pkg("extension-word-count"),
  "@glypher/extension-indent": pkg("extension-indent"),
  "@glypher/extension-table": pkg("extension-table"),
  "@glypher/extension-font-family": pkg("extension-font-family"),
  "@glypher/extension-font-size": pkg("extension-font-size"),
  "@glypher/extension-line-height": pkg("extension-line-height"),
  "@glypher/extension-comment": pkg("extension-comment"),
  "@glypher/extension-mention": pkg("extension-mention"),
  "@glypher/extension-track-changes": pkg("extension-track-changes"),
  "@glypher/extension-markdown": pkg("extension-markdown"),
  "@glypher/extension-image": pkg("extension-image"),

  // CSS-only package — Vite needs an explicit entry path because
  // `main: "./src/index.css"` isn't picked up via JS import statements.
  "@glypher/theme-default": resolve(
    __dirname,
    "../../packages/theme-default/src/index.css",
  ),
};

export default defineConfig({
  plugins: [react()],
  resolve: { alias: aliases },
  optimizeDeps: {
    // The aliased entries above are TypeScript source — don't try to
    // pre-bundle them as if they were prebuilt npm deps.
    exclude: Object.keys(aliases),
  },
  server: {
    port: 5180,
  },
});
