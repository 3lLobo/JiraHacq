# JiPT3 ![hsvg](res/codeGen.svg)

![svg](res/codeGenHacq.svg)


The most powerful AI model at your service. Let OpenAI's GPT3 model generate code for you.
Simply choose the desired programming language and save the generated code.

[SourceCode](https://github.com/3lLobo/JiraHacq)

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