// import covalentConfig from './covalentConfig.js';

// async function contractInteraction(inputAddress, contractAddress) {
//     console.log('inside')
//     const APIKEY = covalentConfig.APIKEY
//     const baseURL = 'https://api.covalenthq.com/v1'
//     const chainId = '1'

//     // inputAddress = '0xe340b00b6b622c136ffa5cff130ec8edcddcb39d'


//     // contractAddress = [
//     //     "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", 
//     //     "0x283af0b28c62c092c9727f1ee09c02ca627eb7f5",
//     //     "0x7f268357a8c2552623316e2562d90e642bb538e5",
//     //     "0x55e0f7a3bb39a28bd7bcc458e04b3cf00ad3219e",
//     //     "0xcDA72070E455bb31C7690a170224Ce43623d0B6f",

//     //     // "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
//     //     // "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
//     //     // "0xccC8cb5229B0ac8069C51fd58367Fd1e622aFD97",
//     //     // "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942",  
//     // ]
    
//     let or_part = `[`
//     for(var i=0; i<contractAddress.length - 1; i++){
//         or_part = or_part.concat(`{"to_address":${contractAddress[i]}},`)
//     }
//     or_part = or_part.concat(`{"to_address":${contractAddress[contractAddress.length - 1]}}]`)

//     const match_part = `{"$match":{"$or":${or_part}}}`
//     const group_part = `{"$group":{"_id":"to_address", "contract_interaction":{"$sum":1}}}`
//     const primer_part = `[${match_part}, ${group_part}]`

//     // try catch
//     const url = new URL(`${baseURL}/${chainId}/address/${inputAddress}/transactions_v2/?key=${APIKEY}&no-logs=true&page-size=10000&primer=${primer_part}`)
//     const response = await fetch(url);
//     const result = await response.json();
//     // console.log(response, result);
//     const data = result.data;
//     if(data && data.items){
//         console.log('Items:', data.items)
//         return data.items;
//     }
//     else{
//         console.log('No data', data);
//         return null
//     }
// }

// export default contractInteraction;