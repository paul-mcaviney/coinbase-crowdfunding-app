import elon from './elon.jpg';
import './App.css';
import React, { useState, useEffect } from 'react';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

const Web3 = require('web3'); 

const APP_NAME = 'Crowdfunding App'
const APP_LOGO_URL = './elon.jpg'
const RPC_URL = '<YOUR_INFURA_RPC_URL>'; // Node provider URL required for backup
const CHAIN_ID = 3; // Ropsten Network ID

// The wallet address for our multisig to send donations to
const WALLET_ADDRESS = "<MULTISIG_WALLET_ADDRESS>";
const DONATION_AMOUNT = "10000"; // change this to however much wyou like NOTE: this value is in `wei` not `ETH`

// Initialize Coinbase Wallet SDK
export const coinbaseWallet = new CoinbaseWalletSDK({
    appName: APP_NAME,
    appLogoUrl: APP_LOGO_URL, 
});

// Initialize Web3 Provider
export const walletSDKProvider = coinbaseWallet.makeWeb3Provider(RPC_URL, CHAIN_ID);

// Initialize Web3 object
export const web3 = new Web3(walletSDKProvider);


const App = () => {

    
    // State Variables
    const [ethereum, setEthereum] = useState();
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState();

    //let ethereum;

    const checkIfWalletIsConnected = async () => {

        try {
            if (!ethereum) {
                console.log("No ethereum object found, please install Coinbase Wallet extension or similar");

                // Enable the provider and cause the Coinbase Onboarding UI to pop up
                web3.setProvider(walletSDKProvider.enable());
            } else {
                console.log("Found the ethereum object:", ethereum);
                connectWallet();
            }
        } catch (error) {
            console.error(error);
        }
          
    }


    const connectWallet = async () => {

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account:", account);
                setAccount(account);

                // Add the Ropsten Network to wallet
                try {
                    await ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x3"}]});
                    console.log("Successfully switched to Ropsten Network");
                } catch (error) {
                    console.error(error);
                }

            } else {
                console.log("No authorized account found");
            }

        setIsConnected(!isConnected);
    }

    const donateETH = async () => {
        // Function to donate ETH to the specified wallet address
        if (account && ethereum) {
           const receipt = await ethereum.request({
               method: "eth_sendTransaction",
               params: [{
                   from: account,
                   to: WALLET_ADDRESS,
                   value: DONATION_AMOUNT
               }]
           }) 

           console.log("Thank you for donating!");
           console.log(receipt);

        } else {
            console.log("Not connected");
        }
    }

    useEffect(() => {
        // Check if the Ethereum object is available        
        setEthereum(window.ethereum);

        if(!ethereum) {
            console.log("No ethereum object found");
        } else {
            console.log("ethereum object found");
        }
    }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={elon} className="Elon" alt="Elon holding the Twitter logo" />
        <p className="MainText">
          Let's buy Twitter before Elon does!
        </p>
        
        {/* this button should change depending if the user is connected or not*/}
        {!isConnected ? (
            <button onClick={checkIfWalletIsConnected} className="button" name="connectButton" id="connectButton">Connect Wallet</button>
        ) : <div>
                <p>Connected Account: {account}</p>
                <button onClick={donateETH} className="button" name="connectButton" id="connectButton">Please Donate</button>
            </div>
        }

      </header>
    </div>
  );
}

export default App;