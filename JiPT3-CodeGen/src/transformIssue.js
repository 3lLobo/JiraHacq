// For texting purposes

import api, { route } from "@forge/api";

export async function testIssue(issueIdOrKey) {

  var bodyData = `{
    "fields": {
      "summary": "get meaning of life",
    }
  }`;

  const response = await api.asApp().requestJira(route`/rest/api/3/issue/${issueIdOrKey
    }`,
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: bodyData,
    });
  console.log("🚀 response", await response.json())
}