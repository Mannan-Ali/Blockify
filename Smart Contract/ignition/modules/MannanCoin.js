// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition


// Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
// Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

// Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
// Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d


//MannanCoinApp#MannanCoin_ICO - 0x5FbDB2315678afecb367f032d93F642f64180aa3


const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MannanCoinApp", (m) => {

  const mCoinApp = m.contract("MannanCoin_ICO");
  return { mCoinApp };
});

