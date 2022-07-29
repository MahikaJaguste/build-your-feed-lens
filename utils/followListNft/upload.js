function getMetadata(signerAddress, listTitle, creatorList) {
    
    const metadata = {
        name: listTitle,
        description: "",
        image: "",
        attributes: [
            {
                trait_type: "Owner",
                value: signerAddress,
            },
            {
                trait_type: "List",
                value: creatorList,
            },
        ],
    }
    
    return metadata
}

export default getMetadata;