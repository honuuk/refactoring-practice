function inNewEngland(aCustomer) {
  return XXNewEngland(aCustomer.address.state);
}

function XXNewEngland(stateCode) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

const newEnglanders = someCustomers.filter((c) =>
  XXNewEngland(c.address.state)
);
