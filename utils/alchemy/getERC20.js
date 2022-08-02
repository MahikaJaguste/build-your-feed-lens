// import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// const getERC20 = async (address) => {

//     // Using HTTP
//     const web3 = createAlchemyWeb3(
//         `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_TOKEN_API_KEY}`
//     );

//     // Wallet address
//     address = '0x9a4e6cb778451cf18b08ac40402cef57079ad5c9'

//     console.log(address, typeof address)

//     // Get token balances
//     const balances = await web3.alchemy.getTokenBalances(address, 'DEFAULT_TOKENS')

//     // Remove tokens with zero balance
//     const nonZeroBalances = 
//     balances['tokenBalances'].filter(token => {
//        return token['tokenBalance'] !== '0'
//     })
    
//     console.log(`Token balances of ${address} \n`)
    
//     // Counter for SNo of final output
//     let i = 1
    
//     // Loop through all tokens with non-zero balance
//     for (token of nonZeroBalances) {
    
//        // Get balance of token 
//        let balance = token['tokenBalance']
    
//        // Get metadata of token
//        const metadata = await web3.alchemy.getTokenMetadata(token[
//           'contractAddress'
//        ]);
    
//        // Compute token balance in human-readable format
//        balance = balance/Math.pow(10, metadata['decimals']);
//        balance = balance.toFixed(2);
    
//        // Print name, balance, and symbol of token
//        console.log(`${i++}. ${metadata['name']}: ${balance} ${metadata['symbol']}`)
//     }
// }

// export default getERC20();

