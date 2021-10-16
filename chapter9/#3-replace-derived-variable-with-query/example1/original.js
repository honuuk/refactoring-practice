class Production {
  get production() {return this._production}
  applyAdjustment(anAdjustment) {
    this._adjustment.push(anAdjustment);
    this._production += anAdjustment.amount;
  }
}