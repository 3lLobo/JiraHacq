const { Configuration, OpenAIApi } = require("openai");

const CODEX = "code-davinci-002";
const MAX_TOKENS = 311;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function gpt3code(textInput) {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: "Say this is a test",
    temperature: 0,
    max_tokens: 6,
  });
  return response;
}


export async function codexCodeGen({ textInput, temperature }) {
  const response = await openai.createCompletion({
    model: CODEX,
    prompt: textInput,
    temperature: temperature,
    max_tokens: MAX_TOKENS,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response;
}

// const response = await openai.createCompletion({
//   model: "code-davinci-002",
//   prompt: "\"\"\"\n1. Create a list of first names\n2. Create a list of last names\n3. Combine them randomly into a list of 100 full names\n\"\"\"",
//   temperature: 0,
//   max_tokens: 300,
// });