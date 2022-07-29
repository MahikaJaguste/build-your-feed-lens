import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// db
import { GetADocument } from "../../../utils/db/createList/crudData";

// lens
import { getPublications } from "../../../lens-api/publication/get-publications";

export default function CreateList({
    listTitle,
    creatorList
}) {

    async function doGetPubs() {
        try {
            const response = await getPublications(creatorList[0]);
            console.log(response)
        }
        catch (err) {
            console.log('error in getPublications', err);
        }
    }

    useEffect(() => {
        if(creatorList && creatorList.length) {
            doGetPubs()
        }
    }, [creatorList]);

    return (
    <>
        <h1>{listTitle}</h1>
        {/* {creatorList && creatorList.length ? creatorList[0] : null} */}
    </>
    )
}



export async function getServerSideProps({query}) {
    const response = await GetADocument(query.docId)
    let creatorList = [];
    let listTitle = 'No such list exists';

    if(response) {
        creatorList = response.creatorList;
        listTitle = response.title
    }

    if(creatorList && creatorList.length) {
        try {
            const response = await getPublications(creatorList[0]);
            console.log(response)
        }
        catch (err) {
            console.log('error in getPublications', err);
        }
    }
    
    return { props: { 
        creatorList,
        listTitle
    } }
}