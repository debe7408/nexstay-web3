#!/bin/bash

MYSQL_HOST='' # Put the MySQL host here
MYSQL_USER='' # Put the MySQL user here
MYSQL_PASS='' # Put the MySQL root password here if needed
DB_NAME='' # Put the database name here
SQL_FILE='database_deploy.sql' # Update this with your SQL file path

# Create database
echo "Creating database ${DB_NAME}"
mysql -h${MYSQL_HOST} -u${MYSQL_USER} -p${MYSQL_PASS} -e "CREATE DATABASE ${DB_NAME};"

# Import SQL file
echo "Importing ${SQL_FILE} into ${DB_NAME}"
mysql -h${MYSQL_HOST} -u${MYSQL_USER} -p${MYSQL_PASS} ${DB_NAME} < ${SQL_FILE}

echo "Done."