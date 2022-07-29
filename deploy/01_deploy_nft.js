const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config");
const verify = require("../utils/smartContract/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // const arguments = []

    const listNFT = await deploy("ListNFT", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(listNFT.address, arguments)
    }
}

module.exports.tags = ["all", "listNFT", "main"]