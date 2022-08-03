import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ChakraProvider } from '@chakra-ui/react'

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

  const [user_result_ids, setUser_result_ids] = useState(null)
  const [user_result, setUser_result] = useState(null)
  const [erc721_user_result_ids, setErc721_user_result_ids] = useState(null)
  const [erc721_user_result, setErc721_user_result] = useState(null)
    
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
    erc721_setPreference,

    user_result_ids, 
    setUser_result_ids,
    user_result,
    setUser_result,
    erc721_user_result_ids, 
    setErc721_user_result_ids, 
    erc721_user_result,
    setErc721_user_result
  }

  return (
    <ChakraProvider>
      <AppContext.Provider value={contextObj}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </ChakraProvider>

  );
}

export default MyApp;