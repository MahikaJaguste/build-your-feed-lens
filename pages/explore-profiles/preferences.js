import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

// api
import {AddDocument_CustomID, GetDocuments, erc721_AddDocument_CustomID, erc721_GetDocuments } from '../../utils/db/preferenceList/crudData.js';
import erc20_metadata from "../../utils/preferences/erc20_metadata.js";
import erc721_metadata from "../../utils/preferences/erc721_metadata.js";

// components
// components
import dynamic from "next/dynamic";
import { AppContext } from "../_app.js";
const GetWeb3 = dynamic(() => import("../../components/GetWeb3"), {
  ssr: false,
});

export default function Preferences({
    docData,
    docKey,
    erc721_docData,
    erc721_docKey
}) {

    const [protocolInfo, setProtocolInfo] = useState([]);
    const [erc721_protocolInfo, erc721_setProtocolInfo] = useState([]);

    const { signerAddress,
        setTempProfileHandleInput,
        setPreference,
        erc721_setPreference } = useContext(AppContext)

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

    // get checkbox info
    let erc721_tempProtocolInfo = []
    const erc721_handleChange = (e) => {
        const { value, checked } = e.target;
        erc721_tempProtocolInfo = erc721_protocolInfo;
        // console.log(value, checked);
        if (checked) {
            erc721_tempProtocolInfo = [...erc721_tempProtocolInfo, value]
        }
        else { // Case 2  : The user unchecks the box
            erc721_tempProtocolInfo = erc721_tempProtocolInfo.filter((protocol) => protocol !== value);
        }
        erc721_setProtocolInfo(erc721_tempProtocolInfo)
    };

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(protocolInfo);
        AddDocument_CustomID(signerAddress, protocolInfo);
        setPreference(protocolInfo)
    }

    async function erc721_handleSubmit(e) {
        e.preventDefault();
        // console.log(protocolInfo);
        erc721_AddDocument_CustomID(signerAddress, erc721_protocolInfo);
        erc721_setPreference(erc721_protocolInfo)
    }

    useEffect(() => {
        if(signerAddress) {
            if(docKey && docKey.length){
                let index = docKey.indexOf(signerAddress)
                if(index != -1) {
                    setProtocolInfo(docData[index]['preference'])
                }
            }
            if(erc721_docKey && erc721_docKey.length){
                index = erc721_docKey.indexOf(signerAddress)
                if(index != -1) {
                    erc721_setProtocolInfo(erc721_docData[index]['preference'])
                }
            }
        }
    }, [signerAddress])

    useEffect(() => {
        setTempProfileHandleInput(undefined);
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

        {signerAddress ?  
        <form onSubmit={erc721_handleSubmit}>
        {
            erc721_metadata.map((key, index) => {
                return (
                    <> 
                        <input
                            onChange={erc721_handleChange} // <-- pass item to handler
                            checked={erc721_protocolInfo.includes(`${key.id}`)}
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
        {erc721_protocolInfo.length ? <button type="submit">Update</button> : <button type="submit">Save</button> }
        </form>
        : 'Fetching your preferences...'}
        </>
  );
}

export async function getStaticProps() {
    const [docData, docKey, success] = await GetDocuments()
    const [erc721_docData, erc721_docKey, erc721_success] = await erc721_GetDocuments()
  
    if(!success || !erc721_success){
        console.log('error in fetching preferences')
    }

    // Pass data to the page via props
    return { 
        props: { 
            docData,
            docKey,
            erc721_docData,
            erc721_docKey
        },
        revalidate: 10,
    }
}