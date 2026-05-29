import type { UserConfig } from "vite-plus";

export const getLintConfig = (): UserConfig["lint"] => {
  return {
    ignorePatterns: ["__snapshots__/**/*", "dist/**/*", "coverage/**/*"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  };
};
