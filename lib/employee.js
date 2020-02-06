"use strict";

class Employee {
  constructor(name, id, email) {
    if (!name) {
      throw new Error("Please enter a name.");
    }
    if (!id) {
      throw new Error("Please enter an ID.");
    }
    if (!email) {
      throw new Error("Please enter an email.");
    }

    this.name = name;
    this.id = id;
    this.email = email;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return "Employee";
  }
}

module.exports = Employee;
