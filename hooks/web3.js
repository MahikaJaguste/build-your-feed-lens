import { useState } from 'react'
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { login } from '../lens-api/authentication/login-user';
import { verify } from '../lens-api/authentication/verify-jwt';

const providerOptions = {};

const web3Modal = new Web3Modal({
    network: "mumbai",
    cacheProvider: true,
    providerOptions,
});

export function useWeb3Modal() {

    const [modalProvider, setModalProvider] = useState(undefined);
    const [modalSigner, setModalSigner] = useState(undefined);
    const [modalSignerAddress, setModalSignerAddress] = useState(undefined);
    const [modalNetworkId, setModalNetworkId] = useState(undefined);
    const [modalError, setModalError] = useState(null);

    // Automatically connect if the provider is cashed but has not yet
    // been set (e.g. page refresh)
    if (web3Modal.cachedProvider && !modalProvider) {
        connectWallet();
    }

    async function connectWallet() {
        let ethersProvider, ethersAddress;
        try {
            const externalProvider = await web3Modal.connect();
            ethersProvider = new ethers.providers.Web3Provider(externalProvider);
            // console.log(ethersProvider)
            setModalProvider(ethersProvider);
            const ethersSigner = ethersProvider.getSigner();
            setModalSigner(ethersSigner);
            ethersAddress = await ethersSigner.getAddress();
            setModalSignerAddress(ethersAddress);
            const ethersNetworkId = await ethersProvider.getNetwork();
            setModalNetworkId(ethersNetworkId);
        } 
        catch(e) {
            setModalError('NO_WALLET_CONNECTED');
            console.log('NO_WALLET_CONNECTED', e);
        }

        let verified = false;
        if(localStorage.getItem('auth_token')){
            try{
                const auth_token = window.localStorage.getItem('auth_token');
                const response = await verify(auth_token);
                verified = response.data.verify;
                console.log('Verified', verified)
            }
            catch(e) {
                console.log('error in verification', e)
            }
        }

        if(!verified){
            try {
                await login(ethersAddress, ethersProvider);
                console.log('did login')
            } 
            catch (e) {
                console.log('error in login: ', e);
            }
        }
    }

    function disconnectWallet() {
        web3Modal.clearCachedProvider();
        setModalProvider(undefined);
        setModalSigner(undefined);
        setModalSignerAddress(undefined);
        setModalNetworkId(undefined);
    }

    return { connectWallet, disconnectWallet, modalProvider, modalSigner, modalSignerAddress, modalNetworkId, modalError  }

}