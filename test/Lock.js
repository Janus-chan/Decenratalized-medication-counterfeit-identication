const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect,assert } = require("chai");
const {ethers} = require("hardhat");

describe("Lock", function () {
  let ManufacturerFactoray;
  let ManufacturerDeploy;
  beforeEach(async function () {
     ManufacturerFactoray = await ethers.getContractFactory("Manufacturer")
     ManufacturerDeploy =await ManufacturerFactoray.deploy()
  })

  it("Should match Expected Serial Numbers to the  generated Serial Numbers",async function () {
    const TakeValueResponse = await ManufacturerDeploy.addprouct("benzonatate","hj273","Apollo","0","1685427522","1811657922")
    await TakeValueResponse.wait(1)
    const currentValue = await ManufacturerDeploy.Serialnumbers()
    const expextedValue = "5834154816160738";
    assert.equal(currentValue.toString(),expextedValue)
  })
})