import jwt from "jsonwebtoken";
import { HttpError } from "../http-error";
import { Response, Request, NextFunction } from "express";

/**
 * Creates and signs a JWT token based on the key and id provided.
 * @param key The public address of the user.
 * @param id The id of the user.
 * @returns A signed JWT token as string.
 */
export const signToken = (key: string, id: number, type: string) => {
  return jwt.sign(
    { id: id, publicAddress: key, userType: type },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
};

/**
 * Verify the token that is passed in.
 *
 * Middleware function on authorized endpoints, that
 * verifies the JWT token that is passed in to make sure that
 * it is valid.
 *
 */

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .send("Action needs authorization! Make sure you're logged in.");
    }

    // Check if authorization header included token
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send("Action needs authroization! Make sure you're logged in.");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET as string, {
      algorithms: ["HS256"],
    });

    if (typeof payload === "string") {
      return res.status(401).send("Invalid token");
    }

    req.body.publicAddress = payload.publicAddress;
    req.body.id = payload.id;
    req.body.userType = payload.userType;
    next();
  } catch (error) {
    const httpError = error as HttpError;
    if (httpError.message === "jwt expired")
      return res.status(401).send("JWT token has expired!");

    return res.status(401).send("Invalid Token!");
  }
};
