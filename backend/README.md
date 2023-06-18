# NEXSTAY Backend

This repository holds the backend part of the NEXSTAY system.

## Authors

- Deividas Bendaravičius [@debe7408](https://www.github.com/debe7408)

## Environment Variables

In order to run this project, you will need to add the following environment variables to your .env file, since it is not included in the repository.

`PORT` - port you want to run the server on

`DB_HOST` - database host.

`DB_USER` - user that connects to the database.

`DB_PASSWORD` - password of the user connecting to the database.

`DB_DATABASE` - database you're connecting to.

`JWT_SECRET` - the secret of your JWT token.

Here is an example of how the .env file should look like:

```bash
PORT=3001

DB_HOST=localhost

DB_USER=admin

DB_PASSWORD=admin

DB_DATABASE=nexstay

JWT_SECRET="nexstay-super-secret-key"
```

## Run Locally

After setting up the environmental variables, you can go ahead and run your server by following the steps below.

Clone the repository by one of the following ways:

```bash
  git clone https://github.com/debe7408/nexstay-web3.git
  git clone git@github.com:debe7408/nexstay-web3.git
  gh repo clone debe7408/nexstay-web3
```

Go to the backend folder

```bash
  cd nexstay-web3/backend
```

Install required dependencies from package.json file

```bash
  yarn
```

This will run the development server locally on specified port

```bash
  yarn run dev
```

## Deployment

#### The following scripts can be run to deploy your server for production.

Compile all the TypeScript files to JavaScript and copy contents of the .env file

```bash
yarn run build
```

Start your production server. Changes to the code can not be made.

```bash
yarn run start
```

## API Reference

Once you have your local server running, the following API calls can be made using tools such as Postman.

#### Register a new user

```http
POST /api/users/register
```

| Parameter  | Type      | Description                 |
| :--------- | :-------- | :-------------------------- |
| `name`     | `string`  | **Required**. User name     |
| `surname`  | `string`  | **Required**. User surname  |
| `age`      | `integer` | **Required**. User age      |
| `email`    | `string`  | **Required**. User email    |
| `password` | `string`  | **Required**. User password |

Returns JWT auth token.

#### Login with existing user

```http
POST /api/users/login
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. User email    |
| `password` | `string` | **Required**. User password |

Returns new JWT auth token.

#### Get specific user information

```http
GET /api/users/getUserInfo
```

| Header           | Type           | Description            |
| :--------------- | :------------- | :--------------------- |
| `Authorization ` | `Bearer token` | **Required** JWT token |

#### Get a list of all properties

```http
GET /api/properties/getProperties
```

#### Add a new property

```http
POST /api/properties/addProperty
```

| Parameter        | Type      | Description                       |
| :--------------- | :-------- | :-------------------------------- |
| `name`           | `string`  | **Required**. Property name       |
| `property_type`  | `string`  | **Required**. Property type       |
| `price`          | `float`   | **Required**. Booking price       |
| `country`        | `string`  | **Required**. Country location    |
| `city`           | `string`  | **Required**. City location       |
| `address`        | `string`  | **Required**. Address location    |
| `amenities`      | `json`    | **Required**. Available amenities |
| `pictures`       | `json`    | **Required**. Picture paths       |
| `booking_status` | `boolean` | **Required**. Enabled/disabled    |

| Header           | Type           | Description            |
| :--------------- | :------------- | :--------------------- |
| `Authorization ` | `Bearer token` | **Required** JWT token |

#### Delete property

```http
DELETE /api/properties/addProperty
```

| Parameter     | Type      | Description                      |
| :------------ | :-------- | :------------------------------- |
| `property_id` | `decimal` | **Required**. ID of the property |

| Header           | Type           | Description            |
| :--------------- | :------------- | :--------------------- |
| `Authorization ` | `Bearer token` | **Required** JWT token |

## Tech Stack

**Server:** Node.js, Express.js, Typescript
