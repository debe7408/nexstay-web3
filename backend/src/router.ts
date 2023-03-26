import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { queryDb } from "./databaseConnection";
import { signupValidation, loginValidation, jwtAuthorize } from "./validation";
import { validationResult } from "express-validator";

const router = express.Router();

router.get("/users", async (req, res) => {
  const response = await queryDb("SELECT * FROM users");
  return res.json(response);
});

router.post("/login", loginValidation, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  const emailLowercase = email.toLowerCase();

  try {
    const sql = `SELECT * FROM users WHERE email = ? LIMIT 1`;
    const response = await queryDb(sql, [emailLowercase]);

    if (response.length === 0)
      return res.status(401).send("Invalid email or password");

    const passwordMatch = await bcrypt.compare(password, response[0].password);

    if (!passwordMatch)
      return res.status(401).send("Invalid email or password");

    const token = jwt.sign(
      { email: response[0].email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return res.send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.post(
  "/register",
  signupValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, surname, age, email, password } = req.body;

    const emailLowercased = email.toLowerCase();

    try {
      const saltRounds = 10;
      const sql = "SELECT * FROM users WHERE email = ? LIMIT 1";
      const response = await queryDb(sql, [emailLowercased]);

      if (response.length > 0)
        return res.status(409).send("User with this email already exists");

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const insertSql = `INSERT INTO users (name, surname, age, email, password) VALUES (? , ? , ? , ? , ?)`;

      await queryDb(insertSql, [
        name,
        surname,
        age,
        emailLowercased,
        hashedPassword,
      ]);

      const token = jwt.sign(
        { email: emailLowercased },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );

      return res.send({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

router.post("/getUserInfo", jwtAuthorize, async (req, res) => {
  const userEmail = req.body.email;

  const sql = `SELECT * FROM users WHERE email = ? LIMIT 1`;
  const response = await queryDb(sql, [userEmail]);

  const [user] = response;
  if (!user) return res.status(404).send("User not found");

  return res.send(user);
});

export default router;
