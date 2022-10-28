import ForgeUI, { render, Fragment, Text, Button, ButtonSet, IssuePanel, useState, useProductContext } from "@forge/ui";
import api, { route } from "@forge/api";

// API docs: https://docs.microsoft.com/en-au/azure/cognitive-services/translator/reference/v3-0-translate
const TRANSLATE_API = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';

// See children of the 'dictionary' property from the response from the 
// following URL for valid language codes:
//
//   https://api.cognitive.microsofttranslator.com/languages?api-version=3.0
//
// LANGUAGES is an Array of ['Button text', 'Language code']. 
const LANGUAGES = [
  ['🇯🇵 日本語', 'ja'], 
  ['🇰🇷 한국어', 'ko'], 
  ['🇬🇧 English', 'en'],
];

const App = () => {
  // Get the context issue key
  const { platformContext: { issueKey } } = useProductContext();
  // Set up a state object to hold translations
  const [translation, setTranslation] = useState(null);  
  
  async function setLanguage(countryCode) {
    // Fetch issue fields to translate from Jira
    const issueResponse = await api.asApp().requestJira(route`/rest/api/2/issue/${issueKey}?fields=summary,description`);
    await checkResponse('Jira API', issueResponse);
    const { summary, description } = (await issueResponse.json()).fields;

    // Translate the fields using the Azure Cognitive Services Translatioon API
    const translateResponse = await api.fetch(`${TRANSLATE_API}&to=${countryCode}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        // See README.md for details on generating a Translation API key
        'Ocp-Apim-Subscription-Key': process.env.TRANSLATE_API_KEY,
        'Ocp-Apim-Subscription-Region': process.env.TRANSLATE_API_LOCATION
      },
      body: JSON.stringify([{Text:summary}, {Text:description || 'No description'}])
    });
    await checkResponse('Translate API', translateResponse);
    const [summaryTranslation, descriptionTranslation] = await translateResponse.json();

    // Update the UI with the translations
    setTranslation({
      to: countryCode,
      summary: summaryTranslation.translations[0].text,
      description: descriptionTranslation.translations[0].text
    });
  }

  // Render the UI
  return (
    <Fragment>
      <ButtonSet>
        {LANGUAGES.map(([label, code]) => 
          <Button 
            text={label} 
            onClick={async () => { await setLanguage(code); }} 
          />
        )}
      </ButtonSet>
      {translation && (        
        <Fragment>
          <Text content={`**${translation.summary}**`} />
          <Text content={translation.description} />
        </Fragment>
      )}
    </Fragment>
  );
};

/**
 * Checks if a response was successful, and log and throw an error if not. 
 * Also logs the response body if the DEBUG_LOGGING env variable is set.
 * @param apiName a human readable name for the API that returned the response object
 * @param response a response object returned from `api.fetch()`, `requestJira()`, or similar
 */
async function checkResponse(apiName, response) {
  if (!response.ok) {
    const message = `Error from ${apiName}: ${response.status} ${await response.text()}`;
    console.error(message);
    throw new Error(message);
  } else if (process.env.DEBUG_LOGGING) {
    console.debug(`Response from ${apiName}: ${await response.text()}`);
  }
}

export const run = render(
<IssuePanel>
  <App />
</IssuePanel>
  );