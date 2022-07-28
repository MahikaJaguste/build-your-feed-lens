import { createContext, useState } from "react";

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
    setFollowingPageInfo
  }

  return (
    <AppContext.Provider value={contextObj}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;