"use strict";

const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/employee");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

async function promptUser() {
  try {
    const response = await inquirer.prompt([
      {
        name: "managerName",
        type: "input",
        message: "Enter your manager's name:"
      },
      {
        name: "managerId",
        type: "input",
        message: "Enter your manager's ID number:"
      },
      {
        name: "managerEmail",
        type: "input",
        message: "Enter your manager's email address:"
      },
      {
        name: "managerOfficeNumber",
        type: "input",
        message: "Enter your manager's office number:"
      }
    ]);
    console.log(response);
  } catch (error) {
    console.log("try again");
  }
}

promptUser();
