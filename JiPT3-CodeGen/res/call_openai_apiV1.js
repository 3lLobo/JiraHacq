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
      'Content-Type': 'application/json', 'Authorization': `Bearer ${api_key}`
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