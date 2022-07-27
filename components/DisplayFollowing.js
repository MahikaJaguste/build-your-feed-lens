import { useEffect, useState, useContext } from "react";
import { AppContext } from '../pages/index.js'
import { useWeb3 } from "@3rdweb/hooks";

import covalentConfig from "../utils/covalent/covalentConfig.js";

function DisplayFollowing() {

    const { address, provider } = useWeb3();
    const { profileHandleInput, 
        profileAddress, 
        followingList,
     } = useContext(AppContext);

    
    const APIKEY = covalentConfig.APIKEY
    const baseURL = 'https://api.covalenthq.com/v1'
    const chainId = '1'
    const demoAddress = '0xb08193266df1db900dae211b66ce18c87d9bf5ec'
    // const [demoAddress, setDemoAddress] = useState(null)

    const contractAddress = [
        "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", 
        "0x283af0b28c62c092c9727f1ee09c02ca627eb7f5",
        "0x7f268357a8c2552623316e2562d90e642bb538e5",
        "0x55e0f7a3bb39a28bd7bcc458e04b3cf00ad3219e",
    ]
    
    useEffect(() => {
    }, []);

    async function contractInteraction(inputAddress) {
        console.log('inside')
        let or_part = `[`
        for(var i=0; i<contractAddress.length - 1; i++){
            or_part = or_part.concat(`{"to_address":${contractAddress[i]}},`)
        }
        or_part = or_part.concat(`{"to_address":${contractAddress[contractAddress.length - 1]}}]`)
    
        const match_part = `{"$match":{"$or":${or_part}}}`
        const group_part = `{"$group":{"_id":"to_address", "contract_interaction":{"$sum":1}}}`
        const primer_part = `[${match_part}, ${group_part}]`
    
        // try catch
        const url = new URL(`${baseURL}/${chainId}/address/${inputAddress}/transactions_v2/?key=${APIKEY}&no-logs=true&page-size=10000&primer=${primer_part}`)
        const response = await fetch(url);
        const result = await response.json();
        const data = result.data;
        if(data && data.items){
            console.log(data.items)
            return data.items;
        }
        else{
            console.log(data);
            return null
        }
    }


    return (
    <>
        {profileHandleInput ? profileHandleInput : 'Fetching input'}
        {profileAddress ? profileAddress : 'Fething profile address'}
        {followingList ? followingList.map((obj, index) => {
                // console.log(obj.profile.id)
                return (
                <button key={obj.profile.id} onClick={() => {contractInteraction(obj.profile.ownedBy)}}>{obj.profile.ownedBy}</button>
                )
            }) :
            <p>Fetching following</p>
        }

    </>
    );
}
    
export default DisplayFollowing;
 