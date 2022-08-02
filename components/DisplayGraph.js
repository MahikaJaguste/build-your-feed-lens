import { useContext, useEffect, useState } from "react";
import { AppContext } from '../pages/_app.js'

import { Graph } from "react-d3-graph";

function DisplayGraph() {

    const {
        signerAddress,
        profileHandleInput,
        profileAddress,
        followingList,
        followingPageInfo } = useContext(AppContext);

    const [data, setData] = useState({nodes: [], links: []})

    // graph payload (with minimalist structure)
    // const data = {
    //     nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
    //     links: [
    //     { source: "Harry", target: "Sally" },
    //     { source: "Harry", target: "Alice" },
    //     ],
    // };
    
    useEffect(() => {
        let nodesArr = [{id: profileHandleInput}]
        let linksArr = []
        if(followingList && followingList.length) {
            followingList.map((obj, index) => {
                const profile = obj.profile 
                nodesArr.push({id: profile.handle})
                linksArr.push({source: profile.handle, target: profileHandleInput})

            })
            console.log(nodesArr)
            setData({
                nodes: nodesArr,
                links: linksArr
            })
        }
    }, [followingList]);

    // the graph configuration, just override the ones you need
    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
        color: "lightgreen",
        size: 500,
        highlightStrokeColor: "blue",
        },
        link: {
        highlightColor: "lightblue",
        },
    };
    
    const onClickNode = function(nodeId) {
        window.alert(`Clicked node ${nodeId}`);
    };
    
    const onClickLink = function(source, target) {
        window.alert(`Clicked link between ${source} and ${target}`);
    };

    return (
    <>
        <Graph
            id="graph-id" // id is mandatory
            data={data}
            config={myConfig}
            onClickNode={onClickNode}
            onClickLink={onClickLink}
        />
    </>
    );
}
    
export default DisplayGraph;



