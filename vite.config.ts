import { defineConfig } from "vite-plus";
import * as attw from "@arethetypeswrong/core";
import * as publint from "publint";
import * as publintUtils from "publint/utils";
import ApiSnapshot from "tsnapi/rolldown";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  pack: {
    attw: {
      enabled: false,
      profile: "esm-only",
      module: attw,
      level: "warn",
    },
    deps: { onlyBundle: [] },
    dts: {
      tsgo: true,
    },
    entry: "src/index.ts",
    exports: {
      packageJson: true,
      legacy: true,
    },
    platform: "node",
    plugins: [ApiSnapshot()],
    publint: {
      enabled: "ci-only",
      module: [publint, publintUtils],
    },
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
