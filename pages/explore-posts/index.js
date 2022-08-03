import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import { GetOwnedDocuments, GetOtherDocuments, GetDocuments } from "../../utils/db/createList/crudData";
import { AppContext } from "../_app";


// components
import dynamic from "next/dynamic";
const GetWeb3 = dynamic(() => import("../../components/GetWeb3"), {
  ssr: false,
});


export default function ListFollowing({
    lists
}) {

    const router = useRouter();
    const { signerAddress } = useContext(AppContext) 

    return (
    <>
        {signerAddress ? null : <GetWeb3/>}
        <h1>Lens Lists</h1>
        {signerAddress ?
            <>
                <button onClick={() => {
                    router.push({
                        pathname: '/explore-posts/createList',
                    });
                }}>
                    Create List
                </button>
            </>
        : null
        }

        <h2>Lists you created</h2>
        {lists && lists.length ?
            lists.map((list, index) => {
                if(list.walletAddress != signerAddress){
                    return null
                }
                return (
                    <div key={index}>
                        <p>Title :  {list.title}</p>
                        <p>Created by : {list.walletAddress}</p>
                        <button onClick={() => {
                            router.push({
                                pathname: `/explore-posts/${list.docId}`,
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
        {lists && lists.length ?
            lists.map((list, index) => {
                if(list.walletAddress == signerAddress){
                    return null
                }
                return (
                    <div key={index}>
                        <p>Title :  {list.title}</p>
                        <p>Created by : {list.walletAddress}</p>
                        <button onClick={() => {
                            router.push({
                                pathname: `/explore-posts/${list.docId}`,
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

export async function getStaticProps() {
    const [lists, lists_keys, success] = await GetDocuments();
    console.log(lists)
    return { props: { 
        lists
    },
    revalidate: 10
 }
}