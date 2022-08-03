import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// db
import { GetADocument, GetDocuments } from "../../utils/db/createList/crudData";

// lens
import { getPublications } from "../../lens-api/publication/get-publications";

import {
    Button,
} from '@chakra-ui/react'
import { creator } from "d3";

export default function CreateList({
    listTitle,
    creatorList
}) {

    const [pubsList, setPubsList] = useState([]);
    const [pubsPageInfo, setPubsPageInfo] = useState(null);
    
    async function doGetPubs() {
        try {
            let temp_pubsList = [];
            let cursor = null;
            let response = [];
            if(pubsPageInfo){
                cursor = pubsPageInfo.next
            }
            for(let creator of creatorList) {
                response = await getPublications(creator, cursor);
                if(response.data.publications.items.length){
                    temp_pubsList.push(...response.data.publications.items)
                }
            }
            setPubsList(temp_pubsList);
            setPubsPageInfo(response.data.publications.pageInfo)
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
        {pubsList.length ?
            pubsList.map((obj, index) => {
                // console.log(obj);
                return (
                    <div>
                        <p>{obj.metadata.content}</p>
                        <p>by {obj.profile.handle}</p>
                        <p>{obj.stats.totalAmountOfCollects} collects</p>
                        <p>{obj.stats.totalAmountOfComments} comments</p>
                        <p>{obj.stats.totalAmountOfMirrors} mirrors</p>
                    </div>
                )
            })
        :
            'Fetching publications'
        }
        {creatorList && creatorList.length ? <Button onClick={doGetPubs}>Fetch more pubs</Button> : null}
    </>
    )
}



export async function getStaticProps({params}) {
    const response = await GetADocument(params.docId)
    let creatorList = [];
    let listTitle = 'No such list exists';

    if(response) {
        creatorList = response.creatorList;
        listTitle = response.title
    }
    
    return { props: { 
        creatorList,
        listTitle
    },
    revalidate: 10,
 }
}

export async function getStaticPaths() {
    const [lists, lists_keys, success] = await GetDocuments();
    const paths = lists_keys.map((elem ) => ({params : {docId : elem}}))
    return {
        // paths: [{params: {docId:'051PtCWYr5xS6OhRLBlH'}}],
        paths,
        fallback: false
    }
}