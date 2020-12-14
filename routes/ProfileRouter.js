const express = require("express");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

// routes for api/profile
/**
 * @route   GET api/profile
 * @desc    Profile Endpoint
 * @access  Private
 */

router.get("/", auth, (req, res) => {
  res.send(req.decodedUser.email);
});

module.exports = router;
