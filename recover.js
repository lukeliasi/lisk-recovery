const lisk = require('lisk-js');
const program = require('commander');
const wordlist = require('./bip0039-wordlist');
const promptly = require('promptly');
const stayAwake = require('stay-awake');
const colors = require('colors');

// Testnet passphrase:
// day start afford analyst vibrant foot tiny curtain tennis pear taxi cause

program
.version('1.0.1')
.option('-t, --testnet', 'Run in testnet mode')
.parse(process.argv);

console.log('\nLisk passphrase recovery tool. '.green + 'v'.yellow + program._version.yellow);
if (program.testnet) {
  console.log('TESTNET MODE ON'.red);
}

const validator = (input) => {
  input = input.toLowerCase().split(" ").filter(Boolean);
  if (input.length !== 11) {
    throw new Error('Input error: Enter exactly 11 words.\n'.red);
  }
  input.forEach(inputWord => {
    if (!wordlist.includes(inputWord)) {
      throw new Error(`Input error: ${inputWord.yellow} is not a valid word in a Lisk passphrase.\n`.red);
    }
  });
  return input;
};

let input;
const userInput = () => promptly.prompt('Enter the 11 words you know, in order. The tool will then try to recover the missing word:'.white, { validator: validator }, (err, input) => {
  generatePassphrases(input);
});

userInput();

const generatePassphrases = (inputs) => {
  console.log('\nGenerating passphrases...'.cyan);
  const passphrases = [];
  wordlist.forEach(word => {
    [...Array(12)].forEach((_, index) => {
      let test = inputs.slice();
      test.splice(index, 0, word);
      const passphrase = test.join(' ');
      passphrases.push(passphrase);
    });
  });
  console.log('Done\n');
  testPassphrases(passphrases);
}

const testPassphrases = (passphrases) => {
  console.log('Starting...'.yellow)
  let index = 0;
  const loadWords = () => {
    if (index < passphrases.length) {
      let wordToLoad = passphrases[index];
      const testAccount = () => {
        const create = lisk.crypto.getPrivateAndPublicKeyFromSecret(wordToLoad);
        const address = lisk.crypto.getAddress(create.publicKey);
        const callback = (account) => {
          if (account.success) {
            console.log(`Your passphrase has been successfully found! Your passphrase is: ${wordToLoad.magenta}`);
            console.log('\nIf this tool worked and recovered overwise lost funds consider donating: ' + '10553198736677725420L'.magenta);
            process.exit();
          } else {
            console.log('NOT: '.red + wordToLoad + ` (tried ${index + 1} of 24576 possible combinations)`.yellow);
            ++index;
            loadWords(); 
          }
        }
        const account = lisk.api({testnet: program.testnet ? true : false}).getAccount(address,  callback);
      }
      testAccount();
    } else {
      console.log('\nSorry, your passphrase could not be found. You must have inputted the know words in the incorrect order or have the wrong words.');
      process.exit();
    }
  }
  loadWords();
}