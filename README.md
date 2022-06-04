# Coinbase Crowdfunding App

A simple crowdfunding app using the Coinbase Wallet SDK

## Initial Setup

1. Create an [Infura](http://infura.io/) account if you don't already have one.
2. [Create a new Ethereum project](https://infura.io/create-project) in your Infura account. (For the "product" I used "Ethereum", and for the "project name" I used "Coinbase Crowdfunding App".)
3. When viewing your new Ethereum project, find the Endpoints section, choose the Ropsten testnet, and then copy the first URL there.
4. Create an `.env` file in this repo.
5. Add a new environment variable to the `.env` file. Give it the name `REACT_APP_INFURA_RPC_URL`. The value will be your URL you copied from your Ethereum project in the Infura dashboard.
6. Add a second environment variable to the `.env` file. Give it the name `REACT_APP_RECEIVING_WALLET_ADDRESS`. The value will be the wallet address of where you would like funds to be sent when users click the Donate button in the app.

## Running the App Locally

1. `npm install` to install dependencies
2. `npm start` to start the app locally on http://localhost:3000/

## Using the App

1. Click the "Connect" button to connect your wallet to the app. This could be something like a Coinbase or MetaMask wallet.
2. Once your wallet is connected, update the value in the number input to set your donation amount. The values are in WEI, the smallest denomination of ETH.
3. Click the "Donate" button to initiate the transaction. This will cause your wallet browser extension to pop up so that you can confirm or reject the transaction.
