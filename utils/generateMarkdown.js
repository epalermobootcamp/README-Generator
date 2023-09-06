// function to generate markdown for README
function generateMarkdown(data) {
  return `
[![License](https://img.shields.io/badge/License-${data.license.link}-${data.license.color}.svg)](${data.license.url})

# ${data.title}

## Description

${data.description}

---

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

---

## Installation

Download the application and run:

\`\`\`
${data.installation}
\`\`\`

## Usage

${data.usage}

## License

${data.title} is licensed under the ${data.license.name} License.

## Contributing

${data.contributing}

## Tests

\`\`\`
${data.test}
\`\`\`

## Questions

If you have any questions about the repo, open an issue or contact me directly at [${data.email}](mailto:${data.email}). 

![Avatar](${data.avatar}&s=100) 

Check out my other projects at [${data.github}](https://github.com/${data.github})

`;
}

module.exports = generateMarkdown;
