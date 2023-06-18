# NEXSTAY Smart Contracts

This part of the repository contains the NEXSTAY system's smart contracts, which are written in Solidity.

## Appendix

If you prefer to use already deployed smart contract, you can find the most up-to-date contract in this repository.

[![Contract](https://img.shields.io/badge/BSCSCAN-Contract-success?style=flat&logo=binance)](https://testnet.bscscan.com/address/0x6a81e84c64ae23c6a4dc09714f2e94fa45126248)

Contract address: 0x6a81e84c64ae23c6a4dc09714f2e94fa45126248

However, keep in mind, if you're building on top of the system, using this contract means that the service fee will be sent to the owner address of the contract.

## Authors

- Deividas Bendaravičius [@debe7408](https://www.github.com/debe7408)

## Environment Variables

To deploy this project locally, you need to add the following environment variables to your .env file, as it is not included in the repository:

`PRIVATE_KEY` - your ETH wallet private key.

`TOKEN_ADDRESS` - ERC20 token address you want to use as accepted currency.

Here's an example of what your .env file should look like:

```bash
PRIVATE_KEY="YOUR_PRIVATE_ETH_WALLET_KEY_HERE"
TOKEN_ADDRESS="0x6fc24c93a5665845f7455eb1a72fb1f47510af42" #USDT in this case
```

`⚠️ Note: The private key is only used to set the contract owner, who will initially receive funds. You can set this address to your vault address, which will distribute payments to property owners. ⚠️`

## Run Locally

Clone the repository using one of the following commands:

```bash
  git clone https://github.com/debe7408/nexstay-web3.git
  git clone git@github.com:debe7408/nexstay-web3.git
  gh repo clone debe7408/nexstay-web3
```

Navigate to the smart contracts folder:

```bash
  cd nexstay-web3/smart_contracts
```

Install Truffle:

```bash
  npm install -g truffle
```

Install the required dependencies from the package.json file:

```bash
  yarn add
```

Make sure you've set up your .env file. Compile the contracts before deploying them:

```bash
  npx truffle compile
```

After the contracts are compiled, deploy them locally or on the BSC SmartChain Testnet:

```bash
  npx truffle migrate --network bsctestnet
```

You can also add your own network to deploy the contract. Further explanations on how to do this are in the following section.

## Add custom network

To add a custom network for deploying your contracts, modify the following files:

### 2_deploy_property_payment.js

- Add custom network to migration

```javascript
module.exports = async function (deployer, network) {
  // Token address that is accepted as payment.
  const token = "PAYMENT_TOKEN_ADDRESS";
  const feePercentage = "TRANSACTION_FEE_PERCENTAGE";



  if (network === "YOUR_NETWORK") {
    await deployer.deploy(PropertyPayment, token,feePercentage);
  }
  ...
};
```

### truffle-config.js

- Add network configuration

```javascript
   YOUR_NETWORK_NAME: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          `RPC_URL`
        ),
      network_id: NETWORK_ID,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
```

## Contract Interactions

This section lists all the interactions you can have with the contract.

### 1. Pay

- **Function:** `pay(args)` - Initializes payment transaction.
- **Expects:** `uint256: amount`
- **Expects:** `address: receiver address`
- **Emits:** `event: PaymentReceived`

### 2. Transfer Ownership

- **Function:** `transferOwnership(args)` - Transfers contract ownership to new address.
- **Authorization:** Can only be called by the current owner.
- **Expects:** `address: newOwnerAddress`

### 3. Set Token Address

- **Function:** `setTokenAddress(args)` - Changes token that is accepted as payment.
- **Authorization:** Can only be called by the owner.
- **Expects:** `address: newTokenAddress`

### 4. Set Transaction Fee Percentage

- **Function:** `setFeePercentage(args)` - Changes fee percentage that is associated with the contract.
- **Authorization:** Can only be called by the owner.
- **Expects:** `uint256: new fee percentage`
- **Default:** `uint256: 5`

## Tech Stack

**Client:** Solidity, JavaScript.
