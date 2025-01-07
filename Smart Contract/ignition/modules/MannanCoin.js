// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition



// MannanCoinApp#MannanCoin_ICO - 0x5FbDB2315678afecb367f032d93F642f64180aa3

// $ npx hardhat ignition deploy ignition/modules/MannanCoin.js --network localhost
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MannanCoinApp", (m) => {

  const mCoinApp = m.contract("MannanCoin_ICO");
  return { mCoinApp };
});

