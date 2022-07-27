import covalentConfig from './covalentConfig.js';

async function contractInteraction(inputAddress, contractAddress) {
    console.log('inside')
    const APIKEY = covalentConfig.APIKEY
    const baseURL = 'https://api.covalenthq.com/v1'
    const chainId = '1'
    
    let or_part = `[`
    for(var i=0; i<contractAddress.length - 1; i++){
        or_part = or_part.concat(`{"to_address":${contractAddress[i]}},`)
    }
    or_part = or_part.concat(`{"to_address":${contractAddress[contractAddress.length - 1]}}]`)

    const match_part = `{"$match":{"$or":${or_part}}}`
    const group_part = `{"$group":{"_id":"to_address", "contract_interaction":{"$sum":1}}}`
    const primer_part = `[${match_part}, ${group_part}]`

    // try catch
    const url = new URL(`${baseURL}/${chainId}/address/${inputAddress}/transactions_v2/?key=${APIKEY}&no-logs=true&page-size=10000&primer=${primer_part}`)
    console.log(`${baseURL}/${chainId}/address/${inputAddress}/transactions_v2/?key=${APIKEY}&no-logs=true&page-size=10000&primer=${primer_part}`)
    const response = await fetch(url);
    const result = await response.json();
    const data = result.data;
    if(data && data.items){
        console.log(data.items)
        return data.items;
    }
    else{
        console.log(data);
        return null
    }
}

export default contractInteraction;