import { createContext, useState } from "react";
import { ethers } from  'ethers';

// web3
import { useWeb3 } from "@3rdweb/hooks";

// components
import ConnectWallet from '../components/ConnectWallet.js';
import LensLogin from "../components/LensLogin.js";
import GetHandle from "../components/GetHandle.js";
import ProfileHandleInput from "../components/ProfileHandleInput.js";
import GetFollowing from "../components/GetFollowing.js";

// context
export const AppContext = createContext();

export default function Home() {

  const { connectWallet, address, error, provider } = useWeb3();
  const [myProfiles, setMyProfiles] = useState([]);
  const [profileHandleInput, setProfileHandleInput] = useState(null);
    
  const contextObj = {
    myProfiles,
    setMyProfiles,
    profileHandleInput,
    setProfileHandleInput,
  }

  return (
    <AppContext.Provider value={contextObj}>
      {address ? 
        <LensLogin/>
       : 
        <ConnectWallet/>
      }
      <GetHandle/>
      <ProfileHandleInput/>
      {profileHandleInput}
      <GetFollowing/>
    </AppContext.Provider>
  );
}