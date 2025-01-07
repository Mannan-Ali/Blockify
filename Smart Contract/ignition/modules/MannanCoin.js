// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

// $ npx hardhat ignition deploy ignition/modules/MannanCoin.js --network localhost
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MannanCoinApp", (m) => {

  const mCoinApp = m.contract("MannanCoin_ICO");
  return { mCoinApp };
});

