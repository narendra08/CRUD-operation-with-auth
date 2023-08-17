const { isArray, isEmpty } = require("lodash");
const {
  header,
  body,
  param,
  query,
  validationResult,
} = require("express-validator");
const Handler = require("../serviceHandler");

const rejectIfInvalid = (req, res, next) => {
  const err = validationResult(req).array();

  if (err && isArray(err) && !isEmpty(err)) {
    console.log("Validation Error");
    const handler = new Handler();
    const e = ["validation error"];
    err.forEach((error) => {
      e.push(error);
    });
    return handler.serviceHandler(req, res, Promise.reject(e));
  }
  return next();
};

const loginValidation = async (req, res, next) => {
  await Promise.all(loginSchema.map((x) => x.run(req)));
  rejectIfInvalid(req, res, next);
};

const registerValidation = async (req, res, next) => {
  await Promise.all(registerSchema.map((x) => x.run(req)));
  rejectIfInvalid(req, res, next);
};
const accoutInfoValidation = async (req, res, next) => {
  await Promise.all(accoutInfoSchema.map((x) => x.run(req)));
  rejectIfInvalid(req, res, next);
};
const forgotPassValidation = async (req, res, next) => {
  await Promise.all(forgotPassSchema.map((x) => x.run(req)));
  rejectIfInvalid(req, res, next);
};
const updatePassValidation = async (req, res, next) => {
  await Promise.all(updatePassSchema.map((x) => x.run(req)));
  rejectIfInvalid(req, res, next);
};
const updateAccValidation = async (req, res, next) => {
  await Promise.all(updateAccSchema.map((x) => x.run(req)));
  rejectIfInvalid(req, res, next);
};
const updateAccSchema = [
  header("authorization").not().isEmpty().withMessage("Token Required"),
  body("name")
    .optional()
    .not()
    .isEmpty()
    .withMessage("value should not be empty")
    .isString()
    .withMessage("Value Should be String"),
  body("phone")
    .optional()
    .not()
    .isEmpty()
    .withMessage("value should not be empty")
    .isNumeric({ min: 10, max: 15 })
    .withMessage("invalid phone number"),
  body("email")
    .optional()
    .not()
    .isEmpty()
    .withMessage("value should not be empty")
    .isEmail()
    .withMessage("Invalid email"),
  body("address")
    .optional()
    .not()
    .isEmpty()
    .withMessage("value should not be empty")
    .isString()
    .withMessage("Value Should be String"),
  body("password")
    .optional()
    .not()
    .isEmpty()
    .withMessage("value should not be empty")
    .isString()
    .withMessage("Value Should be String"),
];
const updatePassSchema = [
  header("authorization").not().isEmpty().withMessage("Token Required"),
  body("user_id")
    .not()
    .isEmpty()
    .withMessage("value should not be empty")
    .isEmail()
    .withMessage("Invalid user_id"),
  body("old_password")
    .not()
    .isEmpty()
    .withMessage("value should not be empty")
    .isString()
    .withMessage("Value Should be String"),
  body("new_password")
    .not()
    .isEmpty()
    .withMessage("value should not be empty")
    .isString()
    .withMessage("Value Should be String"),
];
const forgotPassSchema = [
  header("authorization").not().isEmpty().withMessage("Token Required"),
  body("new_password")
    .not()
    .isEmpty()
    .withMessage("value should not be empty")
    .isString()
    .withMessage("Value Should be String"),
];
const accoutInfoSchema = [
  header("authorization").not().isEmpty().withMessage("Token Required"),
  param("user_id")
    .not()
    .isEmpty()
    .withMessage("value should not be empty")
    .isEmail()
    .withMessage("Invalid user_id"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("value should not be empty")
    .isString()
    .withMessage("Value Should be String"),
];
const loginSchema = [
  header("authorization").not().isEmpty().withMessage("Token Required"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("value should not be empty")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("value should not be empty")
    .isString()
    .withMessage("Value Should be String"),
];
const registerSchema = [
  header("authorization").not().isEmpty().withMessage("Token Required"),
  body("name")
    .not()
    .isEmpty()
    .withMessage("value should not be empty")
    .isString()
    .withMessage("Value Should be String"),
  body("phone")
    .not()
    .isEmpty()
    .withMessage("value should not be empty")
    .isNumeric({ min: 10, max: 15 })
    .withMessage("invalid phone number"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("value should not be empty")
    .isEmail()
    .withMessage("Invalid email"),
  body("address")
    .not()
    .isEmpty()
    .withMessage("value should not be empty")
    .isString()
    .withMessage("Value Should be String"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("value should not be empty")
    .isString()
    .withMessage("Value Should be String"),
];

module.exports = {
  registerValidation,
  loginValidation,
  accoutInfoValidation,
  forgotPassValidation,
  updatePassValidation,
  updateAccValidation,
};
