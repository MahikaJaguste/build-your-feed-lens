const {setupUsers, setupUser} = require('./utils');
const { expect, anyUint } = require("chai");
const { ethers, deployments, getNamedAccounts, getUnnamedAccounts, network } = require("hardhat");
const { networkConfig, tokenUris } = require('../helper-hardhat-config');

async function setup () {
    // it first ensures the deployment is executed and reset (use of evm_snapshot for faster tests)
    await deployments.fixture(["listNFT"]);
  
    // we get an instantiated contract in the form of a ethers.js Contract instance:
    const contracts = {
      ListNFT: (await ethers.getContract('ListNFT')),
    };
  
    // we get the alice
    const {deployer, alice} = await getNamedAccounts();
  
    // Get the unnammedAccounts (which are basically all accounts not named in the config,
    // This is useful for tests as you can be sure they have noy been given tokens for example)
    // We then use the utilities function to generate user objects
    // These object allow you to write things like `users[0].ListNFT.transfer(....)`
    const users = await setupUsers(await getUnnamedAccounts(), contracts);

    const chainId = network.config.chainId;

    // finally we return the whole object (including the alice setup as a User object)
    return {
      ...contracts,
      users,
      deployer: await setupUser(deployer, contracts),
      alice: await setupUser(alice, contracts),
      chainId
    };
  }

describe("ListNFT contract", function() {

    describe("Deployment", function () {

      it("Should set the initial values correctly", async function () {
        // before the test, we call the fixture function.
        const { ListNFT, chainId, deployer } = await setup();
        expect(await ListNFT.owner()).to.equal(deployer.address);
        expect(await ListNFT.name()).to.equal('LensList')
        expect(await ListNFT.symbol()).to.equal('LST')
      });
    });

    describe("Minting", function () {

      it("Should mint correctly", async function () {
        // before the test, we call the fixture function.
        const { ListNFT, alice} = await setup();

        let tokenId; 

        await expect(alice.ListNFT.mint(alice.address, 'abc'))
        .to.emit(ListNFT, "ListNFTMinted")
        .withArgs(alice.address, 
            (_tokenId) => {
                tokenId = _tokenId; 
                return true;
            }, 
            'abc');

        expect(await ListNFT.tokenURI(tokenId)).to.equal('abc')
        expect(await ListNFT.ownerOf(tokenId)).to.equal(alice.address)

      });
    });


});