manager = aPerson.manager;

class Person {
  get manager() {return this._department.manager;}
}

class Department {
  get manager() {return this._manager;}
}