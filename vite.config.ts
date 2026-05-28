import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  pack: {
    dts: {
      tsgo: true,
    },
    exports: true,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
    ignorePatterns: ["__snapshots__/**/*", "dist/**/*"],
  },
  fmt: {
    ignorePatterns: ["__snapshots__/**/*", "dist/**/*"],
  },
});
