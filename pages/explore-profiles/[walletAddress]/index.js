import { useContext, useState } from "react";
import { AppContext } from "../../_app";
import { useRouter } from 'next/router';

import {GetADocument} from '../../../utils/db/crudData.js';
import protocolMapping from "../../../utils/preferences/protocolMappingJSON";
import contractInteraction from "../../../utils/covalent/contractInteraction.js";
import ProfileSearch from "../../../components/ProfileSearch.js";

import doGetFollowing from "../../../utils/followingList/doGetFollowing"

export default function ProfileFollowing({
    signerAddress,
    hasPreference,
    contractAddress,
    contractName  }) {


    const [isFetchingMore, setIsFetchingMore] = useState(false);   

    const {
        profileHandleInput,
        profileAddress, 
        followingList,
        setFollowingList,
        followingPageInfo,
        setFollowingPageInfo,
    } = useContext(AppContext);

    const router = useRouter();

    async function handleMore(prevFollowingList, prevFollwowingPageInfo) {
        setIsFetchingMore(true);
        const [response, newPageInfo] = await doGetFollowing(profileAddress, 10, prevFollwowingPageInfo.next, followingList)
        setFollowingList(response);
        setFollowingPageInfo(newPageInfo);
        setIsFetchingMore(false);
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
            <ProfileSearch/>
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
                    return (
                    <div key={obj.profile.id}>
                        <div>{obj.profile.handle}</div>
                        <button onClick={() => {contractInteraction(obj.profile.ownedBy, contractAddress)}}>Details</button>
                        <br/>
                        <br/>
                    </div>
                    )
                })
            }
            {followingList && followingList.length == followingPageInfo.totalCount ?
                null :
                !isFetchingMore ?
                    <button onClick={()=> handleMore(followingList, followingPageInfo)}>Get more profiles</button>
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