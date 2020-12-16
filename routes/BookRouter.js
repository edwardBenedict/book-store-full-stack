const express = require("express");
const router = express.Router();
const BookController = require("../controllers/BookController");

// Base Utl : /api/books

/**
 * @route   GET /api/books
 * @desc    Books Listening Endpoint
 * @access  Public
 */
router.get("/", BookController.getBookList);

/**
 * @route   GET /api/details/:id
 * @desc    Books Details Endpoint
 * @access  Public
 */
router.get("/details/:id", BookController.getBookDetails);

module.exports = router;
