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
</head>

<body>
  <script>${json}</script>
  <div id="root"></div>
</body>

</html>`;

const defaultTranslate = text => Promise.resolve(text);

const awsTranslate = (lang, text) => {
  const params = {
    SourceLanguageCode: LANG_DEFAULT,
    TargetLanguageCode: lang,
    Text: text
  };

  // return translate.translateText(params).promise();

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
      introduction: {
        heading: await translator("Hello"),
        description: await translator("How are you?")
      },
      form: {
        name: {
          label: await translator("First Name"),
          error: await translator("First name is required")
        }
      }
    };

    console.log("\n", { transcript });
    const json = JSON.stringify(transcript);
    console.log("\n", json);
    const html = createHtml(lang, json);
    console.log("\n", { html });
  }
};

// init(["en"]);
init(["en", "fr"]);
// init(['en', 'fr', 'de']);
