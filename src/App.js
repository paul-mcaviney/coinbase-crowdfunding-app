import elon from './elon.jpg';
import './App.css';
import React, { useState, useEffect } from 'react';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

const Web3 = require('web3'); 

const APP_NAME = 'Crowdfunding App'
//const APP_LOGO_URL = 'https://example.com/logo.png'
const DEFAULT_ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/<YOUR_INFURA_API_KEY>';
const DEFAULT_CHAIN_ID = 3; // Ropsten Network ID

// Initialize Coinbase Wallet SDK
export const coinbaseWallet = new CoinbaseWalletSDK({
    appName: APP_NAME,
})

// Initialize Web3 Provider
export const ethereum = coinbaseWallet.makeWeb3Provider('', DEFAULT_CHAIN_ID);

// Initialize Web3 object
export const web3 = new Web3(ethereum);
console.log(web3);

function App() {

    // State Variables
    const [isConnected, setIsConnected] = useState(false);


    const connectWallet = () => {
        // insert the coinbase wallet sdk initialization here I think
        console.log("Connecting wallet dialogue")
        setIsConnected(!isConnected);
    }


  return (
    <div className="App">
      <header className="App-header">
        <img src={elon} alt="Elon holding the Twitter logo" />
        <p>
          Let's buy Twitter before Elon does!
        </p>
        {/* this button should change depending if the user is connected or not*/}
        {!isConnected ? (
            <button onClick={connectWallet} className="button" name="connectButton" id="connectButton">Connect Wallet</button>
        ) : <button onClick={connectWallet} className="button" name="connectButton" id="connectButton">Please Donate</button>
        }

      </header>
    </div>
  );
}

export default App;