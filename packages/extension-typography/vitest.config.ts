import { defineConfig } from "vitest/config";
import path from "node:path";

/**
 * The typography helpers import types from `@glypher/core`. Alias the
 * package to its source so the test run resolves without a build step.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@glypher/core": path.resolve(__dirname, "../core/src/index.ts"),
    },
  },
});
