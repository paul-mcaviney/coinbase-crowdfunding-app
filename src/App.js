import React, { useState } from 'react';
import Web3 from 'web3';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import elon from './elon.jpg';
import './App.css';

const APP_NAME = 'Coinbase Crowdfunding App';
const APP_LOGO_URL = './elon.jpg';
const RPC_URL = process.env.REACT_APP_INFURA_RPC_URL;
const CHAIN_ID = 3; // Ropsten Network ID
const RECEIVING_WALLET_ADDRESS = process.env.REACT_APP_RECEIVING_WALLET_ADDRESS;

// Initialize Coinbase Wallet SDK
const coinbaseWallet = new CoinbaseWalletSDK({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
});

// Initialize Web3 Provider
const walletSDKProvider = coinbaseWallet.makeWeb3Provider(RPC_URL, CHAIN_ID);

// Initialize Web3 object
const web3 = new Web3(walletSDKProvider);

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [account, setAccount] = useState();

  const checkIfWalletIsConnected = () => {
    if (!window.ethereum) {
      console.log(
        'No ethereum object found. Please install Coinbase Wallet extension or similar.'
      );

      // Enable the provider and cause the Coinbase Onboarding UI to pop up
      web3.setProvider(walletSDKProvider.enable());

      return;
    }

    console.log('Found the ethereum object:', window.ethereum);
    connectWallet();
  };

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (!accounts.length) {
      console.log('No authorized account found');
      return;
    }

    if (accounts.length) {
      const account = accounts[0];
      console.log('Found an authorized account:', account);
      setAccount(account);

      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x3' }],
        });
        console.log('Successfully switched to Ropsten Network');
      } catch (error) {
        console.error(error);
      }
    }

    setIsWalletConnected(true);
  };

  const donateETH = async () => {
    if (!account || !window.ethereum) {
      console.log('Wallet is not connected');
      return;
    }

    const donationAmount = document.querySelector('#donationAmount').value;

    const receipt = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: account,
          to: RECEIVING_WALLET_ADDRESS,
          value: donationAmount,
        },
      ],
    });

    console.log(`Thank you for donating! Here's your receipt: ${receipt}`);
  };

  const resetCoinbaseWalletConnection = () => {
    walletSDKProvider.close();
  };

  return (
    <main className="app">
      <header>
        <img
          src={elon}
          className="headerImage"
          alt="Elon holding the Twitter logo"
        />
        <h1>Let's buy Twitter before Elon does!</h1>
      </header>

      {isWalletConnected ? (
        <>
          <p>Connected Account: {account}</p>
          <div>
            <input type="number" id="donationAmount" defaultValue={10000} />
            <label htmlFor="donationAmount">WEI</label>
            <button onClick={donateETH} id="donate" type="button">
              Donate
            </button>
          </div>
          <div>
            <button
              id="reset"
              type="button"
              onClick={resetCoinbaseWalletConnection}
            >
              Reset Connection
            </button>
          </div>
        </>
      ) : (
        <button onClick={checkIfWalletIsConnected} id="connect" type="button">
          Connect Wallet
        </button>
      )}
    </main>
  );
};

export default App;
