# JiPT3 ![hsvg](res/codeGen.svg)

![svg](res/codeGenHacq.svg)


The most powerful AI model at your service. Let OpenAI's GPT3 model generate code for you.
Simply choose the desired programming language and save the generated code.

[SourceCode](https://github.com/3lLobo/JiraHacq)

[Demo Video](https://youtu.be/jaU0wSHGOLU)

## Installation

You will need an api key from OpenAI.
Apply for one [here](https://beta.openai.com/).

Set the key with:
```bash
forge variables set --encrypt OPENAI_API_KEY xxxxxxxxxx
```

## Debugging

You can enable verbose logging by setting the `DEBUG_LOGGING` [environment variable](https://developer.atlassian.com/platform/forge/environments/) to `1`. Logs can then be viewed with the `forge logs` command.

Alternatively, you can use the [`forge tunnel`](https://developer.atlassian.com/platform/forge/change-the-frontend-with-forge-ui/#set-up-tunneling) command to run your Forge app locally. Note that you must pass the environment variable values to the tunnel with the prefix `FORGE_USER_VAR_`, e.g.:

```
FORGE_USER_VAR_TRANSLATE_API_KEY=your_translate_api_key_here FORGE_USER_VAR_DEBUG_LOGGING=1 forge tunnel
```

or simply by setting it in a `.env` file inside the parent directory of this project and calling:
```
yarn tunnel
```

# Submission Readme

## Inspiration
![pandahacq](https://user-images.githubusercontent.com/25290565/199091825-c3cec1d3-4694-4218-9582-9f46959cdc7a.svg)

Have you worked with Github's Copilot yet?
If so, you are already familiar with the power of [Codex](https://gpt3demo.com/category/code-generation), the newest and most powerful AI model of our time.

## What it does
This Jira app takes your issue title and description as input and generates a complete script for you.

JiPT3 at your service. Let the latest GPT3 model generate code for you. Simply choose the desired programming language and save the generated code.
Write your Jira-issue as specific as you can. The precise the description, the better the generated script. 

## How we built it

We leverage the [OpenAI api](https://beta.openai.com/https://beta.openai.com/) to generate a complete program for us.  
The accessed endpoint is for text completion, thus we promt the api with what looks like the beginning of a script file.
Herefore we convert the Issue title into a file name with langugage specific extension.
The issue description is converted into a `TODO` which devOps use signal a to need to implement a task.
Then filename and TODO are encapsuled in an again program specific multi-line comment and fed into the model.

Here an example promt (inception 😜) for JS:
```js
/*
File name: call_openai_api.js
TODO: Call the openAI api to generate code for you. Use the text in the description as input. Save the generated code as markdown file in the root directory.
*/
```
The app generates about 250 new tokens. If the generated code reads promising, the user can keep generating until the script is complete, otherwise the action can be restarted.

Finally the user can add the script in form of a file with the earlier forged filename as attachment to the Jira issue. This preserves the generated code and lets co-workers make use of it 2.


## Accomplishments that we're proud of

- Creating an app which my colleagues will love.
- Learning the tricqs and tunes of how to make such an intelligence monster like GPT3 follow your instructions.
- Hacking the app-template into using yarn commands without installing `forge` globally 🐳

## What's next for JiPT

While the results already look quite impressive, even better performance can be achieved by fine-tune the model promt for every language.
Further this app could leverage the project information of the team and the involved project by using the project code from bitbucket to create even better promts with higher prior knowleage.
The future is bright 🌞

## DEMO: the generated inception script

This is the full generated script for the above shown input promt.
I hate to say the obvious but yess, I created Frankenstein's DevOps monster. JiPT3 can teach me some nodeJs tricks 😅
```js
/* 
File name: call_openai_api.js
TODO: Call the openAI api to generate code for you. Use the text in the description as input. Save the generated code as markdown file in the root directory.
 */

const fs = require('fs');
const open = require('open');
const fetch = require('node-fetch');
const { promisify } = require('util');
const readline = require('readline-sync');
const writeFileAsync = promisify(fs.writeFile);


// TODO: Use the text in the description as input. Save the generated code as markdown file in the root directory. 
async function start() {

  const url = 'https://api.openai.com/v1/engines/davinci/completions';
  const prompt = '# ';

  const api_key = process.env.OPENAI_API_KEY;
  if (!api_key) {
    console.log('OpenAI API key not found in environment variables');
    return;
  }

  // Get the user input
  const input = readline.question(prompt);

  // Send the request to API
  const response = await fetch(url, {
    method: 'POST', headers: {
      'Content-Type': 'application/json', 'Authorization': `Bearer ${api_,
, key}`
    },
    body: JSON.stringify({ prompt: input, max_tokens: 100 })
  });

  // Check for errors
  if (response.status !== 200) {
    console.log(`Error calling the API ${response.status}`);
    return;
  }

  // Get the response body (JSON) and extract the text field
  const json = await response.json();
  const text = json.choices[0].text;

  // Output the result to stdout and write it to a file in Markdown format
  const markdown = `# ${input}\n${text}`;
  console.log(markdown);

  const filename = 'output.md';
  await writeFileAsync(filename, markdown);
  console.log(`Code generated in file ${filename}`);

  // Open the output file in the default editor
  await open(filename);
}


// Run the main function and catch any error to prevent Node from exiting with a non-zero status code
start().catch((error) => { console.log(error); });
````