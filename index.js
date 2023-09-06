const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");
const writeFileAsync = util.promisify(fs.writeFile);
const generateMarkdown = require("./utils/generateMarkdown");

//function to make writeFile async
function writeFs(fileName, data) {
  return writeFileAsync(fileName, data);
}

//array of questions for inquirer
const questions = [
  {
    type: "input",
    name: "github",
    message: "What is your GitHub username?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email?",
  },
  {
    type: "input",
    name: "title",
    message: "What is your project's name?",
  },
  {
    type: "input",
    name: "description",
    message: "Please write a short description of your project",
  },
  {
    type: "list",
    name: "license",
    message: "What kind of license should your project have?",
    choices: [
      {
        name: "Apache 2.0 License",
        value: {
          name: "Apache 2.0 License",
          link: "Apache%202.0",
          url: "https://opensource.org/licenses/Apache-2.0",
          color: "blue",
        },
      },
      {
        name: "MIT",
        value: {
          name: "MIT",
          link: "MIT",
          url: "https://opensource.org/licenses/MIT",
          color: "yellow",
        },
      },
      {
        name: "GPL 3.0",
        value: {
          name: "GPL 3.0",
          link: "GPLv3",
          url: "https://www.gnu.org/licenses/gpl-3.0",
          color: "blue",
        },
      },
      {
        name: "BSD 3",
        value: {
          name: "BSD 3",
          link: "BSD%203--Clause",
          url: "https://opensource.org/licenses/BSD-3-Clause",
          color: "orange",
        },
      },
      {
        name: "Unlicense",
        value: {
          name: "Unlicense",
          link: "Unlicense",
          url: "http://unlicense.org",
          color: "blue",
        },
      },
    ],
  },
  {
    type: "input",
    name: "installation",
    message: "What command should be run to install dependencies?",
    default: "npm install",
  },
  {
    type: "input",
    name: "test",
    message: "What command should be run to run tests?",
    default: "npm test",
  },
  {
    type: "input",
    name: "usage",
    message: "What does the user need to know about using the repo?",
  },
  {
    type: "input",
    name: "contributing",
    message: "What does the user need to know about contributing to the repo?",
  },
];

//function to find user avatar by github username
async function findAvatar(username) {
  try {
    const userData = await axios.get(
      `https://api.github.com/search/users?q=${username}`
    );
    const userAvatar = await userData.data.items[0].avatar_url;
    return userAvatar;
  } catch (error) {
    console.log(error);
  }
}

async function init() {
  try {
    const answers = await inquirer.prompt(questions);
    const avatar = await findAvatar(answers.github);
    answers.avatar = await avatar;
    console.log("Generating README.md...");
    await writeFs("README.md", generateMarkdown(answers));
  } catch (error) {
    console.log(error);
  }
}

init();
