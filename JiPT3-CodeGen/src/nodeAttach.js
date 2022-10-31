// Exact copy from the docs - doesnt worq

export function nodeAttach(issueKey) {
  // This code sample uses the 'node-fetch' and 'form-data' libraries:
  // https://www.npmjs.com/package/node-fetch
  // https://www.npmjs.com/package/form-data
  const fetch = require('node-fetch');
  const FormData = require('form-data');
  const fs = require('fs');
  const buffer = require('buffer');

  const form = new FormData();
  // const filePath = 'myfile.txt';
  // const stats = fs.statSync(filePath);
  // const fileSizeInBytes = stats.size;
  //  const fileStream = fs.createReadStream(filePath);
  const fileStream = buffer.Buffer.from('Hello World', 'utf-8');
  form.append('file', fileStream, { knownLength: buffer.Buffer.byteLength(fileStream) });
  console.log("🚀 ~ file: nodeAttach.js ~ line 19 ~ nodeAttach ~ form", form)

  fetch(`https://jirahacq.atlassian.net/rest/api/3/issue/$issueKey}/attachments`, {
    method: 'POST',
    body: form,
    headers: {
      'Authorization': `Basic ${Buffer.from(
        'uruguayitooo@gmail.com:'
      ).toString('base64')}`,
      'Accept': 'application/json',
      'X-Atlassian-Token': 'no-check'
    }
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));
}