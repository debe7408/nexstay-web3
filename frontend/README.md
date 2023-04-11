# Trip.io React.js

This repository holds the frontend part of the Trip.io system.
The project is written in Typescript and React.js.

## Authors

- Deividas Bendaravičius [@debe7408](https://www.github.com/debe7408)

## Environment Variables

In order to run this project, you will need to add the following environment variables to your .env file, since it is not included in the repository.

`REACT_APP_WEB3AUTH_CLIENTID` - your Web3Auth clientId.

`REACT_APP_CHAIN_ID` - chain id of the blockchain you're running the app on in hex. (default "0x61")

`REACT_APP_RPC_TARGET` - rpc url to make rpc calls

`REACT_APP_BLOCK_EXPLORER` - block explorer url

`REACT_APP_BASE_API_URL` - backend api url.

Here is an example of how the .env file should look like:

```bash
REACT_APP_WEB3AUTH_CLIENTID="someClientId123"

REACT_APP_CHAIN_ID="0x61"

REACT_APP_RPC_TARGET="https://data-seed-prebsc-1-s3.binance.org:8545"

REACT_APP_BLOCK_EXPLORER="https://testnet.bscscan.com/"

REACT_APP_BASE_API_URL="http://localhost:3001/api"
```

## Run Locally

The project depends on Web3Auth, so before starting a locally run version of the frontend, make sure to visit and obtain your clientId from [Web3Auth Dashboard](https://dashboard.web3auth.io/) by creating a new project.

Clone the repository by one of the following ways:

```bash
  git clone https://github.com/debe7408/trip.io.git
  git clone git@github.com:debe7408/trip.io.git
  gh repo clone debe7408/trip.io
```

Go to the frontend folder

```bash
  cd tripio/frontend
```

Install required dependencies from package.json file

```bash
  yarn install
```

Start the development server (will start a local server on port 3000).

```bash
  yarn run dev
```

## Tech Stack

**Client:** React, Redux, MaterialUI, Typescript
