import mysql from "mysql";

const databaseConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

databaseConnection.connect((error) => {
  if (error) throw error;
  console.log("Database connection successful");
});

export const queryDb = async (sql, params) => {
  return new Promise((resolve, reject) => {
    query(sql, params, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

export const query = databaseConnection.query.bind(databaseConnection);
export const escape = mysql.escape;

export default queryDb;
