"use strict";

const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const util = require("util");
const team = [];

// const writeFileAsync = util.promisify(fs.writeFile);
const init = () => {
  promptUser();
};

async function promptUser() {
  try {
    const newManager = await inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "Enter your manager's name:"
      },
      {
        name: "id",
        type: "input",
        message: "Enter your manager's ID number:"
      },
      {
        name: "email",
        type: "input",
        message: "Enter your manager's email address:"
      },
      {
        name: "officeNumber",
        type: "input",
        message: "Enter your manager's office number:"
      }
    ]);
    console.log(newManager);
    team.push(
      new Manager(
        manager.name,
        manager.id,
        manager.email,
        manaager.officeNumber
      )
    );
    generateCard(
      new Manager(
        manager.name,
        manager.id,
        manager.email,
        manaager.officeNumber
      )
    );
    generateHtml();
    // console.log(team);
  } catch (error) {
    console.log("try again");
  }
  
  addEmployee();
}

async function addEmployee() {
  try {
    const newEmployee = await inquirer.prompt([
      {
        name: "addNew",
        type: "list",
        message: "Which type of team member would you like to add",
        choices: ["Engineer", "Intern", "I am finished adding team members."]
      }
    ]);
    if (newEmployee.add === "Engineer") {
      addEngineer();
    } else if (newEmployee.add === "Intern") {
      addIntern();
    } else {
      return console.log("Team is complete!");
      finishHtml();
      // const managers = team.filter(employee => employee.officeNumber === true);
      // console.log(managers);
    }
  } catch (error) {
    console.log(error);
  }
}

async function addEngineer() {
  try {
    const newEngineer = await inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "Enter your engineer's name:"
      },
      {
        name: "id",
        type: "input",
        message: "Enter your engineer's ID number:"
      },
      {
        name: "email",
        type: "input",
        message: "Enter your engineer's email address:"
      },
      {
        name: "github",
        type: "input",
        message: "Enter your engineer's GitHub username:"
      }
    ]);
    console.log(newEngineer);
    team.push(
      new Engineer(engineer.name, engineer.id, engineer.email, engineer.github)
    );
    generateCard(
      new Engineer(engineer.name, engineer.id, engineer.email, engineer.github)
    );
  } catch (error) {
    console.log("try again");
  }
  addEmployee();
}

async function addIntern() {
  try {
    const newIntern = await inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "Enter your intern's name:"
      },
      {
        name: "id",
        type: "input",
        message: "Enter your intern's ID number:"
      },
      {
        name: "email",
        type: "input",
        message: "Enter your intern's email address:"
      },
      {
        name: "school",
        type: "input",
        message: "Enter your intern's school name:"
      }
    ]);
    // console.log(newIntern);
    team.push(new Intern(intern.name, intern.id, intern.email, intern.school));
    generateCard(
      new Intern(intern.name, intern.id, intern.email, intern.school)
    );
  } catch (error) {
    console.log("try again");
  }
  addEmployee();
}

const generateHtml = () => {
  const header = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My Team</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
    <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  </head>
  <body>
    <div>
      <nav class="navbar navbar-dark bg-dark">
        <h1 class="navbar-text text-white mx-auto">My Team</h1>
      </nav>
      <div class="container">
          <div class="row">`;
  fs.writeFile("./output/team.html", header, function(err) {
    if (err) {
      console.error(err);
    }
  });
};

function generateCard(card) {
  const name = card.getName();
  const role = card.getRole();
  const id = card.getId();
  const email = card.getEmail();
  let cardContent = "";
  return new Promise((resolve, reject) => {
    if (role === "Intern") {
      const school = card.getSchool();
      cardContent = `
                <div class="col-md">
                <div id="intern" class="card border-warning mb-3" style="width: 18rem;">
                  <div class="card-header bg-warning text-white">
                    ${name}
                    <div>Intern <i class="fas fa-chess-pawn"></i></div>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email: ${email}</li>
                    <li class="list-group-item">School: ${school}</li>
                  </ul>
                </div>
              </div>
              `;
    } else if (role === "Engineer") {
      const github = card.getGithub();
      cardContent = `
              <div class="col-md">
                <div id="engineer" class="card border-success mb-3" style="width: 18rem;">
                  <div class="card-header bg-success text-white">
                    ${name}
                    <div>Engineer <i class="fas fa-laptop-code"></i></div>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email: ${email}</li>
                    <li class="list-group-item">GitHub: ${github}</li>
                  </ul>
                </div>
              </div>
              `;
    } else {
      const officeNumber = card.getOfficeNumber();
      cardContent = `
              <div class="col-md">
              <div id="manager" class="card border-info mb-3" style="width: 18rem;">
                <div class="card-header bg-info text-white">
                  ${name}
                  <div>Manager <i class="fas fa-crown"></i></div>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">ID: ${id}</li>
                  <li class="list-group-item">Email: ${email}</li>
                  <li class="list-group-item">Office Number: ${officeNumber}</li>
                </ul>
              </div>
            </div>
            <div class="row">
              `;
    }
    fs.appendFile("./output/team.html,", cardContent, function(err) {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}
const finishHtml = () => {
  const htmlFooter = `
          </div>
      </div>  
  </body>
</html>`;
  fs.appendFile("./output/team.html", htmlFooter, function(err) {
    if (err) {
      console.error(err);
    }
  });
};
init();
