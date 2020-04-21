# Lisk Passphrase Recovery Tool
A tool to recover a single missing word in a Lisk wallet passphrase.

## How it works
This tool currently can recover a passphrase if you know 11 of the 12 words. Enter 11 words and it will generate all possible combinations from the BIP 39 word list. This tool will only work if the account has a balance and transactions.

## Prerequisites
[git](https://git-scm.com/downloads)

[nodejs](https://nodejs.org/en/download/)

## Installation
``git clone https://github.com/lukeliasi/lisk-recovery.git``

``cd lisk-recovery``

``npm install``

## Run
You should run this tool in Terminal on OSX or cmd.exe or equivalent in Windows. Then when inside the project folder run:

``node recover``

**Note:** This script will pause if your computer sleeps. It is recommended to turn off auto sleep/power saving if you are not using the computer while the script runs.

## Test
Append `-t` to the command to run test net mode. `node recover -t`. You can use this passphrase with a testnet balance to test: `day start afford analyst vibrant foot tiny curtain tennis pear taxi cause`

### Donations
If this tool worked and recovered overwise lost funds consider donating: **10553198736677725420L**
