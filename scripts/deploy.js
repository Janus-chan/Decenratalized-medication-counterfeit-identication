const {ethers,run,network} = require("hardhat")

async function main(){
  const ManufacturerFactory = await ethers.getContractFactory("Public")
  console.log("Deploying Contract ...");
  const Manufacturer = await ManufacturerFactory.deploy()
  await Manufacturer.deployed()
  console.log(`Deployed contract to : ${Manufacturer.address}`);


}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});





