
import api from "@forge/api";
import { checkResponse } from "./checkResponse";
import { supportsLanguage, comment } from '@igor.dvlpr/comment-it'

// const TASKS = 'edits'
const TASKS = 'completions'
const API_ENDPOINT = `https://api.openai.com/v1/${TASKS}`;
const CODEX = "code-davinci-002";
const MAX_TOKENS = 131;
const TEMP = 0.5;


export async function getCodexCode(prompt) {

  const codexResponse = await api.fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY.replace(/"/g, ''),
    },
    body: JSON.stringify({
      prompt,
      "model": CODEX,
      "temperature": TEMP,
      "max_tokens": MAX_TOKENS,
      "top_p": 1,
      "frequency_penalty": 0.51,
      "presence_penalty": 0.1,
    }
    )
  });

  const codexJson = await codexResponse.json();
  // console.log("🚀codexJson", codexJson)
  // await checkResponse("Codex", codexJson)
  const { text, finish_reason } = codexJson.choices[0];
  console.log("🚀text", text)
  const resText = prompt + text;
  console.log("resText", finish_reason, '\n', resText)

  return { text: resText, finish_reason }
}

/* Prepare the instruction for Codex. First tell it which language to program in, then add the description of what to do. Finally prepare the string to be stringified in JSON.*/
export function getCodeDescription({ codeLang, title, description, extension }) {
  console.log("Supported", codeLang, supportsLanguage(codeLang))
  const fileName = title.replace(/ /g, '_').toLowerCase() + '.' + extension;
  // console.log("fileName", fileName)
  const instructionHeader = `File name: ${fileName}\n`;
  const instructionBody = `TODO: ${description.replace('\n', ' ')}`

  let instruction
  for (const [key, value] of Object.entries(comment)) {
    if (key.toLowerCase() === codeLang.toLowerCase()) {
      if (['python', 'javascript', 'typescript'].includes(codeLang.toLowerCase())) {
        console.log('Multiline')
        instruction = value.multi('\n' + instructionHeader + instructionBody + '\n')
      } else {
        instruction = value.single(instructionHeader) + value.single(instructionBody)
      }
    }
  }

  console.log("instruction", instruction)
  return instruction.replace(/"/g, '\\"')
}