import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("@nomicfoundation/hardhat-chai-matchers");

console.log('priv key - ', process.env.WEB3_PRIV_KEY )

const privKey = process.env.WEB3_PRIV_KEY || ''

const config: HardhatUserConfig = {
  solidity: "0.8.2",
  networks: {
    optimism: {
      url: "https://optimism-goerli.publicnode.com", // Replace with Optimism testnet RPC URL
      accounts: [privKey], // Replace with your private key
      gasPrice: 0, // Optimism currently uses a gas price of 0
      // ovm: true // This sets the network as using the OVM and ensure contract will be compiled against that
    },
  },
};
export default config;
