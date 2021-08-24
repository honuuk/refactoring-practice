class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }
  get customer() {
    return this._customer;
  }
  get quantity() {
    return this._quantity;
  }
  get month() {
    return this._month;
  }
  get year() {
    return this._year;
  }
  get baseCharge() {
    baseRate(this.month, this.year) * this.quantity;
  }
  get taxableCharge() {
    Math.max(0, this.baseCharge - taxThreshold(this.year));
  }
}

const reading = {
  customer: "ivan",
  quantity: 10,
  month: 5,
  year: 2017,
};

// 클라이언트 1
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const baseCharge = aReading.baseCharge;

// 클라이언트 2
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = aReading.taxableCharge;

// 클라이언트 3
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const baseCharge = aReading.baseCharge;
