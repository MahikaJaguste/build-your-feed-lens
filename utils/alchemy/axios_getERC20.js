import axios from 'axios';
import erc20_contractAddress from '../preferences/erc20_contractAddress.js';
import erc20_metadata from '../preferences/erc20_metadata.js';

async function axios_getERC20 (address) {
    // Wallet address
    // const address = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'

    let user_result_ids = [], user_result = [];

    // Alchemy URL
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_TOKEN_API_KEY}`;

    const data = JSON.stringify({
    "jsonrpc": "2.0",
    "method": "alchemy_getTokenBalances",
    "headers": {
        "Content-Type": "application/json"
    },
    "params": [
        `${address}`,
        "DEFAULT_TOKENS",
    ],
    "id": 42
    });

    const config = {
    method: 'post',
    url: baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    data : data
    };

    // Make the request and print the formatted response:
    try {
        const response = await axios(config);
    
        // Get balances
        const balances = response['data']['result'] 
        
        // Remove tokens with zero balance
        const nonZeroBalances = 
        balances['tokenBalances'].filter(token => {
            return token['tokenBalance'] !== '0' && token['tokenBalance'] !== '0x0000000000000000000000000000000000000000000000000000000000000000'
        })

        console.log(`Token balances of ${address} \n`)

        for (let token of nonZeroBalances) {

            const index = erc20_contractAddress.indexOf(token['contractAddress'])
            
            const metadata = erc20_metadata[index]

            if(index != -1) {
                let balance = token['tokenBalance']/Math.pow(10, metadata['decimals']);
                balance = balance.toFixed(2);
                // Print name, balance, and symbol of token
                // console.log(`${metadata['name']}: ${balance}  ${metadata['symbol']}`)
                user_result_ids.push(metadata['id'].toString())
                user_result.push({id: metadata['id'], contractAddress: metadata['contractAddress'], tokenBalance: balance})
            }
        
        }
    }
    catch(error ){
        console.log('error', error)
    };

    return [user_result_ids, user_result]
}

export default axios_getERC20;