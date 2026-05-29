import { test, expect } from "vite-plus/test";

import { lib, nodeLib } from "../src/index.ts";

test("lib defaults to index entry and neutral platform", () => {
  const config = lib();
  // @ts-expect-error - pack is not typed
  expect(config.pack?.entry).toBe("src/index.ts");
  // @ts-expect-error - pack is not typed
  expect(config.pack?.platform).toBe("neutral");
});

test("lib resolves entry presets", () => {
  // @ts-expect-error - pack is not typed
  expect(lib({ entry: "shallow" }).pack?.entry).toBe("src/*.ts");
  // @ts-expect-error - pack is not typed
  expect(lib({ entry: "all" }).pack?.entry).toBe("src/**/*.ts");
});

test("lib passes inlineDeps to onlyBundle", () => {
  // @ts-expect-error - pack is not typed
  expect(lib({ inlineDeps: ["lodash-es"] }).pack?.deps?.onlyBundle).toEqual(["lodash-es"]);
});

test("lib merges overrides", () => {
  // @ts-expect-error - pack is not typed
  expect(lib({}, { pack: { platform: "browser" } }).pack?.platform).toBe("browser");
});

test("nodeLib sets node platform", () => {
  // @ts-expect-error - pack is not typed
  expect(nodeLib().pack?.platform).toBe("node");
});

test("nodeLib merges overrides", () => {
  expect(nodeLib({}, { lint: { options: { typeCheck: false } } }).lint?.options?.typeCheck).toBe(
    false,
  );
});
