import { test, expect } from "vite-plus/test";

import { lib, nodeLib } from "../src/index.ts";

test("test lib", () => {
  expect(lib()).toBeDefined();
});

test("test nodeLib", () => {
  expect(nodeLib()).toBeDefined();
});
