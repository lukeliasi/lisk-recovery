// Requires
const request = require("request");
const fs = require("fs");
const readline = require("readline");
const stdin = process.openStdin();
const words = require('./wordlist.json')

// Globals
const apiUrl = 'https://login.lisk.io';

// Post request to API
const testAccount = function(knownWords, callback) {
  request.post({ 
    url: apiUrl + "/api/accounts/open", 
    form: { 
      secret: knownWords
    },
    json: true,
  }, callback);
}

// Start
console.log('Lisk Passphrase recovery tool.');

// User input know words
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('Enter 11 words in order and the tool will try to recover the missing word:\n', (input) => {
  knownWords = input.toString().trim().split(" ");
  let wordsLength = knownWords.length + 1;
  rl.close();
  run(knownWords, wordsLength);
});

// Run script
function run(knownWords, wordsLength) {
  console.log('Attempting to find passphrase, this might take a while...');

  words.forEach(function (word, i) {    
    for (position = 0; position < wordsLength; position++) {
      
      // Generate passphrase to string
      let knownWordsArr = knownWords.slice();
      knownWordsArr.splice(position, 0, word);
      let passphrase = knownWordsArr.join(" ");

      setTimeout(function () {
        testAccount(passphrase, function(error, success, response) {
          if (response && response.account.balance != '0') {
          // if (response && response.account.publicKey == "524119806fbaeb5cd20781d045e8bfc3e1c7ba785fd71660d47b7c6ec6ad228e") {
            console.log("\nYour passphrase has been successfully found, '" + word + "' was the missing word:\n______\n\n" + passphrase);
            console.log("______\n\n If you found this tool useful, consider donating:\n 16684326938137745369L");
            process.exit();
          }
          else {
            console.log(passphrase + " (incorrect)");
          }
        });
      }, 25 * (i + 0.1));
    }
  });
}