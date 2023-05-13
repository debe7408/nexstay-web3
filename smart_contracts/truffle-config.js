const HDWalletProvider = require("@truffle/hdwallet-provider");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    bsctestnet: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          `https://data-seed-prebsc-2-s2.binance.org:8545`
        ),
      network_id: 97, // BSC Testnet network id
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};
