const networkConfig = {
    31337: {
        name: "localhost",
    },
    4: {
        name: "rinkeby",
    },
    5: {
        name: "goerli",
        // can add other attributes here
    },
    80001: {
        name: "mumbai",
        // can add other attributes here
    },
}

const DECIMALS = "18"
const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS
}