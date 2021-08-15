import { expect } from "chai";

import Province from "../src/Province.js";
import { sampleProvinceData } from "../src/index.js";

describe("province", () => {
  let asia;

  beforeEach(() => {
    asia = new Province(sampleProvinceData());
  });

  it("shortfall", () => {
    expect(asia.shortfall).equal(5);
  });

  it("profit", () => {
    expect(asia.profit).equal(230);
  });

  it("change production", () => {
    asia.producers[0].production = 20;
    expect(asia.shortfall).equal(-6);
    expect(asia.profit).equal(292);
  });

  it("zero demand", () => {
    asia.demand = 0;
    expect(asia.shortfall).equal(-25);
    expect(asia.profit).equal(0);
  });

  it("negative demand", () => {
    asia.demand = -1;
    expect(asia.shortfall).equal(-26);
    expect(asia.profit).equal(-10);
  });

  it("empty string demand", () => {
    asia.demand = "";
    expect(asia.shortfall).NaN;
    expect(asia.profit).NaN;
  });
});

describe("no producers", () => {
  let noProducers;

  beforeEach(() => {
    const data = {
      name: "No producers",
      producers: [],
      demand: 30,
      price: 20,
    };
    noProducers = new Province(data);
  });

  it("shortfall", () => {
    expect(noProducers.shortfall).equal(30);
  });

  it("profit", () => {
    expect(noProducers.profit).equal(0);
  });
});
