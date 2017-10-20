# Lisk Passphrase Recovery Tool
A tool to recover a single missing word in a Lisk wallet passphrase.

![Demo](https://j.gifs.com/9QrnL3.gif)

## How it works
This tool currently can recover a passphrase if you know 11 of the 12 words. Enter 11 words and it will generate all possible combinations from the BIP 39 word list. These combinations will then open Lisk accounts via the API and check the account balance. If the balance is more than 0 the account passphrase will be found.

## Prerequisites
[git](https://git-scm.com/downloads)

[python](https://www.python.org/downloads/)

## Installation
``git clone git@github.com:lukeliasi/lisk-recovery.git``

``cd lisk-recovery``

``pip install -r requirements.txt``

``python recovery.py``

## Test
Append `test` to the command to run test net mode. `python recovery.py test`. You can use this passphrase with a testnet balance to test: `day start afford analyst vibrant foot tiny curtain tennis pear taxi cause`