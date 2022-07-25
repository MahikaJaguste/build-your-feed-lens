import { useContext, useEffect, useState } from "react";
import { AppContext } from '../pages/index.js'

// lens
import { following } from "../lens-api/follow/following";
import { profile } from "../lens-api/profile/get-profile";


function ProfileHandleInput() {

    const { profileHandleInput, setProfileHandleInput } = useContext(AppContext);
    const [profileAddress, setProfileAddress] = useState(null)
    const [tempProfileHandleInput, setTempProfileHandleInput] = useState(null);

    async function doGetProfile() {
        if(profileHandleInput){
            const response = await profile(profileHandleInput);
            setProfileAddress(response.data.profile.ownedBy)
            console.log(response);
        }
    }

    async function doGetFollowing() {
        if(profileAddress){
            const response = await following(profileAddress, 10);
            console.log(response)//.following.items[0].profile.id);
        }
    }

    useEffect(() => {
        doGetProfile()
    }, [profileHandleInput]);

    useEffect(() => {
        doGetFollowing()
    }, [profileAddress]);



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