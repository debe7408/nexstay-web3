const PropertyPayment = artifacts.require("PropertyPayment");

module.exports = async function (deployer, network) {
  // Token address that is expected for payment transaction
  // Defaults to USDT on BSC testnet, can be changed by owner of the contract calling setTokenAddress()
  const token = "0x6fc24c93a5665845f7455eb1a72fb1f47510af42";

  // Fee percentage that is expected for payment transaction
  // Defaults to 5%, can be changed by owner of the contract calling setFeePercentage()
  const feePercentage = "5";

  if (network === "bsctestnet") {
    await deployer.deploy(PropertyPayment, token, feePercentage);
  } else {
    // Deploy a Mock Token for the local development network
    const MockToken = artifacts.require("MockToken");
    await deployer.deploy(MockToken);
    const mockToken = await MockToken.deployed();

    await deployer.deploy(PropertyPayment, mockToken.address);
  }
};
