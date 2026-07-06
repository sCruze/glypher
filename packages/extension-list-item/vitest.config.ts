import { defineConfig } from "vitest/config";
import path from "node:path";

/**
 * The list-item extension imports runtime helpers from
 * `@glypher/core` (`nodeAt`, `splitInlineAt`), so the test run
 * needs the package resolved to its source.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@glypher/core": path.resolve(__dirname, "../core/src/index.ts"),
    },
  },
});
