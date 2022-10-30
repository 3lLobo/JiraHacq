# My JiraHacq - JiPT

![altcodegeist](res/codegeist.png)


# codegeist 2022 

We building a ML code generator.
Write your Jira-task as specific as you can, bcs you won't have to code them anymore.
JiPT will do the heavy lifting for you. 


## Get started

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

We got accex to the new codex-davinci002 model :)

[Best practice](https://beta.openai.com/docs/guides/code/editing-code)

## TODO

- Read the issue body.
- Prompt to choose language.
- Codex api call.
- Display the text.
- Publish on marketplace