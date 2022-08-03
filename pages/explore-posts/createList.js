import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import {AppContext} from '../_app';

// lens
import doGetProfile from "../../utils/createList/doGetProfile";

// db
import { AddDocument_AutoID } from "../../utils/db/createList/crudData";

// ipfs
import { create } from 'ipfs-http-client';
import getMetadata from "../../utils/followListNft/upload";

import dynamic from "next/dynamic";
const GetWeb3 = dynamic(() => import("../../components/GetWeb3"), {
  ssr: false,
});

// abi
import LIST_NFT_ABI from '../../artifacts/contracts/ListNFT.sol/ListNFT.json';
import { ethers } from 'ethers';

const client = create("https://ipfs.infura.io:5001/api/v0");

export default function CreateList() {

    const router = useRouter();
    

    const { signer, signerAddress, provider } = useContext(AppContext);
    let listNFTContract;

    const [tempHandleInput, setTempHandleInput] = useState(undefined);
    const [creatorList, setCreatorList] = useState([]);
    const [listTitle, setListTitle] = useState(undefined);

    async function handleAdd(e) {
        e.preventDefault()
        let response
        if(tempHandleInput){
            response = await doGetProfile(tempHandleInput);
        }
        if(response){
            if(!creatorList.includes(response.id)){
                setCreatorList([...creatorList, response.id])
            }
        }
        else{
            alert('No such profile exists')
        }
        console.log([...creatorList, tempHandleInput].length)
    }

    async function handleCreateList(){
        await AddDocument_AutoID(signerAddress, listTitle, creatorList);

        const metadata = getMetadata(signerAddress, listTitle, creatorList);
        console.log(metadata, JSON.stringify(metadata));

        const ipfsMetadata = await client.add(JSON.stringify(metadata));
        console.log(`ipfs://${ipfsMetadata.path}`);
        console.log(signer, provider);

        const listNFTContractAddress = "0x5D10B62aCeB376e75fC77da632db4878c2F98343";
        listNFTContract = new ethers.Contract(listNFTContractAddress, LIST_NFT_ABI.abi, provider);

        if(signer && listNFTContract) {
            // mint nft here
            const txn = await listNFTContract.connect(signer).mint(signerAddress, `ipfs://${ipfsMetadata.path}`);
            await txn.wait();
        }
        
        setCreatorList([])
        setListTitle(undefined)
        setTempHandleInput(undefined)
    }   

    return (
    <>
        {signerAddress? null : <GetWeb3/>}
        <form onSubmit={handleAdd}>
            <label>Enter handle (eg. vitalik)</label>
            <input 
                type="text"  
                id='listHandleInputForm'
                onChange={(e) => setTempHandleInput(e.target.value)}/>
            <button type="submit">Add</button>
        </form>

        <p>Your List - </p>
        {creatorList.length  ?
            <>
            {creatorList.map((handle, index) => {
                return (
                    <p key={index}>{handle}</p>
                )
            })}
            <form>
                <label>Enter list title</label>
                <input 
                    type="text"  
                    id='listTitleForm'
                    onChange={(e) => setListTitle(e.target.value)}/>
            </form>
            
            {creatorList.length && listTitle ?
                <button onClick={handleCreateList}>Create</button> 
            : null }
            </>
        : null
        }
    </>
    )
}