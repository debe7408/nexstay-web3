import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { HttpError } from "../http-error";
import * as jose from "jose";

export const usersPostValidation = [
  check("publicAddress", "Please include a valid ETH public wallet address")
    .notEmpty()
    .matches(/^0x[a-fA-F0-9]{40}$/g),
];

export const userUpdateContactInfo = [
  check("firstName", "Please include a valid first name").not().isEmpty(),
  check("lastName", "Please include a valid last name").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("age", "Age has to be between 20 and 90").isInt({ min: 20, max: 90 }),
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

/**
 * Not functional as of yet. Considering removing this
 */
export const jwtVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      next();
    } else {
      return res.status(400).json({ response: "Verification Failed" });
    }
  } catch (error) {
    const httpError = error as HttpError;

    return res.status(401).send(httpError.message);
  }
};
