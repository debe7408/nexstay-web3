import { check } from "express-validator";

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
