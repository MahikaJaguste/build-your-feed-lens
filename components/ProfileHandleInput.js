import { useContext, useEffect, useState } from "react";
import { AppContext } from '../pages/index.js'

// lens
import { following } from "../lens-api/follow/following";
import { profile } from "../lens-api/profile/get-profile";
import { useWeb3 } from "@3rdweb/hooks";


function ProfileHandleInput() {

    const { profileHandleInput, 
        setProfileHandleInput,
        profileAddress, 
        setProfileAddress,
        followingList,
        setFollowingList
     } = useContext(AppContext);

    const [tempProfileHandleInput, setTempProfileHandleInput] = useState(null);
    const { address } = useWeb3();

    async function doGetProfile() {
        if(profileHandleInput){

            const response = await profile(profileHandleInput);
            console.log(response);
            if(response.data.profile){
                setProfileAddress(response.data.profile.ownedBy)
            }
            else {
                alert('No such profile exists!')
            }
            
        }
    }

    async function doGetFollowing() {
        if(profileAddress){
            const response = await following(profileAddress, 20);
            console.log(response)//.following.items[0].profile.id);
            setFollowingList(response.following)
        }
    }

    useEffect(() => {
        doGetProfile()
    }, [profileHandleInput]);

    useEffect(() => {
        doGetFollowing()
    }, [profileAddress]);

    useEffect(() => {
        setProfileAddress(address);
    }, [address])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProfileHandleInput(tempProfileHandleInput);
    };

    return (
    <>
        <form onSubmit={handleSubmit}>
            <label>Enter handle (eg. vitalik.eth)</label>
            <input 
                type="text"  
                id='profileHandleInput'
                onChange={(e) => setTempProfileHandleInput(e.target.value)}/>
            <button type="submit">Search</button>
        </form>
    </>
    );
}
    
export default ProfileHandleInput;