import { createContext, useState } from "react";
import { ethers } from  'ethers';

// web3
import { useWeb3 } from "@3rdweb/hooks";

// components
import ConnectWallet from '../components/ConnectWallet.js';
import LensLogin from "../components/LensLogin.js";
import GetHandle from "../components/GetHandle.js";
import ProfileHandleInput from "../components/ProfileHandleInput.js";
import DisplayFollowing from "../components/DisplayFollowing.js";

// context
export const AppContext = createContext();

export default function Home() {

  const { connectWallet, address, error, provider } = useWeb3();
  const [myProfiles, setMyProfiles] = useState([]);
  const [profileHandleInput, setProfileHandleInput] = useState(null);
  const [profileAddress, setProfileAddress] = useState(null);
  const [followingList, setFollowingList] = useState(null)
    
  const contextObj = {
    myProfiles,
    setMyProfiles,
    profileHandleInput,
    setProfileHandleInput,
    profileAddress,
    setProfileAddress,
    followingList,
    setFollowingList,
  }

  return (
    <AppContext.Provider value={contextObj}>
      <ConnectWallet/>
      {address? <LensLogin/> : null}
      <GetHandle/>
      <ProfileHandleInput/>
      <DisplayFollowing/>
      {/* <DisplayFollowing/> */}
    </AppContext.Provider>
  );
}