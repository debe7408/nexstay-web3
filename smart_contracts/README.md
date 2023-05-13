# Trip.io Smart Contracts

This part of the repository contains the Trip.io system's smart contracts, which are written in Solidity.

## Authors

- Deividas Bendaravičius [@debe7408](https://www.github.com/debe7408)

## Environment Variables

To deploy this project locally, you need to add the following environment variables to your .env file, as it is not included in the repository:

`PRIVATE_KEY` - your ETH wallet private key.

Here's an example of what your .env file should look like:

```bash
PRIVATE_KEY="YOUR_PRIVATE_ETH_WALLET_KEY_HERE"
```

`⚠️ Note: The private key is only used to set the contract owner, who will initially receive funds. You can set this address to your vault address, which will distribute payments to property owners. ⚠️`

## Run Locally

Clone the repository using one of the following commands:

```bash
  git clone https://github.com/debe7408/trip.io.git
  git clone git@github.com:debe7408/trip.io.git
  gh repo clone debe7408/trip.io
```

Navigate to the smart contracts folder:

```bash
  cd tripio/smart_contracts
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


  if (network === "YOUR_NETWORK") {
    await deployer.deploy(PropertyPayment, token);
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
- **Emits:** `event: PaymentReceived`

### 2. Transfer Ownership

- **Function:** `transferOwnership(args)` - Transfers contract ownership to new address.
- **Authorization:** Can only be called by the current owner.
- **Expects:** `address: newOwnerAddress`

### 3. Set Token Address

- **Function:** `setTokenAddress(args)` - Changes token that is accepted as payment.
- **Authorization:** Can only be called by the owner.
- **Expects:** `address: newTokenAddress`

## Tech Stack

**Client:** Solidity, JavaScript.