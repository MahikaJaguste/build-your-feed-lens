import { useContext, useEffect, useState } from "react";
import { AppContext } from "../pages/_app";
import { useWeb3Modal } from "../hooks/web3";

import { Button } from '@chakra-ui/react'

const truncateAddress = (address) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
};

const ConnectWallet = () => {

    const { connectWallet, disconnectWallet, modalProvider, modalSigner, modalSignerAddress, modalNetworkId, modalError } = useWeb3Modal();
    const { 
        provider,
        setProvider,
        signer,
        setSigner,
        signerAddress,
        setSignerAddress,
        networkId,
        setNetworkId } = useContext(AppContext);

    useEffect(() => {
        setProvider(modalProvider)
        setSigner(modalSigner)
        setSignerAddress(modalSignerAddress)
        setNetworkId(modalNetworkId)
      }, [modalNetworkId])

    useEffect(()=>{
        if(provider){
            provider.provider.on("chainChanged", (e) => {
                if(e != toHex(80001)){
                    switchNetwork();
                }
            });
        }
    }, [provider])

    const handleClickConnect = async () => {
        await connectWallet();
    };

    const handleClickAddress = () => {
        disconnectWallet();
    };

    const switchNetwork = async () => {
        try {
          console.log('in switch network try')
          await provider.provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: toHex(80001) }]
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await provider.provider.request({
                method: "wallet_addEthereumChain",
                params: [networkParams[toHex(80001)]]
              });
            } catch (error) {
              setError(error);
            }
          }
        }
    };

    useEffect(() => {
        console.log("inEffect", networkId)
        // if ((signerAddress && networkId.chainId !== 80001) && (signerAddress && networkId.chainId !== 137)) {
        if ((signerAddress && networkId.chainId !== 80001)) {
          switchNetwork();
        }
    }, [networkId]);

    return (
          <Button
          bg="darkgreen"
          textColor="white"
          size='md'
          onClick={modalSignerAddress ? handleClickAddress : handleClickConnect}
      >
            {modalSignerAddress ? truncateAddress(modalSignerAddress) : "Connect Wallet"}
      </Button>
    );
}

export default ConnectWallet;