import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AppContext = createContext();

function MyApp({ Component, pageProps }) {

  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);
  const [networkId, setNetworkId] = useState(undefined);

  const [myProfiles, setMyProfiles] = useState([]);
  const [profileHandleInput, setProfileHandleInput] = useState(null);
  const [tempProfileHandleInput, setTempProfileHandleInput] = useState('');
  const [profileAddress, setProfileAddress] = useState(null);
  const [followingList, setFollowingList] = useState(null);
  const [followingPageInfo, setFollowingPageInfo] = useState(null);
  const [exploreProfileDetails, setExploreProfileDetails] = useState(undefined)
  const [preference, setPreference] = useLocalStorage("erc20_preference_list", [])
  const [erc721_preference, erc721_setPreference] = useLocalStorage("erc721_preference_list", [])
    
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
    tempProfileHandleInput,
    setTempProfileHandleInput,
    profileAddress,
    setProfileAddress,
    followingList,
    setFollowingList,
    followingPageInfo, 
    setFollowingPageInfo,

    exploreProfileDetails,
    setExploreProfileDetails,
    preference,
    setPreference,
    erc721_preference,
    erc721_setPreference
  }

  return (
    <AppContext.Provider value={contextObj}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;