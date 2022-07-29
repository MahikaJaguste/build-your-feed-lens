import { useState } from "react";
import { useRouter } from "next/dist/client/router";

// lens
import doGetProfile from "../../../utils/createList/doGetProfile";

// db
import { AddDocument_AutoID } from "../../../utils/db/createList/crudData";

export default function CreateList() {

    const router = useRouter();
    const signerAddress = router.query.walletAddress;

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
        setCreatorList([])
        setListTitle(undefined)
        setTempHandleInput(undefined)
    }   

    return (
    <>
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