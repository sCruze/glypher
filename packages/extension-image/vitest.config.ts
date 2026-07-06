import { defineConfig } from "vitest/config";
import path from "node:path";

/** Image upload tests import @glypher/core at runtime. */
export default defineConfig({
  resolve: {
    alias: {
      "@glypher/core": path.resolve(__dirname, "../core/src/index.ts"),
    },
  },
});
