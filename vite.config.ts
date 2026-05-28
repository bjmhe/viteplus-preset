import { nodeLib } from "viteplus-preset-bjmhe";

export default nodeLib(
  {},
  {
    staged: {
      "*": "vp check --fix",
    },
  },
);
