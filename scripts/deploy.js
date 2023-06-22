// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const {ethers,run,network} = require("hardhat")

async function main(){
  const ManufacturerFactory = await ethers.getContractFactory("Public")
  console.log("Deploying Contract ...");
  const Manufacturer = await ManufacturerFactory.deploy()
  await Manufacturer.deployed()
  console.log(`Deployed contract to : ${Manufacturer.address}`);
// console.log(network.config);

// if(network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY){
//   console.log("waiting for block ");
//   await simpleStorage.deployTransaction.wait(6);
//   await verify(simpleStorage.address,[])
  
// }



}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});





