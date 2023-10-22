import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("@nomicfoundation/hardhat-chai-matchers");

console.log('priv key - ', process.env.WEB3_PRIV_KEY )

const privKey = process.env.WEB3_PRIV_KEY || ''

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    scroll: {
      url: "https://sepolia-rpc.scroll.io/",
      chainId: 534351,
      gasPrice: 20000000000, // Adjust the gas price accordingly
      accounts: [privKey],
      gas: "auto",
    },
  },
};
export default config;
