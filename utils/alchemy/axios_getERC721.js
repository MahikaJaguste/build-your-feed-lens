const axios = require('axios')

async function axios_getERC721 (address) {
    
    // address = 'elanhalpern.eth'
    const ALCHEMY_TOKEN_API_KEY="NQSuAhlOs706-XBHAkbF6rbLJ50InHTj"
    // Alchemy URL
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_TOKEN_API_KEY}`;
    const url = `${baseURL}/getNFTs/?owner=${address}`;

    const config = {
        method: 'get',
        url: url,
    };

    let user_result_ids = [], user_result = [];

    try {
        const response = await axios(config)
        const nfts = response['data'];

        // Parse output
        const numNfts = nfts['totalCount'];
        const nftList = nfts['ownedNfts'];

        // console.log(`Total NFTs owned by ${address}: ${numNfts} \n`);

        // console.log(nftList)
        for (let nft of nftList) {
            user_result_ids.push(nft.contract.address)
            user_result.push({
                contractAddress: nft.contract.address,
                tokenId: nft.id.tokenId,
                name: nft.metadata.name,
                tokenURI: nft.media.gateway ? nft.media.gateway : nft.metadata.image ? nft.metadata.image : null,
                viewURL: nft.metadata.tokenUri ? nft.metadata.tokenUri : nft.media.gateway ? nft.media.gateway : nft.metadata.image ? nft.metadata.image :'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp&v=1530129081'
            })
        }
    }
    catch(error) {
        console.log('error', error)
    }

    return [user_result_ids, user_result]
}

export default axios_getERC721;