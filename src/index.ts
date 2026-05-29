import { fmtPreset } from "@bjmhe/viteplus-preset-fmt";
import type { TsdownInputOption } from "tsdown";
import { mergeConfig, type UserConfig } from "vite-plus";

import { getLintConfig } from "./lint";
import { getPackConfig } from "./pack";

export interface LibOptions {
  /** Entry preset or custom tsdown input. */
  entry?: "index" | "shallow" | "all" | Exclude<TsdownInputOption, string>;
  /** Dependencies to bundle instead of externalizing (`pack.deps.onlyBundle`). */
  inlineDeps?: (string | RegExp)[];
}

/** Vite+ config for a universal (neutral platform) TypeScript library. */
export function lib(
  { entry = "index", inlineDeps = [] }: LibOptions = {},
  overrides: UserConfig = {},
): UserConfig {
  return mergeConfig(
    {
      pack: getPackConfig({ entry, inlineDeps }),
      lint: getLintConfig(),
      fmt: fmtPreset(),
    },
    overrides,
  );
}

/** Like {@link lib} with `pack.platform` set to `node`. */
export function nodeLib(options: LibOptions = {}, overrides: UserConfig = {}): UserConfig {
  return lib(
    options,
    mergeConfig(
      {
        pack: {
          platform: "node",
        },
      },
      overrides,
    ),
  );
}
