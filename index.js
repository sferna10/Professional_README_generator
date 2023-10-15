const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const generateMarkdown = require("./Utils/generateMarkdown").default;

const promptUser = () => {
  return inquirer.prompt([
    {
      Type: "input",
      name: "github",
      message: "What is your GitHub username?",
    },
    {
      Type: "input",
      name: "email",
      message: "What is your email address?",
    },
    {
      Type: "input",
      name: "title",
      message: "What is your project's name",
    },
    {
      Type: "input",
      name: "description",
      message: "Please write a short description of your project",
    },
    {
      Type: "list",
      name: "license",
      message: "What kind of license should your project have?",
      choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
    },
    {
      Type: "input",
      name: "Installation",
      message: "What command should be run to install dependencies",
      default: "npm i",
    },
    {
      Type: "input",
      name: "test",
      message: "What command should be run to run tests?",
      default: "npm tests",
    },
    {
      Type: "input",
      name: "usage",
      message: "What does the user need to know about using the repo?",
    },
  ]);
};
function writeTofile(fileName, data) {
  return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}
function init() {
    promptUser().then((_inquirerResponses_) => {
      console.log("generating README...");
      writeTofile("README.md", generateMarkdown({ ..._inquirerResponses_ }));
    });
  }

init();
