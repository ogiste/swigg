import { ethers } from "hardhat";

async function main() {
  const EventCreation = await ethers.getContractFactory("SwiggEventManager");
  const contract = await EventCreation.deploy();

  console.log("Events Contract deployed to:", contract);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
