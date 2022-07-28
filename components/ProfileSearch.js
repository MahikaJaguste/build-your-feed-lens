import { useContext, useEffect, useState } from "react";
import { AppContext } from '../pages/_app.js'
import { useRouter } from 'next/router'

// lens
import doGetProfile from "../utils/followingList/doGetProfile"
import doGetFollowing from "../utils/followingList/doGetFollowing"

function ProfileSearch() {

    const {
        profileHandleInput, 
        setProfileHandleInput,
        setProfileAddress,
        setFollowingList,
        followingPageInfo, 
        setFollowingPageInfo
     } = useContext(AppContext);

    const router = useRouter();
    const signerAddress = router.query.walletAddress;

    const [tempProfileHandleInput, setTempProfileHandleInput] = useState(null);

    async function handleSearch() {
        if(profileHandleInput){
            const response1 = await doGetProfile(profileHandleInput)
            if(response1){
                setProfileAddress(response1);
                const [response2, pageInfo] = await doGetFollowing(response1, 10)
                setFollowingList(response2);
                setFollowingPageInfo(pageInfo);
            }
            else{
                setProfileAddress(null);
            }
        }
    }

    useEffect(() => {
        handleSearch();
    }, [profileHandleInput]);

    async function handleInitialSearch() {
        if(signerAddress){
            const [response, pageInfo] = await doGetFollowing(signerAddress, 10)
            setFollowingList(response);
            setFollowingPageInfo(pageInfo);
        }
    }

    useEffect(() => {
        setProfileAddress(signerAddress);
        setFollowingList(null); 
        handleInitialSearch();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProfileAddress(null);
        setFollowingList(null);
        setProfileHandleInput(tempProfileHandleInput);
    };

    return (
    <>
        <form onSubmit={handleSubmit}>
            <label>Enter handle (eg. vitalik.eth)</label>
            <input 
                type="text"  
                id='profileHandleInputForm'
                onChange={(e) => setTempProfileHandleInput(e.target.value)}/>
            <button type="submit">Search</button>
        </form>
        <p>{profileHandleInput ? profileHandleInput + " follows these profiles": 
            signerAddress ? "You follows these profiles" : null
        } </p>
    </>
    );
}
    
export default ProfileSearch;