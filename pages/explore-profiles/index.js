import { useContext, useEffect, useState } from "react";
import { AppContext } from "../_app";
import { useRouter } from 'next/router';

import FollowingProfileSearch from "../../components/FollowingProfileSearch.js"

import doGetFollowing from "../../utils/followingList/doGetFollowing"
import axios_getERC20 from "../../utils/alchemy/axios_getERC20";
import axios_getERC721 from "../../utils/alchemy/axios_getERC721";

import erc20_metadata from "../../utils/preferences/erc20_metadata.js";
import erc721_metadata from "../../utils/preferences/erc721_metadata.js";

// components
import dynamic from "next/dynamic";
const GetWeb3 = dynamic(() => import("../../components/GetWeb3"), {
  ssr: false,
});

// utils
import {GetDocuments, erc721_GetDocuments } from '../../utils/db/preferenceList/crudData.js';



export default function ProfileFollowing({
    docData,
    docKey,
    erc721_docData,
    erc721_docKey }) {

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
        erc721_preference,
        erc721_setPreference
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
        // const [user_result_ids, user_result] = await axios_getERC20(profileOwner);
        // if(preference){
        //     console.log(user_result_ids, preference)
        //     const output = user_result_ids.filter((obj) => preference.indexOf(obj) !== -1);
        //     console.log(output.length, preference.length, output.length/preference.length * 100);
        //     console.log(user_result)
        // }
        // const [erc721_user_result_ids, erc721_user_result] = 
        await axios_getERC721(profileOwner);
        // if(erc721_preference){
        //     console.log(erc721_user_result_ids, erc721_preference)
        //     const erc721_output = erc721_user_result_ids.filter((obj) => erc721_preference.indexOf(obj) !== -1);
        //     console.log(erc721_output.length, erc721_preference.length, erc721_output.length/erc721_preference.length * 100);
        //     console.log(erc721_user_result)
        // }
    }

    function getPreference() {
        if(signerAddress) {
            const index = docKey.indexOf(signerAddress)
            if(index != -1) {
                setPreference(docData[index]['preference'])
            }
        }
    }

    function erc721_getPreference() {
        if(signerAddress) {
            const index = erc721_docKey.indexOf(signerAddress)
            if(index != -1) {
                erc721_setPreference(erc721_docData[index]['preference'])
            }
        }
    }

    useEffect(() => {
        if(signerAddress && !preference.length){
            getPreference()
        }
        if(signerAddress && !erc721_preference.length){
            erc721_getPreference()
        }
    }, [signerAddress])

    useEffect(() => {
        if(!preference.length){
            getPreference()
        }
        if(!erc721_preference.length){
            erc721_getPreference()
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
    const [erc721_docData, erc721_docKey, erc721_success] = await erc721_GetDocuments()
  
    if(!success || !erc721_success){
        console.log('error in fetching preferences')
    }

    // Pass data to the page via props
    return { 
        props: { 
            docData,
            docKey,
            erc721_docData,
            erc721_docKey
        },
        revalidate: 10,
    }
}