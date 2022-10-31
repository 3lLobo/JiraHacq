// This sample uses Atlassian Forge - which doenst work for nested Objects -.-
// https://developer.atlassian.com/platform/forge/
import api, { route } from "@forge/api";
import qs from "qs";

export function validateJson(body) {
  try {
    const json = JSON.stringify(body);
    JSON.parse(json);
  } catch (e) {
    console.log("🚀 ~ file: editIssue.js ~ line 9 ~ validateJson ~ e", e)
    return false;
  }
  return true;
}

export async function postDescription(issueKey, bodyData) {

  console.log("Json valid? ", validateJson(bodyData))


  console.log("🚀 ~ file: editIssue.js ~ line 13 ~ postDescription ~ bodyData", bodyData)
  const response = await api.asApp().requestJira(route`/rest/api/3/issue/${issueKey}`, {
    method: 'PUT',
    query: {
      notifyUsers: true
    },
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyData,
    // body: qs.parse(qs.stringify(bodyData, '')),
  });
  console.log(`Response: ${response.status} ${response.statusText}`);
  // console.log(await response.json());
  console.log("🚀response", await response.json())

}

export function getBodyData({ contentAdf, codeText, codeLang }) {

  const cleanCodeText = codeText.replace(/"/g, '\\"')
  // const bodyData = {
  //   "update": {
  //     "description": [
  //       {
  //         "set": {
  //           "type": "doc",
  //           "version": 1,
  //           "content": [
  //             {
  //               "type": "paragraph",
  //               "content": [
  //                 {
  //                   "type": "text",
  //                   "text": "Hii   Dude"
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       }
  //     ]
  //   }
  // }

  const bodyData = {
    "update": {
      "description": [
        {
          "set": qs.stringify(contentAdf)
        }
      ]
    }
  }

  return bodyData
}

export function getADF({ oldContent, newContent, codeLang }) {
  // const codeLang = 'python'
  return `{
    "update": {
      "description": [
        {
          "set": {
            "type": "doc",
            "version": 11,
            "content": [
              {
                "type": "codeBlock",
                "content": [
                  {
                    "type": "text",
                    "text": "NEWWW111"
                  },
                  {
                    "type": "text",
                    "text": "def(someCode):moreee",
                    "marks": [
                      {
                        "type": "code",
                        "attrs": {
                          "language": "javascript"
                        }
                      }
                    ]
                  }
                ]
              }

            ]
          }
        }
      ]
    }
  }`
}
