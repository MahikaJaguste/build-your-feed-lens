import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../_app";
import { useRouter } from 'next/router';

import {GetADocument} from '../../../utils/db/crudData.js';
import protocolMapping from "../../../utils/preferences/protocolMappingJSON";
import contractInteraction from "../../../utils/covalent/contractInteraction.js";
import ProfileHandleInput from "../../../components/ProfileHandleInput.js";

export default function ProfileFollowing({
    hasPreference,
    contractAddress,
    contractName  }) {

    const { 
            signerAddress,
            profileHandleInput,
            profileAddress, 
            followingList,
         } = useContext(AppContext);

    const router = useRouter();


    return (
        <>
            <ProfileHandleInput/>

            <p>{profileHandleInput ? profileHandleInput : null} 
            </p>

            <button onClick={() => {
                    router.push({
                        pathname: `/explore-profiles/${signerAddress}/preferences`,
                        // query: { walletAddress: signerAddress },
                    });
                }}>
                    Preferences
            </button>

            {/* {contractName.length ? contractName.map((key, index) => {
                return(
                    <p key={key}>{key}</p>
                )
            }) : null} */}

            {followingList ? followingList.map((obj, index) => {
                    // console.log(obj.profile.id)
                    return (
                    <button key={obj.profile.id} onClick={() => {contractInteraction(obj.profile.ownedBy, contractAddress)}}>{obj.profile.ownedBy}</button>
                    )
                }) :
                <p>Fetching following</p>
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
        success,
        contractAddress,
        contractName,
    } }
}