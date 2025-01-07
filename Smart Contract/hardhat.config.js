require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  //adding to sepolia live network
  // networks:{    //dont have enough sepolia eth to test on live network
  //   sepolia:{
  //     //takes 2 keys 
  //     url:process.env.ALCHEMY_RPC_URL_KEY,
  //     accounts:[process.env.TEST_NET_PRIVATE_KEY],
  //   },
  // },
};
