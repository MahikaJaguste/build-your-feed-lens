import { useContext, useEffect, useState } from "react";

// components
import dynamic from "next/dynamic";
const ConnectWallet = dynamic(() => import("../components/ConnectWallet"), {
  ssr: false,
});
import LandingPage from "../components/LandingPage.js";

// context
import { AppContext } from "./_app.js";

export default function Home() {

  const { provider,
          signer,
          signerAddress,
          networkId
        } = useContext(AppContext)

  useEffect(() => {
    console.log('In index.js', provider, signer, signerAddress, networkId);
  }, [networkId])


  return (
    <>
      <LandingPage/>
      <ConnectWallet/>
    </>
  );
}