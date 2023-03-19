import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.listen(process.env.PORT, () =>
  console.log(`Server listening at port ${process.env.PORT}`)
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About route");
});
