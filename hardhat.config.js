// hardhat.config.js
// require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-chai-matchers");
require("hardhat-deploy");
require('dotenv').config();

const infuraProjectId = process.env.INFURA_PROJECT_ID;
const mnemonic = process.env.MNEMONIC;
const alchemyAPIKey = process.env.ALCHEMY_API_KEY;
const etherscanAPIKey = process.env.ETHERSCAN_API_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: {
    compilers: [
      {
          version: "0.8.9",
      },
      {
          version: "0.6.6",
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: { 
    goerli: {
      url: `https://goerli.infura.io/v3/${infuraProjectId}`,
      accounts: {mnemonic: mnemonic},
      chainId: 5,
      blockConfirmations: 6,
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${alchemyAPIKey}`,
      accounts: {mnemonic: mnemonic},
      chainId: 80001,
      blockConfirmations: 6,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraProjectId}`,
      accounts: {mnemonic: mnemonic},
      chainId: 4,
      blockConfirmations: 6,
    },
    hardhat: {
      chainId: 31337,
    }
  },
  etherscan: {
    apiKey: etherscanAPIKey,
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
        1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    alice: 1,
    bob: 2,
  },
  mocha: {
      timeout: 200000, // 200 seconds max for running tests
  },
};