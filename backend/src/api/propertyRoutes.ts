import express from "express";
import { queryDb } from "../databaseConnection";

const propertyRoutes = express.Router();

propertyRoutes.get("/properties", async (req, res) => {
  const response = await queryDb("SELECT * FROM properties");
  return res.status(200).json(response);
});

// propertyRoutes.post("addProperty", async (req, res) => {
//   const { name, description, price, address, city, state, zipCode } = req.body;

//   const sql = `INSERT INTO properties (name, description, price, address, city, state, zipCode) VALUES (?, ?, ?, ?, ?, ?, ?)`;
//   const response = await queryDb(sql, [
//     name,
//     description,
//     price,
//     address,
//     city,
//     state,
//     zipCode,
//   ]);
//   return res.status(200).json(response);
// });

export default propertyRoutes;
