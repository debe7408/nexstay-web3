import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import jwt from "jsonwebtoken";
import { HttpError } from "./http-error";

export const signupValidation = [
  check("name", "Name is requied").not().isEmpty(),
  check("surname", "Surname is requied").not().isEmpty(),
  check("age", "Age is required").isDecimal().not().isEmpty(),
  check("email", "Please include a valid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("password", "Password must be 6 or more characters").isLength({
    min: 8,
    max: 20,
  }),
];

export const loginValidation = [
  check("email", "Please include a valid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("password", "Password must be 6 or more characters").isLength({
    min: 8,
    max: 20,
  }),
];

export const jwtAuthorize = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if authorization header is present
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Authorization header not found!");
  }

  // Check if authorization header included token
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Authorization header is empty!");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string, {
      algorithms: ["HS256"],
    });

    if (typeof payload === "string") {
      return res.status(401).send("Invalid token");
    }

    // Check if JWT payload email and request body email is the same
    if (payload.email.toLowerCase() !== req.body.email.toLowerCase())
      return res
        .status(401)
        .send("You are not authorized to access this information!");

    next();
  } catch (err) {
    // If error is jwt expired, return custom message
    const httpError = err as HttpError;
    if (httpError.message === "jwt expired")
      return res.status(401).send("JWT token has expired!");

    // Else return generic error message
    return res.status(401).send("Invalid Token!");
  }
};
