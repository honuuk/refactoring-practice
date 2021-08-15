import assert from "assert";

import Province from "../src/Province.js";
import { sampleProvinceData } from "../src/index.js";

describe("province", () => {
  it("shortfall", () => {
    const asia = new Province(sampleProvinceData());
    assert.strictEqual(asia.shortfall, 5);
  });
});
