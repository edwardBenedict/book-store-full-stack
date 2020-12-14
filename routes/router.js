const express = require("express");
const AuthRouter = require("./AuthRouter");
const ProfileRouter = require("./ProfileRouter");
const BookRouter = require("./BookRouter");

const router = express.Router();

// Only /api endpoint
/**
 * @route /api/auth
 * @desc Route for Auth
 */
router.use("/auth", AuthRouter);

/**
 * @route /api/profile
 * @desc Route for Profile
 */
router.use("/profile", ProfileRouter);

/**
 * @route /api/book
 * @desc Route for Book
 */
// router.use("/book", BookRouter);

module.exports = router;
