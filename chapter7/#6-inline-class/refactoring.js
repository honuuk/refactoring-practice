class Shipment {
  get trackingInfo() {return `${this.shippingCompany}: ${this.trackingNumber}`;}
  get shippingCompany() {return this._shippingCompany;}
  set shippingCompany(arg) {this.shippingCompany = arg;}
  get trackingNumber() {return this._trackingNumber;}
  set trackingNumber(arg) {this._trackingNumber = arg;}
}

aShipment.shippingCompany = request.vendor;