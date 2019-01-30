'use strict';

// [START translate_quickstart]
async function quickstart(
  projectId = "" // Your GCP Project Id
) {
  // Imports the Google Cloud client library
  const {Translate} = require('@google-cloud/translate');

  // Instantiates a client
  const translate = new Translate({projectId, keyFilename : 'keyTranslate.json'});

  // The text to translate
  const text = 'Hello';

  // The target language
  const target = 'ru';

  // Translates some text into Russian
  const [translation] = await translate.translate(text, target);
  console.log(`Text: ${text}`);
  console.log(`Translation: ${translation}`);
}
// [END translate_quickstart]

const args = process.argv.slice(2);
quickstart(...args).catch(console.error);