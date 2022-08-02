// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// // Using HTTP
// const web3 = createAlchemyWeb3(
//     `https://eth-mainnet.alchemyapi.io/nft/v2/${process.env.ALCHEMY_TOKEN_API_KEY}`,
// );

// const getNFT = async (address) => {
//     // Wallet address
//     // address = 'elanhalpern.eth'

//     // Get all NFTs
//     const nfts = await web3.alchemy.getNfts({ owner: address })

//     // Parse output
//     const numNfts = nfts['totalCount'];
//     const nftList = nfts['ownedNfts'];

//     console.log(`Total NFTs owned by ${address}: ${numNfts} \n`);
    
//     let i = 1;

//     for (nft of nftList) {
//         console.log(`${i}. ${nft['metadata']['name'].split("#")[0]} with contract address ${nft['contract']['address']}`)
//         i++;
//     }

// }

// export default getNFT;