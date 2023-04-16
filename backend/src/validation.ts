import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import jwt from "jsonwebtoken";
import { HttpError } from "./http-error";
import * as jose from "jose";

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

export const addPropertyValidation = [
  check("name", "Property has to have a name").not().isEmpty(),
  check("property_type", "Property has to have a type").not().isEmpty(),
  check("country", "Property has to have a country").not().isEmpty(),
  check("city", "Property has to have a city").not().isEmpty(),
  check("address", "Property has to have an address").not().isEmpty(),
  check("price", "Property has to have a price in a number format")
    .isDecimal()
    .not()
    .isEmpty(),
  check("amenities", "Property has to have amenities. JSON object")
    .not()
    .isEmpty(),
  check("pictures", "Property has to have pictures. JSON object")
    .not()
    .isEmpty(),
  check("booking_status", "Property has to have a booking state. Boolean")
    .isBoolean()
    .not()
    .isEmpty(),
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
    // if (payload.email.toLowerCase() !== req.body.email.toLowerCase())
    //   return res
    //     .status(401)
    //     .send("You are not authorized to access this information!");
    req.body.id = payload.id;
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

export const jwtVerification = async (req: Request, res: Response) => {
  const idToken = req.headers.authorization?.split(" ")[1];
  const publicAddress = req.body.publicAddress;
  const adapter = req.body.adapter;

  const jwksUrl =
    adapter === "openlogin"
      ? "https://api.openlogin.com/jwks"
      : "https://authjs.web3auth.io/jwks";

  if (!idToken || !publicAddress) {
    return res.status(400).json({ name: "Invalid token provided." });
  }

  try {
    // Get the JWK set used to sign the JWT issued by Web3Auth
    const jwks = jose.createRemoteJWKSet(new URL(jwksUrl));

    // Verify the JWT using Web3Auth's JWKS
    const jwtDecoded = await jose.jwtVerify(idToken, jwks, {
      algorithms: ["ES256"],
    });

    // Extract public_key or public_address from the payload
    const publicAddressFromJWT =
      adapter === "openlogin"
        ? (jwtDecoded.payload as any).wallets[0].public_key
        : (jwtDecoded.payload as any).wallets[0].address;

    // check if the public address from the JWT matches the public address from the request
    if (publicAddressFromJWT === publicAddress.toLowerCase()) {
      return res.status(200).json({ response: "Verification Successful" });
    } else {
      return res.status(400).json({ response: "Verification Failed" });
    }
  } catch (error) {
    const httpError = error as HttpError;

    return res.status(401).send(httpError.message);
  }
};
