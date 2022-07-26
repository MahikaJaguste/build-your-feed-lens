import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// lens
import { following } from "../../lens-api/follow/following";
import { profile } from "../../lens-api/profile/get-profile";

export default function ProfileFollowing({ 
    profileHandle,
    successAddress,
    profileAddress,
    successFollowing,
    followingProfiles  }) {


    return (
        <>

        <p>{profileHandle} 
        {successAddress} 
        {successAddress ? profileAddress : "Not successAddress"} 
        {successFollowing}
        {successFollowing ? followingProfiles[0].profile.name : "Not successFollowing"}
        </p>

        </>
  );
}

// This gets called on every request
export async function getServerSideProps({params}) {
    // Fetch data from external API
    const profileHandle = params.profileHandle;
    let successAddress = false;
    let profileAddress = '';

    // let response = await profile(profileHandle);
    // if(response.data.profile){
    //     profileAddress = response.data.profile.ownedBy;
    //     successAddress = true;
    // }

    let successFollowing = false;
    let followingProfiles = [];

    // if(successAddress) {
    //     response = await following(profileAddress, 20);
    //     if(response.following){
    //         followingProfiles = response.following.items;
    //         successFollowing = true;
    //     }
    // }
  
    // Pass data to the page via props
    return { props: { 
        profileHandle,
        successAddress,
        profileAddress,
        successFollowing,
        followingProfiles 
    } }
}