import { defineConfig } from "vitest/config";
import path from "node:path";

/**
 * The link extension imports runtime helpers from `@glypher/core`
 * (`cloneDoc`, `nodeAt`, `setMarkOnInlineRange`, …), and the autolink
 * test drives a real editor that needs a paragraph node, so both
 * packages are resolved to their source.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@glypher/core": path.resolve(__dirname, "../core/src/index.ts"),
      "@glypher/extension-paragraph": path.resolve(
        __dirname,
        "../extension-paragraph/src/index.ts",
      ),
    },
  },
});
