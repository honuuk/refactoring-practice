class CustomerData {
  constructor(data) {
    this._data = data;
  }

  get rawData() {
    return JSON.parse(JSON.stringify(this._data));
  }
  setUsage(customerID, year, month, amount) {
    this._data[customerID].usages[year][month] = amount;
  }
  usage(customerID, year, month) {
    return this._data[customerID].usages[year][month];
  }
}

const customerData = new CustomerData({
  1920: {
    name: "마틴 파울러",
    id: "1920",
    usages: {
      2016: {
        1: 50,
        2: 55,
      },
      2015: {
        1: 70,
        2: 63,
      },
    },
  },
});

function getCustomerData() {
  return customerData;
}

getCustomerData().setUsage(customerID, year, month, amount);

function compareUsage(customerID, laterYear, month) {
  const later = getCustomerData().usage(customerID, laterYear, month);
  const earlier = getCustomerData().usage(customerID, laterYear - 1, month);
  return { laterAmount: later, change: later - earlier };
}
