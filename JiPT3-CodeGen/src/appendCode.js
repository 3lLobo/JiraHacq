// Tyied all the steam tricqs, still not working. What a shitty library forge is.

import api, { route } from "@forge/api";
import FormData from "form-data";
import { Buffer } from "buffer";
import { TextEncoder } from "util";
import { createReadStream, createWriteStream, ReadStream } from "fs";
import { Duplex } from "stream";
// import { setTimeout } from "timers/promises";
import { setTimeout } from "timers";
// import { Url } from "url";
// import { Blob } from "buffer";
// import { Stream } from "form-data";
// import {  } from "form-data";

// class MyDuplex extends Duplex {
//   constructor(options) {
//     super(options);
//   }

//   _write(chunk, encoding, callback) {
//     this.write(chunk, encoding, callback);
//     // this.push(chunk);
//     // callback();
//   }
// }

export function streamFile() {
  const text = "Hello World";
  const buffer = Buffer.from(text, "utf-8");
  // const blob = new Blob([buffer]);
  // console.log("🚀 ~ file: appendCode.js ~ line 14 ~ streamFile ~ blob", blob)
  // const downloadUrl = .createObjectURL(blob)
  // console.log("🚀 ~ file: appendCode.js ~ line 16 ~ streamFile ~ downloadUrl", downloadUrl)
  const writeStream = new Duplex();
  // console.log("🚀 ~ file: appendCode.js ~ line 21 ~ streamFile ~ writeStream", writeStream)
  writeStream.write(buffer);
  writeStream.end();
  // writeStream._write() = writeStream.write()
  let fileSizeInBytes = Buffer.byteLength([buffer]);
  return { fileStream: writeStream, fileSizeInBytes };
}

export async function attachCode(issueIdOrKey) {
  setTimeout(() => {
    console.log("FIXME")
  }, 1000);
  // const fileName = "test.svg";
  // const { fileStream, fileSizeInBytes } = streamFile();
  // const form = new FormData();
  // form.append(fileName, fileStream, { knownLength: fileSizeInBytes });

  // const response = await api.asApp().requestJira(route`/rest/api/2/issue/${issueIdOrKey}/attachments`, {
  //   method: 'POST',
  //   body: form,
  //   headers: {
  //     'Accept': 'application/json',
  //     'X-Atlassian-Token': 'no-check'
  //   }
  // });

  // console.log(`Response: ${response.status} ${response.statusText}`);
  // console.log(await response.json());
}


// Fake ittt