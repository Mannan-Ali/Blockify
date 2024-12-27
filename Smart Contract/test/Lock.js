const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether')
}
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
    let buyTransaction,totalCoins,totalCoinsBoughtBefore,amountInWei,oneMannanCoinInWei
    beforeEach(async ()=>{
      totalCoins = await deployedCoin.totalCoins();
      totalCoinsBoughtBefore = await deployedCoin.totalCoinsBought();
      oneMannanCoinInWei = await deployedCoin.oneMannanCoinInWei();
      amountInWei = tokens(2.5);
      //here 5 dollar = 5000 coins we are buying
      buyTransaction = await deployedCoin.connect(buyer).buyMannanCoins({ value : amountInWei });
      await buyTransaction.wait();

    })
    it("Checking conins amount after coin buy:",async ()=>{
      const totalCoinsBoughtAfter = await deployedCoin.totalCoinsBought();
      console.log(totalCoins);
      console.log(totalCoinsBoughtAfter);
      
      expect(amountInWei/oneMannanCoinInWei).to.be.equal(totalCoinsBoughtAfter);
      expect(totalCoinsBoughtAfter).to.be.greaterThan(totalCoinsBoughtBefore);
    });
    it("Check Investor balance",async ()=>{
      const equityInCoins = await deployedCoin.equityInCoin(buyer.address);
      const equityInWei = await deployedCoin.amountInWei(buyer.address);

      console.log(equityInCoins);
      console.log(equityInWei);
      expect(equityInCoins).to.be.equal(amountInWei/oneMannanCoinInWei);
      expect(equityInWei).to.be.equal(amountInWei);
    });
  })
  describe("Check Sell Coin functionality",()=>{
    let buyTransaction,sellCoinTransaction,totalCoins,totalCoinsBoughtBefore,amountInWei,amountInCoin,oneMannanCoinInWei
    beforeEach(async ()=>{
      totalCoins = await deployedCoin.totalCoins();
      totalCoinsBoughtBefore = await deployedCoin.totalCoinsBought();
      oneMannanCoinInWei = await deployedCoin.oneMannanCoinInWei();
      amountInWei = tokens(2.5);

      buyTransaction = await deployedCoin.connect(buyer).buyMannanCoins({ value : amountInWei });
      await buyTransaction.wait();

      amountInCoin = BigInt(2000);
      sellCoinTransaction = await deployedCoin.connect(buyer).sellMannanCoins(amountInCoin);
      await sellCoinTransaction.wait();
    })
    it("Checking conins left to sell amount after coin sell:",async ()=>{
      const totalCoinsBoughtAfter = await deployedCoin.totalCoinsBought();
      console.log(totalCoins);
      console.log(totalCoinsBoughtAfter);
      
      expect(totalCoinsBoughtAfter).to.be.greaterThan(totalCoinsBoughtBefore);
    });
    it("Check Investor balance",async ()=>{
      const equityInCoins = await deployedCoin.equityInCoin(buyer.address);
      const equityInWei = await deployedCoin.amountInWei(buyer.address);

      console.log(equityInCoins);
      console.log(equityInWei);
      expect(equityInCoins).to.be.equal((amountInWei/oneMannanCoinInWei)-amountInCoin);
      expect(equityInWei).to.be.equal(amountInWei-(amountInCoin*oneMannanCoinInWei));
    });
  });
  describe("Checking Withdrawal function : ", ()=>{
    let deployedCoinAddress,transaction,amountInWei,balanceBeforeWithdraw
    beforeEach(async ()=>{
      deployedCoinAddress = await deployedCoin.getAddress();

      amountInWei = tokens(2.5);

      transaction = await deployedCoin.connect(buyer).buyMannanCoins({ value : amountInWei });
      await transaction.wait();
      
      balanceBeforeWithdraw = await ethers.provider.getBalance(owner.address);

      transaction = await deployedCoin.connect(owner).withdraw();
      await transaction.wait();
    })
    it("Check Withdrawing of money : ",async ()=>{
      const balanceAfterWithdraw = await ethers.provider.getBalance(owner.address);
      console.log(balanceBeforeWithdraw);  
      console.log(balanceAfterWithdraw);
      expect(balanceAfterWithdraw).to.be.gt(balanceBeforeWithdraw);
    })

    it("Check if any amount left in contract balance : ",async ()=>{
      const balanceInContract = await ethers.provider.getBalance(deployedCoinAddress);
      console.log(balanceInContract);
      
      expect(balanceInContract).to.be.equal(0);
    })
  })
});
