# NEXSTAY Database

This directory holds resources required to deploy the database locally.

## Authors

- Deividas Bendaravičius [@debe7408](https://www.github.com/debe7408)

## Run Locally

1. Navigate to the database folder.

2. Make sure that MySQL server is installed and running locally.

3. Make sure that you grabbed the deployment script from the repository.

4. Open the bash script and edit the configurations (user, password, database name, host).

5. Run the following script to create a database and import tables into it.

```bash
	bash ./deploymentScript.sh
```

5. Connect to MySQL server and test if you can access the database.

## Tech Stack

**Database:** MySQL
