const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("MannanCoin_ICO", function () {
  let owner,buyer,deployedCoin
  beforeEach(async ()=>{
    [owner,buyer] = await ethers.getSigners()
    mCoin = await ethers.getContractFactory("MannanCoin_ICO");
    deployedCoin = await mCoin.deploy();
  })
  // Use beforeEach to initialize the variables(not before as it only fetches once)
  /*
  What is beforeEach?
  beforeEach is a special function in testing frameworks like Mocha.
  It runs before each test case (each it() block) in your test suite.
  It’s useful when you want to set up some common things before each test, like initializing variables or setting up a test environment.
  Why is it useful?
  Instead of repeating the same setup code in every test, you can put it in beforeEach so that it automatically runs before every individual test. This reduces duplication and keeps your tests clean
  */
  describe("Deployment Check ",()=> {
    it("Cheking the owner : ", async () => {
      console.log(owner.address);
      expect(await deployedCoin.owner()).to.be.equal(owner.address);
    })
  });
  describe("Check Buy Coin functionality",()=>{
    let buyTransaction,totalCoins,totalCoinsBoughtBefore,amountInUSD
    this.beforeEach(async ()=>{
      totalCoins = await deployedCoin.totalCoins();
      totalCoinsBoughtBefore = await deployedCoin.totalCoinsBought();
      amountInUSD = BigInt(5);
      //here 5 dollar = 5000 coins we are buying
      buyTransaction = await deployedCoin.buyMannanCoins(buyer.address,amountInUSD);
      await buyTransaction.wait();

    })
    it("Checking conins amount after coin buy:",async ()=>{
      const totalCoinsBoughtAfter = await deployedCoin.totalCoinsBought();
      const usdValFor1Coin = await deployedCoin.usdValFor1Coin();
      console.log(totalCoins);
      console.log(totalCoinsBoughtAfter);
      
      expect(amountInUSD*usdValFor1Coin).to.be.equal(totalCoinsBoughtAfter);
      expect(totalCoinsBoughtAfter).to.be.greaterThan(totalCoinsBoughtBefore);
    })

  })
});
