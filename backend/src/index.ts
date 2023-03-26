import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import indexRouter from "./router";
import { HttpError } from "./http-error";

dotenv.config({ path: "../.env" });

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api", indexRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const httpError = err as HttpError;
  httpError.statusCode = httpError.statusCode || 500;
  httpError.message = httpError.message || "Internal Server Error";
  res.status(httpError.statusCode).json({
    message: httpError.message,
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Server listening at port ${process.env.PORT}`)
);
