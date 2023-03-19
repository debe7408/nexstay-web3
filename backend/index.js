import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About route");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(process.env.PORT, () =>
  console.log(`Server listening at port ${process.env.PORT}`)
);
