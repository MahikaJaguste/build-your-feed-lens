import { useContext, useEffect, useState } from "react";
import { AppContext } from '../pages/_app.js'

// lens
import { following } from "../lens-api/follow/following";
import { profile } from "../lens-api/profile/get-profile";


function ProfileHandleInput() {

    const { profileHandleInput, 
        setProfileHandleInput,
        profileAddress, 
        setProfileAddress,
        followingList,
        setFollowingList
     } = useContext(AppContext);

    const [tempProfileHandleInput, setTempProfileHandleInput] = useState(null);

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
            console.log(response.data.following);
            if(response.data.following){
                setFollowingList(response.data.following.items)
            }
            else{
                setFollowingList([])
            }
        }
    }

    // useEffect(() => {
    //     doGetProfile()
    // }, [profileHandleInput]);

    // useEffect(() => {
    //     doGetFollowing()
    // }, [profileAddress]);

    // useEffect(() => {
    //     setProfileAddress(address);
        
    // }, [address])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProfileHandleInput(tempProfileHandleInput);
        setProfileAddress(null);
        setFollowingList(null);
        await doGetProfile();
        await doGetFollowing();
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
    </>
    );
}
    
export default ProfileHandleInput;