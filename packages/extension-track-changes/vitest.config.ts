import { defineConfig } from "vitest/config";
import path from "node:path";

/** The track-changes tests import runtime helpers from @glypher/core. */
export default defineConfig({
  resolve: {
    alias: {
      "@glypher/core": path.resolve(__dirname, "../core/src/index.ts"),
    },
  },
});
