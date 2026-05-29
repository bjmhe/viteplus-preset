import type { UserConfig } from "vite-plus";

export const getFmtConfig = (): UserConfig["fmt"] => {
  return {
    bracketSameLine: true,
    ignorePatterns: ["__snapshots__/**/*", "dist/**/*", "coverage/**/*"],
    jsdoc: true,
    sortImports: true,
    sortTailwindcss: true,
  };
};
