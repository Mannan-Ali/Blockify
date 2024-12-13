const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("MannanCoin_ICO", function () {

  async function getContract() {
    const signers = await ethers.getSigners()
    const mCoin = await ethers.getContractFactory("MannanCoin_ICO");
    const deployedCoin = await mCoin.deploy();

    return { deployedCoin, signers };
  };

  let owner, buyer, deployedCoinInstance, totalCoins, usdValFor1Coin, totalCoinsBought;
  // Use beforeEach to initialize the variables(not before as it only fetches once)
  /*
  What is beforeEach?
  beforeEach is a special function in testing frameworks like Mocha.
  It runs before each test case (each it() block) in your test suite.
  It’s useful when you want to set up some common things before each test, like initializing variables or setting up a test environment.
  Why is it useful?
  Instead of repeating the same setup code in every test, you can put it in beforeEach so that it automatically runs before every individual test. This reduces duplication and keeps your tests clean
  */

  beforeEach(async function () {
    const { signers, deployedCoin } = await getContract();
    owner = signers[0];
    buyer = signers[1];
    // Store the contract instance in deployedCoinInstance
    deployedCoinInstance = deployedCoin;
    totalCoins = await deployedCoinInstance.totalCoins();
    usdValFor1Coin = await deployedCoinInstance.usdValFor1Coin();
    totalCoinsBought = await deployedCoinInstance.totalCoinsBought();
  });

  function logs() {
    console.log("This is the owners address: ", owner.address);
    console.log("This is the current buyers address: ", buyer.address);
    console.log("The total coins in ICO is : ", totalCoins);
    console.log("The USD to MannanCoin Value in ICO is : ", usdValFor1Coin);
    console.log("The total coins that are alredy bought are : ", totalCoinsBought);
    console.log("The total coins that are left for sale is : ", totalCoins - totalCoinsBought);
  }

  describe("Calling function ", function () {
    it("Buying Coin : ", async function () {
      
      await deployedCoinInstance.buyMannanCoins(buyer.address, 6);
      await deployedCoinInstance.sellMannanCoins(buyer.address, 1000);
      const buyersCoin=await deployedCoinInstance.equityInCoin(buyer.address);
      console.log("This is the amount bought by buyer 1: ",buyersCoin);
      // Re-fetch the updated state after transaction
      totalCoinsBought = await deployedCoinInstance.totalCoinsBought();
      logs();

    });
    it("Selling Coins", async function () {
      const buyersCoin = await deployedCoinInstance.equityInCoin(buyer.address);
      console.log(buyersCoin);

      // await deployedCoinInstance.sellMannanCoins(buyer.address, 1000);
      // Re-fetch the updated state after transaction
      logs();
    });
  });

});
