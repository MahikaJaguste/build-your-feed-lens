import { useState } from "react";
import { useRouter } from "next/router";

// api
import {AddDocument_CustomID, GetADocument} from '../../../utils/db/preferenceList/crudData.js';
import protocolMapping from "../../../utils/preferences/protocolMappingJSON.js";

export default function Preferences({ protocolPreference, hasPreference }) {

    const router = useRouter();
    const address = router.query.walletAddress;

    const [protocolInfo, setProtocolInfo] = useState(protocolPreference);

    // get checkbox info
    let tempProtocolInfo = []
    const handleChange = (e) => {
        const { value, checked } = e.target;
        tempProtocolInfo = protocolInfo;
        // console.log(value, checked);
        if (checked) {
            tempProtocolInfo = [...tempProtocolInfo, value]
        }
        else { // Case 2  : The user unchecks the box
            tempProtocolInfo = tempProtocolInfo.filter((protocol) => protocol !== value);
        }
        setProtocolInfo(tempProtocolInfo)
    };

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(protocolInfo);
        AddDocument_CustomID(address, protocolInfo);
    }


    return (
        <>

        <form onSubmit={handleSubmit}>
        {
            protocolMapping.map((key, index) => {
                return (
                    <> 
                        <input
                            onChange={handleChange} // <-- pass item to handler
                            checked={protocolInfo.includes(`${key.id}`)}
                            style={{ margin: "20px" }}
                            type="checkbox"
                            name={key.name}
                            value={key.id}
                        />
                        <label>{key.name}</label><br/>
                    
                    </>
                )
            })
        }
        {hasPreference ? <button type="submit">Update</button> : <button type="submit">Save</button> }
        </form>

        </>
  );
}

// This gets called on every request
export async function getServerSideProps({query}) {
    // Fetch data from external API
    const [result, success] = await GetADocument(query.walletAddress)
    // const result = [], success = false;
  
    // Pass data to the page via props
    return { props: { 
        protocolPreference:result, 
        hasPreference:success 
    } }
}