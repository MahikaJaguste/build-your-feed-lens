import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../index.js";

import {GetADocument} from '../../utils/db/crudData.js';
import protocolMapping from "../../utils/preferences/protocolMappingJSON";
import contractInteraction from "../../utils/covalent/contractInteraction.js";

export default function ProfileFollowing({
    walletAddress,
    hasPreference,
    contractAddress,
    contractName  }) {


    const { profileHandleInput, 
        profileAddress, 
        followingList,
        } = useContext(AppContext);

    console.log(profileHandleInput)

    return (
        <>

        <p>{profileHandleInput} 
           {walletAddress}
        </p>

        {contractName.length ? contractName.map((key, index) => {
            return(
                <p key={key}>{key}</p>
            )
        }) : null}

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
export async function getServerSideProps({query}) {
    const walletAddress = query.slug[0]
    const profileHandle= query.slug[1];

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
        walletAddress,
        profileHandle,
    } }
}