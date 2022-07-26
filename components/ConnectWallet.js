import { useEffect, useState } from "react"
import { useWeb3, useSwitchNetwork } from "@3rdweb/hooks"


const ConnectWallet = () => {

    const supportChainIds = [80001, 137];
    const { address, chainId, provider, connectWallet, disconnectWallet, getNetworkMetadata } = useWeb3();
    const { switchNetwork } = useSwitchNetwork();

    
    return (
    <>
    {address
    ? <>
        Address: {address}
        <br />
        Chain ID: {chainId}
        <br />

        {/* {address && (
            <button onClick={disconnectWallet("injected")}>
            Disconnect
            </button>
        )}

        <p>Switch Network</p>
        {supportChainIds.map((cId) => (
            <button key={cId} onClick={() => switchNetwork(cId)}>
            {getNetworkMetadata(cId).chainName}
            </button>
        ))} */}
    </> 
    : <>
        <button onClick={() => {
            connectWallet("injected");
        }}>
            Connect Wallet
        </button>        
    </>
     }

    </>
    )
}

export default ConnectWallet;