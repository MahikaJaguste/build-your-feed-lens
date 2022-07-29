import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import {AppContext} from '../../_app';

// lens
import doGetProfile from "../../../utils/createList/doGetProfile";

// db
import { AddDocument_AutoID } from "../../../utils/db/createList/crudData";

// ipfs
import { create } from 'ipfs-http-client';
import getMetadata from "../../../utils/followListNft/upload";

import dynamic from "next/dynamic";
const GetSigner = dynamic(() => import("../../../components/GetSigner"), {
  ssr: false,
});

const client = create("https://ipfs.infura.io:5001/api/v0");

export default function CreateList() {

    const router = useRouter();
    const signerAddress = router.query.walletAddress;

    const { signer } = useContext(AppContext);

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
        console.log(ipfsMetadata.path);
        console.log(signer);
        // mint nft here
        setCreatorList([])
        setListTitle(undefined)
        setTempHandleInput(undefined)
    }   

    return (
    <>
        <GetSigner/>
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