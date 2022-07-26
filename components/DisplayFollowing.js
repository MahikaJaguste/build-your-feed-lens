import { useEffect, useState, useContext } from "react";
import { AppContext } from '../pages/index.js'
import { useWeb3 } from "@3rdweb/hooks";

function DisplayFollowing() {

    const { address, provider } = useWeb3();
    const { profileHandleInput, 
        profileAddress, 
        followingList,
     } = useContext(AppContext);
    
    useEffect(() => {
        
    }, []);


    return (
    <>
        {profileHandleInput ? profileHandleInput : 'Fetching input'}
        {profileAddress ? profileAddress : 'Fething profile address'}
        {followingList ? followingList.map((obj, index) => {
                // console.log(obj.profile.id)
                return (
                <p key={obj.profile.id}>{obj.profile.id}</p>
                )
            }) :
            <p>Fetching following</p>
        }

    </>
    );
}
    
export default DisplayFollowing;