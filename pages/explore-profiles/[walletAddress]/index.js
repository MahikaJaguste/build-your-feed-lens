import { useContext, useState } from "react";
import { AppContext } from "../../_app";
import { useRouter } from 'next/router';

import {GetADocument} from '../../../utils/db/preferenceList/crudData.js';
import protocolMapping from "../../../utils/preferences/protocolMappingJSON";
import contractInteraction from "../../../utils/covalent/contractInteraction.js";
import FollowingProfileSearch from "../../../components/FollowingProfileSearch.js";

import doGetFollowing from "../../../utils/followingList/doGetFollowing"
import { profile } from "../../../lens-api/profile/get-profile";

export default function ProfileFollowing({
    signerAddress,
    hasPreference,
    contractAddress,
    contractName  }) {

    const [isFetchingMore, setIsFetchingMore] = useState(false); 
    const [details, setDetails] = useState(undefined); 
    const [nodetails, setNoDetails] = useState(false);
    const [selectedProfileId, setSelectedProfileId] = useState(undefined);

    const {
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

    async function handleGetDetails(profileOwner, contractAddress, profileId) {
        setNoDetails(false);
        setDetails(undefined)
        setSelectedProfileId(profileId);
        const response = await contractInteraction(profileOwner, contractAddress);
        if(response == null) {
            setNoDetails(true);
        }
        else{
            setDetails(response);
        }
    }

    return (
        <>
            <button onClick={() => {
                    router.push({
                        pathname: `/explore-profiles/${signerAddress}/preferences`,
                        // query: { walletAddress: signerAddress },
                    });
                }}>
                    Preferences
            </button>
            <br/>
            <FollowingProfileSearch/>
            <br/>
            {/* {contractName.length ? contractName.map((key, index) => {
                return(
                    <p key={key}>{key}</p>
                )
            }) : null} */}

            {followingList && followingList.length ?    
            <>
            {followingList.map((obj, index) => {
                    // console.log(obj.profile)
                    const profile = obj.profile
                    return (
                    <div key={profile.id}>
                        <div>{profile.handle}</div>
                        <button onClick={() => {handleGetDetails(profile.ownedBy, contractAddress, profile.id)}}>Details</button>
                        {selectedProfileId == profile.id ? 
                            nodetails ? 
                                "No useful data found" : 
                                details ? 
                                details[0].contractInteraction : 
                                null
                            : details ? 
                            details[0].contractInteraction : 
                            null
                        }
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

// This gets called on every request
export async function getServerSideProps({params}) {
    const walletAddress = params.walletAddress

    // Fetch data from external API
    const [result, success] = await GetADocument(walletAddress)
    let contractAddress = []
    let contractName = []

    if(success) {
        contractAddress = result.map((element) => protocolMapping[element].address)
        contractName = result.map((element) => protocolMapping[element].name)
    }
    
    // Pass data to the page via props
    return { props: { 
        signerAddress:walletAddress,
        success,
        contractAddress,
        contractName,
    } }
}