// import { useContext } from "react";
// import { AppContext } from "../pages/_app";
import { useRouter } from "next/dist/client/router";
import { GetOwnedDocuments, GetOtherDocuments } from "../../../utils/db/createList/crudData";


export default function ListFollowing({
    ownerLists,
    otherLists
}) {

    const router = useRouter();
    const signerAddress = router.query.walletAddress;

    return (
    <>
        <h1>Lens Lists</h1>
        {signerAddress ?
            <>
                <button onClick={() => {
                    router.push({
                        pathname: '/explore-posts/[walletAddress]/createList',
                        query: { walletAddress: signerAddress },
                    });
                }}>
                    Create List
                </button>
            </>
        : null
        }

        <h2>Lists you created</h2>
        {ownerLists && ownerLists.length ?
            ownerLists.map((list, index) => {
                return (
                    <div key={index}>
                        <p>Title :  {list.title}</p>
                        <p>Created by : {list.walletAddress}</p>
                        <button onClick={() => {
                            router.push({
                                pathname: `/explore-posts/${signerAddress}/${list.docId}`,
                            });
                        }}>
                            View List Feed
                        </button>
                        <br/>
                        <br/>
                    </div>
                )
            }) 
        : null}
        <h2>Explore Lists</h2>
        {otherLists && otherLists.length ? 
            otherLists.map((list, index) => {
                return (
                    <div key={index}>
                        <p>Title :  {list.title}</p>
                        <p>Created by : {list.walletAddress}</p>
                        <button onClick={() => {
                            router.push({
                                pathname: `/explore-posts/${signerAddress}/${list.docId}`,
                            });
                        }}>
                            View List Feed
                        </button>
                        <br/>
                        <br/>
                    </div>
                )
            })
        : null}
    </>
    )
}

export async function getServerSideProps({query}) {
    const ownerLists = await GetOwnedDocuments(query.walletAddress)
    const otherLists = await GetOtherDocuments(query.walletAddress)
    return { props: { 
        ownerLists,
        otherLists,
    } }
}