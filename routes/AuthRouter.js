const express = require("express");
const AuthController = require("../controllers/AuthController");
const { check } = require("express-validator");

const router = express.Router();

// routes for api/auth
/**
 * @route   POST /api/auth/register
 * @desc    Register Account
 * @access  Public
 */

router.post(
  "/register",
  [
    check(
      "password",
      "Please enter a password with 6 and more chars."
    ).isLength({
      min: 6,
    }),
    check("email", "Please enter a valid email!").isEmail(),
  ],
  AuthController.authRegister
);

/**
 * @route   POST  api/auth/login
 * @desc    Login endpoin
 * @access  Public
 */
router.post(
  "/login",
  [
    check("email", "Please enter a valid email!").isEmail(),
    check(
      "password",
      "Please enter a password with 6 and more chars."
    ).isLength({
      min: 6,
    }),
  ],
  AuthController.authLogin
);

module.exports = router;
