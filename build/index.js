const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);
const PRODUCTION_ENV = "production";
const { NODE_ENV = PRODUCTION_ENV } = process.env;
const isProduction = NODE_ENV === PRODUCTION_ENV;
const mkdir = promisify(fs.mkdir);
const dirDist = path.resolve(__dirname, "../", "dist");
const dirJs = isProduction ? "" : dirDist;
const AWS = require("aws-sdk");

AWS.config.region = "us-east-1";

const LANG_DEFAULT = "en";
const translate = new AWS.Translate({ apiVersion: "2017-07-01" });

const createHtml = (lang = LANG_DEFAULT, json = "") =>
  "<!DOCTYPE html>" +
  `<html lang="${lang}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
  <title>Matcha Ice Cream</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
    }
  </style>
</head>

<body>
  <script id="rehydrate" type="application/json">${json}</script>
  <div id="root"></div>
  <script src="${dirJs}/main.js" async></script>
</body>

</html>`;

const defaultTranslate = text => Promise.resolve(text);

const awsTranslate = (lang, text) => {
  const params = {
    SourceLanguageCode: LANG_DEFAULT,
    TargetLanguageCode: lang,
    Text: text
  };

  return new Promise((resolve, reject) => {
    translate.translateText(params, (error, response) => {
      // {
      //   "TranslatedText": "- Bonjour",
      //   "SourceLanguageCode": "en",
      //   "TargetLanguageCode": "fr"
      // }
      if (error) reject(error);
      resolve(response.TranslatedText);
    });
  });
};

const createTranslator = (lang = LANG_DEFAULT) => text =>
  lang === LANG_DEFAULT ? defaultTranslate(text) : awsTranslate(lang, text);

const init = async langs => {
  console.log("\n\n\n\n");
  for (const lang of langs) {
    const translator = createTranslator(lang);

    const transcript = {
      langs,
      introduction: {
        heading: await translator("30-day free trial"),
        description: await translator(
          "Try every feature, add unlimited users, no credit card required"
        )
      },
      form: {
        first: {
          label: await translator("First Name"),
          error: await translator("First name is required")
        },
        last: {
          label: await translator("Last Name"),
          error: await translator("Last name is required")
        },
        email: {
          label: await translator("Email Address"),
          error: await translator("Email address is required")
        },
        phone: {
          label: await translator("Phone Number"),
          error: await translator("Phone number is required")
        },
        country: {
          label: await translator("Country"),
          options: [
            await translator("America"),
            await translator("New Zealand"),
            await translator("Germany"),
            await translator("France"),
            await translator("Spain")
          ],
          error: await translator("Country is required")
        },
        terms: {
          label: await translator(
            "I have read and I agree to the terms of use, privacy policy and offer details"
          )
        },
        submit: {
          label: await translator("Get Started")
        }
      },
      success: {
        heading: await translator("Check your inbox"),
        description: await translator("Confirm your email address to continue"),
        label: await translator("Awesome")
      }
    };

    console.log("\n", { transcript });
    const json = JSON.stringify(transcript);
    console.log("\n", json);
    const html = createHtml(lang, json);
    console.log("\n", { html });
    await mkdir(`${dirDist}/${lang}`);
    await writeFile(`${dirDist}/${lang}/index.html`, html);
    if (lang === LANG_DEFAULT) await writeFile(`${dirDist}/index.html`, html);
  }
};

module.exports = init;
