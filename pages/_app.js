import { createContext, useEffect, useState } from "react";

// abi
import LIST_NFT_ABI from '../artifacts/contracts/ListNFT.sol/ListNFT.json';

export const AppContext = createContext();

function MyApp({ Component, pageProps }) {

  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);
  const [networkId, setNetworkId] = useState(undefined);

  const [myProfiles, setMyProfiles] = useState([]);
  const [profileHandleInput, setProfileHandleInput] = useState(null);
  const [profileAddress, setProfileAddress] = useState(null);
  const [followingList, setFollowingList] = useState(null);
  const [followingPageInfo, setFollowingPageInfo] = useState(null);

  let listNFTContract;

  useEffect(() => {
    if(provider){
      // const listNFTContractAddress = "";
      // listNFTContract = new ethers.Contract(listNFTAddress, LIST_NFT_ABI.abi, provider);
    }
  }, [provider]);

    
  const contextObj = {
    provider,
    setProvider,
    signer,
    setSigner,
    signerAddress,
    setSignerAddress,
    networkId,
    setNetworkId,

    myProfiles,
    setMyProfiles,
    profileHandleInput,
    setProfileHandleInput,
    profileAddress,
    setProfileAddress,
    followingList,
    setFollowingList,
    followingPageInfo, 
    setFollowingPageInfo,

    listNFTContract
  }

  return (
    <AppContext.Provider value={contextObj}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;