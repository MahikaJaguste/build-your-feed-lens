import { useContext, useEffect, useState } from "react";
import { AppContext } from "../_app";
import { useRouter } from 'next/router';

import protocolMapping from "../../utils/preferences/protocolMappingJSON"
import contractInteraction from "../../utils/covalent/contractInteraction.js"
import FollowingProfileSearch from "../../components/FollowingProfileSearch.js"

import doGetFollowing from "../../utils/followingList/doGetFollowing"
import { profile } from "../../lens-api/profile/get-profile"
import axios_getERC20 from "../../utils/alchemy/axios_getERC20";

// components
import dynamic from "next/dynamic";
const GetWeb3 = dynamic(() => import("../../components/GetWeb3"), {
  ssr: false,
});

// utils
import { GetDocuments, GetADocument } from '../../utils/db/preferenceList/crudData.js';
import erc20_metadata from "../../utils/preferences/erc20_metadata";
import DisplayGraph from "../../components/DisplayGraph";


export default function ProfileFollowing({
    docData,
    docKey }) {

    const [isFetchingMore, setIsFetchingMore] = useState(false); 

    const {
        signerAddress,

        profileHandleInput,
        setTempProfileHandleInput,
        setProfileHandleInput,
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
    } = useContext(AppContext);

    const router = useRouter();

    async function handleFetchMore(prevFollowingList, prevFollwowingPageInfo) {
        setIsFetchingMore(true);
        const [response, newPageInfo] = await doGetFollowing(profileAddress, 1, prevFollwowingPageInfo.next)
        setFollowingList(response);
        setFollowingPageInfo(newPageInfo);
        setIsFetchingMore(false);
        if(response.length){
            handleGetDetails(response[0].profile.ownedBy)
        }
    }

    async function handleGetDetails(profileOwner) {
        const [user_result_ids, user_result] = await axios_getERC20(profileOwner);
        if(preference){
            console.log(user_result_ids, preference)
            const output = user_result_ids.filter((obj) => preference.indexOf(obj) !== -1);
            console.log(output.length, preference.length, output.length/preference.length * 100);
            console.log(user_result)
        }
    }

    function getPreference() {
        if(signerAddress) {
            const index = docKey.indexOf(signerAddress)
            if(index != -1) {
                setPreference(docData[index]['preference'])
            }
        }
    }

    useEffect(() => {
        if(signerAddress && !preference.length){
            getPreference()
        }
    }, [signerAddress])

    useEffect(() => {
        if(!preference.length){
            getPreference()
        }
    }, [])

    function updateSearchHandle(currentHandle) {
        setProfileAddress(null);
        setFollowingList(null);
        setTempProfileHandleInput(currentHandle)
        setProfileHandleInput(currentHandle);
    }

    return (
        <>
            {signerAddress ? null : <GetWeb3/>}

            <button onClick={() => {
                    router.push({
                        pathname: `/explore-profiles/preferences`,
                    });
                }}>
                    Preferences
            </button>

            <br/>
            <FollowingProfileSearch/>
            <br/>
            
            {followingList && followingList.length ?    
                <>
                {followingList.map((obj, index) => {
                        // console.log(obj.profile)
                        const profile = obj.profile
                        return (
                        <div key={profile.id}>
                            <div>{profile.handle}</div>
                            {/* <button onClick={() => {handleGetDetails(profile.ownedBy, profile.id)}}>Details</button> */}
                            <br/>
                            <button onClick={() => updateSearchHandle(profile.handle)}>Search this profile</button>
                            <br/>
                        </div>
                        )
                    })
                }
                
                {followingList && followingList.length == followingPageInfo.totalCount ?
                    null :
                    !isFetchingMore ?
                        <button onClick={()=> handleFetchMore(followingList, followingPageInfo)}>Get more profiles</button>
                    :
                    <p>Fetching more profiles</p>
                }
                </>  
                :
                profileHandleInput || profileAddress ? 
                        !followingList ? 
                        <p>Fetching following</p> 
                        :
                        <p>Empty following list</p> 
                    : null
            }
        </>             
    );
}

export async function getStaticProps() {
    const [docData, docKey, success] = await GetDocuments()
  
    if(!success){
        console.log('error in fetching preferences')
    }

    // Pass data to the page via props
    return { 
        props: { 
            docData,
            docKey,
        },
        revalidate: 10,
    }
}