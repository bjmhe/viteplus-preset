import * as attw from "@arethetypeswrong/core";
import * as publint from "publint";
import * as publintUtils from "publint/utils";
import ApiSnapshot from "tsnapi/rolldown";
import type { UserConfig } from "vite-plus";

import type { LibOptions } from ".";
import { PACK_BANNER, PACK_FOOTER } from "./constant";

export const getPackConfig = (options: LibOptions): UserConfig["pack"] => {
  const { entry = "index", inlineDeps = [] } = options;
  return {
    attw: {
      enabled: false,
      profile: "esm-only",
      module: attw,
      level: "warn",
    },
    banner: PACK_BANNER,
    deps: { onlyBundle: inlineDeps },
    devtools: true,
    dts: {
      tsgo: true,
    },
    entry:
      entry === "index"
        ? "src/index.ts"
        : entry === "shallow"
          ? "src/*.ts"
          : entry === "all"
            ? "src/**/*.ts"
            : entry,
    exports: {
      packageJson: true,
      legacy: true,
    },
    footer: PACK_FOOTER,
    platform: "neutral",
    plugins: [ApiSnapshot()],
    publint: {
      enabled: "ci-only",
      module: [publint, publintUtils],
    },
    shims: true,
    sourcemap: true,
    unused: true,
  };
};
