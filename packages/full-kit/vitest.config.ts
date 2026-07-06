import { defineConfig } from "vitest/config";
import path from "node:path";

const pkg = (name: string, entry = "src/index.ts") =>
  path.resolve(__dirname, "..", name, entry);

export default defineConfig({
  resolve: {
    alias: {
      "@glypher/core": pkg("core"),
      "@glypher/starter-kit": pkg("starter-kit"),
      "@glypher/extension-background-color": pkg("extension-background-color"),
      "@glypher/extension-blockquote": pkg("extension-blockquote"),
      "@glypher/extension-bold": pkg("extension-bold"),
      "@glypher/extension-bullet-list": pkg("extension-bullet-list"),
      "@glypher/extension-clear-formatting": pkg("extension-clear-formatting"),
      "@glypher/extension-code-block": pkg("extension-code-block"),
      "@glypher/extension-comment": pkg("extension-comment"),
      "@glypher/extension-font-family": pkg("extension-font-family"),
      "@glypher/extension-font-size": pkg("extension-font-size"),
      "@glypher/extension-hard-break": pkg("extension-hard-break"),
      "@glypher/extension-heading": pkg("extension-heading"),
      "@glypher/extension-highlight": pkg("extension-highlight"),
      "@glypher/extension-history": pkg("extension-history"),
      "@glypher/extension-horizontal-rule": pkg("extension-horizontal-rule"),
      "@glypher/extension-image": pkg("extension-image"),
      "@glypher/extension-indent": pkg("extension-indent"),
      "@glypher/extension-inline-code": pkg("extension-inline-code"),
      "@glypher/extension-italic": pkg("extension-italic"),
      "@glypher/extension-line-height": pkg("extension-line-height"),
      "@glypher/extension-link": pkg("extension-link"),
      "@glypher/extension-list-item": pkg("extension-list-item"),
      "@glypher/extension-markdown": pkg("extension-markdown"),
      "@glypher/extension-mention": pkg("extension-mention"),
      "@glypher/extension-ordered-list": pkg("extension-ordered-list"),
      "@glypher/extension-paragraph": pkg("extension-paragraph"),
      "@glypher/extension-placeholder": pkg("extension-placeholder"),
      "@glypher/extension-strike": pkg("extension-strike"),
      "@glypher/extension-subscript": pkg("extension-subscript"),
      "@glypher/extension-superscript": pkg("extension-superscript"),
      "@glypher/extension-table": pkg("extension-table"),
      "@glypher/extension-task-item": pkg("extension-task-item"),
      "@glypher/extension-task-list": pkg("extension-task-list"),
      "@glypher/extension-text-align": pkg("extension-text-align"),
      "@glypher/extension-text-color": pkg("extension-text-color"),
      "@glypher/extension-text-stroke": pkg("extension-text-stroke"),
      "@glypher/extension-track-changes": pkg("extension-track-changes"),
      "@glypher/extension-underline": pkg("extension-underline"),
      "@glypher/extension-word-count": pkg("extension-word-count"),
    },
  },
});
