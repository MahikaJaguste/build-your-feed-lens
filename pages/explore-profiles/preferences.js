import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

// api
import {AddDocument_CustomID, GetDocuments} from '../../utils/db/preferenceList/crudData.js';
import erc20_contractAddress from "../../utils/preferences/erc20_contractAddress.js";
import erc20_metadata from "../../utils/preferences/erc20_metadata.js";

// components
// components
import dynamic from "next/dynamic";
import { AppContext } from "../_app.js";
const GetWeb3 = dynamic(() => import("../../components/GetWeb3"), {
  ssr: false,
});

export default function Preferences({
    docData,
    docKey }) {

    const router = useRouter();

    const [protocolInfo, setProtocolInfo] = useState([]);
    let preference = [];

    const { signerAddress,
        setProfileHandleInput } = useContext(AppContext)

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
        AddDocument_CustomID(signerAddress, protocolInfo);
    }

    useEffect(() => {
        if(signerAddress) {
            const index = docKey.indexOf(signerAddress)
            if(index != -1) {
                preference = docData[index]['preference']
                setProtocolInfo(preference)
            }
        }
    }, [signerAddress])

    useEffect(() => {
        setProfileHandleInput(undefined);
    }, [])


    return (
        <>
        {signerAddress ? null : <GetWeb3/>}
        {signerAddress ?  
        <form onSubmit={handleSubmit}>
        {
            erc20_metadata.map((key, index) => {
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
        {protocolInfo.length ? <button type="submit">Update</button> : <button type="submit">Save</button> }
        </form>
        : 'Fetching your preferences...'}
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