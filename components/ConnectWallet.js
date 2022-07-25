import { useState } from "react"
import { useWeb3, useSwitchNetwork } from "@3rdweb/hooks"


const ConnectWallet = () => {

    const supportChainIds = [80001, 137];
    const { address, chainId, connectWallet, disconnectWallet, getNetworkMetadata } = useWeb3();
    const { switchNetwork } = useSwitchNetwork();

    return (
    <>
        Address: {address}
        <br />
        Chain ID: {chainId}
        <br />

        {address && (
            <button onClick={disconnectWallet}>
            Disconnect
            </button>
        )}

        <p>Switch Network</p>
        {supportChainIds.map((cId) => (
            <button onClick={() => switchNetwork(cId)}>
            {getNetworkMetadata(cId).chainName}
            </button>
        ))}

        <button onClick={() => connectWallet("injected")}>
            Connect MetaMask
        </button>
    </>
    )
}

export default ConnectWallet;