import ForgeUI, { render, Fragment, Text, Button, ButtonSet, IssuePanel, useState, useProductContext, Code, Tag, TagGroup, useEffect } from "@forge/ui";
import api, { route } from "@forge/api";
import { getCodeDescription, getCodexCode } from "./openaiApi.js";
import { checkResponse } from "./checkResponse";
import { getADF, getBodyData, postDescription } from "./editIssue.js";
// import { testIssue } from "./transformIssue.js";
// import constants from "./constants.js";
import { attachCode } from "./appendCode.js";
// import { nodeAttach } from "./nodeAttach.js";

const MAX_ITERATIONS = 0;
const LANGUAGES = [
  ['Python3', 'python', 'blue', 'py'],
  ["ReactJs", "javascript", "purple-light", "jsx"],
  ['JavaScript', 'javascript', 'yellow', 'js'],
  ['TypeScript', 'typescript', 'blue-light', 'ts'],
  ['Rust', 'rust', 'red', 'rs'],
  // ['C++', 'c++', 'teal'],
  ['Java', 'java', 'teal-light', 'java'],
  // ['GraphQL', 'graphql', 'purple'],
  ['SQL', 'sql', 'yellow', 'sql'],
  // ['LaTEX', 'latex', 'purple-light'],
];

// const { text, finish_reason } = constants;

const App = () => {
  // Get the context issue key
  const { platformContext: { issueKey } } = useProductContext();
  const [translation, setTranslation] = useState(null);

  const [summary, setSummary] = useState(null);
  const [description, setDescription] = useState(null);


  // Get the issue description and summary
  const getIssue = async () => {
    // Fetch issue fields to translate from Jira
    const issueResponse = await api.asApp().requestJira(route`/rest/api/2/issue/${issueKey}?fields=summary,description`);
    await checkResponse('Jira API', issueResponse);
    const resIssue = (await issueResponse.json()).fields;
    console.log("🚀 resIssue", resIssue)
    // Set the summary and description
    setSummary(resIssue.summary);
    setDescription(resIssue.description);
    console.log("Loaded issue", resIssue.summary);
    return resIssue;
  };

  async function generateCode(codeLang, extension) {

    let fnSummary = summary;
    let fnDescription = description;
    if (summary == null || description == null) {
      const resIssue = await getIssue();
      fnSummary = resIssue.summary;
      fnDescription = resIssue.description;
    }

    const scriptHeader = getCodeDescription({
      codeLang,
      title: fnSummary,
      description: fnDescription,
      extension,
    })

    let resText = scriptHeader;
    let stop = false
    let count = 0

    while (!stop) {
      const { text, finish_reason } = await getCodexCode(resText)
      resText = text
      // Update the UI with the translations
      setTranslation({
        to: codeLang,
        finishReason: finish_reason,
        description: resText,
        count: count,
      });

      count++
      if (finish_reason === 'stop' || count > MAX_ITERATIONS) {
        stop = true
      }
    }
  }
  // Attach the generated code to the issue as file.
  async function attachCodeFile() {
    // await nodeAttach(issueKey)
    await attachCode(issueKey)
  }
  // Add the generated code to the issue description.
  async function addToDescription() {
    const contentAdf = getADF({
      oldContent: description,
      // newContent: "hii",
      newContent: translation.description,
      // codeLang: "javascript",
      codeLang: translation.to,
    });
    await postDescription(issueKey, contentAdf)
    // await testIssue(issueKey)
  }


  // Render the UI
  return (
    <Fragment>
      <ButtonSet>
        {LANGUAGES.map(([label, code, color, extension]) =>
          <Button
            text={label}
            color={color}
            onClick={async () => {
              await generateCode(code, extension);
            }}
          />
        )}
      </ButtonSet>
      {
        translation && (
          <Fragment>
            <Code text={translation.description} language={translation.to} />
            <ButtonSet>
              {/* <Button
                text="Add to Issue Description"
                onClick={async (e) => {
                  await addToDescription(translation.description);
                }}
              /> */}
              {(translation.finishReason !== 'stop')
                ? <Button
                  text={"Generate more code..."}
                  onClick={async () => {
                    const { text, finish_reason } = await getCodexCode(translation.description);
                    setTranslation({
                      to: translation.to,
                      finishReason: finish_reason,
                      description: text,
                    });
                  }
                  }
                />
                : <Button
                  text="Attach as File"
                  onClick={async (e) => {
                    // await addToDescription();
                    await attachCodeFile();
                  }}
                />
              }
            </ButtonSet>
          </Fragment>
        )
      }
    </Fragment >
  );
};



export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);

// const text = '\n' +
//   '\n' +
//   'import random\n' +
//   '\n' +
//   "first_names = ['John', 'Jane', 'Corey', 'Travis', 'Dave', 'Kurt', 'Neil', 'Sam', 'Steve', 'Tom', 'James', 'Robert', 'Michael', 'Charles', 'Joe', 'Mary', 'Maggie', 'Nicole', 'Patricia', 'Linda', 'Barbara', 'Elizabeth', 'Laura', 'Jennifer', 'Maria']\n" +
//   '\n' +
//   "last_names = ['Smith', 'Doe', 'Jenkins', 'Robinson', 'Davis', 'Stuart', 'Jefferson', 'Jacobs', 'Wright', 'Patterson', 'Wilks', 'Arnold', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin']\n" +
//   '\n' +
//   'full_names = []\n' +
//   '\n' +
//   'for i in range(100):\n' +
//   '    first = random.choice(first_names)\n' +
//   '    last = random.choice(last_names)\n' +
//   '    full_names.append(f"{first} {last}")\n' +
//   '\n' +
//   'print(full_names)'
