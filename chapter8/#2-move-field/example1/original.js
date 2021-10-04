class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._discountRate = discountRate;
    this._contract = new CustomerContract(dateToday());
  }

  get discountRate() {return this._discountRate;}
  becomePreffered() {
    this._discountRate += 0.03;
    // something else...
  }
  applyDiscount(amount) {
    return amount.subtract(amout.multiply(this._discountRate));
  }
}

class CustomerContract {
  constructor(startDate) {
    this._startDate = startDate;
  }
}