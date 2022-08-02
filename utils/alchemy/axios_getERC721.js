const axios = require('axios')

async function axios_getERC721 (address) {
    
    // address = 'elanhalpern.eth'
    
    // Alchemy URL
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_TOKEN_API_KEY}`;
    const url = `${baseURL}/getNFTs/?owner=${address}`;

    const config = {
        method: 'get',
        url: url,
    };

    try {
        const response = await axios(config)
        const nfts = response['data'];

        // Parse output
        const numNfts = nfts['totalCount'];
        const nftList = nfts['ownedNfts'];

        console.log(`Total NFTs owned by ${address}: ${numNfts} \n`);

        let i = 1;

        for (let nft of nftList) {
            console.log(`${i}. ${nft['metadata']['name']}`)
            i++;
        }
    }
    catch(error) {
        console.log('error', error)
    }
}

export default axios_getERC721;