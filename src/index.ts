import { mergeConfig, type UserConfig } from "vite-plus";
import * as attw from "@arethetypeswrong/core";
import * as publint from "publint";
import * as publintUtils from "publint/utils";
import ApiSnapshot from "tsnapi/rolldown";
import type { TsdownInputOption } from "tsdown";

export interface LibOptions {
  entry?: "index" | "shallow" | "all" | Exclude<TsdownInputOption, string>;
  inlineDeps?: (string | RegExp)[];
}

export function lib(
  { entry = "index", inlineDeps = [] }: LibOptions = {},
  overrides: UserConfig = {},
): UserConfig {
  return mergeConfig(
    {
      pack: {
        attw: {
          enabled: true,
          profile: "esm-only",
          module: attw,
        },
        deps: { onlyBundle: inlineDeps },
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
        exports: true,
        minify: true,
        platform: "neutral",
        plugins: [ApiSnapshot()],
        publint: {
          enabled: true,
          module: [publint, publintUtils],
        },
        sourcemap: true,
        ...overrides.pack,
      },
      lint: {
        options: {
          typeAware: true,
          typeCheck: true,
        },
        ignorePatterns: ["__snapshots__/**/*", "dist/**/*"],
        ...overrides.lint,
      },
      fmt: {
        ignorePatterns: ["__snapshots__/**/*", "dist/**/*"],
        ...overrides.fmt,
      },
    },
    overrides,
  );
}

export function nodeLib(options: LibOptions = {}, overrides: UserConfig = {}): UserConfig {
  return lib(options, {
    pack: {
      platform: "node",
    },
    ...overrides,
  });
}
