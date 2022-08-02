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
    const [selectedProfileId, setSelectedProfileId] = useState(undefined);
    let preference = []

    const {
        signerAddress,

        profileHandleInput,
        profileAddress, 
        followingList,
        setFollowingList,
        followingPageInfo,
        setFollowingPageInfo,
    } = useContext(AppContext);

    const router = useRouter();

    async function handleFetchMore(prevFollowingList, prevFollwowingPageInfo) {
        setIsFetchingMore(true);
        const [response, newPageInfo] = await doGetFollowing(profileAddress, 10, prevFollwowingPageInfo.next, followingList)
        setFollowingList(response);
        setFollowingPageInfo(newPageInfo);
        setIsFetchingMore(false);
    }

    async function handleGetDetails(profileOwner, profileId) {
        setSelectedProfileId(profileId);
        axios_getERC20(profileOwner);
    }

    useEffect(() => {
        if(signerAddress) {
            const index = docKey.indexOf(signerAddress)
            if(index != -1) {
                preference = docData[index]['preference']
            }
        }
    }, [signerAddress])

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

            <DisplayGraph/>
            
            {followingList && followingList.length ?    
                <>
                {followingList.map((obj, index) => {
                        // console.log(obj.profile)
                        const profile = obj.profile
                        return (
                        <div key={profile.id}>
                            <div>{profile.handle}</div>
                            <button onClick={() => {handleGetDetails(profile.ownedBy, profile.id)}}>Details</button>
                            <br/>
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