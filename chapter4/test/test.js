import { expect } from "chai";

import Province from "../src/Province.js";
import { sampleProvinceData } from "../src/index.js";

describe("province", () => {
  it("shortfall", () => {
    const asia = new Province(sampleProvinceData());
    expect(asia.shortfall).equal(5);
  });

  it("profit", () => {
    const asia = new Province(sampleProvinceData());
    expect(asia.profit).equal(230);
  });
});
