# codegeist 2022 - JiPT3

![altcodegeist](res/codegeist.png)

The most powerful AI model at your service. Let OpenAI's GPT3 model generate code for you.
Simply choose the desired programming language and save the generated code.

This Jira app takes your issue title and description as input and generates a complete script for you.

We building a ML code generator.
Write your Jira-task as specific as you can, bcs you won't have to code them anymore.
JiPT will do the heavy lifting for you. 

Read more in the [JiPT3 Readme](/JiPT3-CodeGen/README.md).

## Get started

This repo holds tutorials, home-grown apps and unfinished experiments. Proceed with caution 🐾

No more need to install forge globally.
Just set the `.env` file and `cd` into the app directory. I customized the package scripts to work call the forge commands. In short:
```bash
yarn
cd JiPT3-CodeGen/
yarn
yarn build
yarn install
yarn tunnel
yarn forge <any_forge_cmd_you_want>
```

Or follow the not so elegant `npx` route.

- install [ForgeCLI](https://developer.atlassian.com/platform/forge/getting-started/#install-the-forge-cli)

![DevPostBanner](res/banner.png)

Load the env into bash:
```sh
export $(grep -v '^#' .env | xargs -d '\n')
```

Develope with docker and tunnel
```sh
npx forge tunnel
```

Set the secret API key:
```sh
npx forge variables set --encrypt OPENAI_API_KEY xxxxxxxxxx
```

## OpenAI

We got accexx to the new codex-davinci002 model :)

[Best practice](https://beta.openai.com/docs/guides/code/editing-code)
