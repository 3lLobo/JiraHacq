/* 
File name: call_openai_api.js
TODO: Call the openAI api to generate code for you. Use the text in the description as input. Save the generated code as markdown file in the root directory.
 */
const fs = require('fs');
const path = require('path');
const fetch = require("node-fetch");

var call_openai_api = async function (description) {
  var encodedDescription = encodeURI(description);

  var response = await fetch("https://api.openai.com/v1/engines/davinci/completions", {
    method: 'POST',
    headers: {
      "Authorization": "Bearer sk-q3f0QwErIcZa7G8PzT9IeoGxFmHq3Vh1BgWX9Yn",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: encodedDescription,
      max_tokens: 100,
      temperature: 0.7,
      top_p: 1,
      n: 1,
      stream: false,
    })
  });

  var json = await response.json();

  console.log(json);

  var generatedCode = json.choices[0].text;

  return generatedCode;
}

var saveGeneratedCode = function (generatedCode, filePath) {
  fs.writeFile(filePath, generatedCode, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
}

var getDescription = function () {

  var filePath = path.join(__dirname, '../../README.md');

  var description = "";

  var readStream = fs.createReadStream(filePath);

  readStream.on('data', function (chunk) {
    description += chunk;
  });

  readStream.on('end', function () {
    console.log("description: " + description);

    var generatedCode = call_openai_api(description);

    saveGeneratedCode(generatedCode, filePath);
  });

  readStream.on('error', function (err) {
    console.log("err: " + err);
  });
}

getDescription();