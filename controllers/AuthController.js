const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authRegister = async (req, res) => {
  console.log("Register Page");
  // Register Function
  const { firstName, lastName, email, password } = req.body;
  console.log(
    `
    Fields: 
    Name    : ${firstName}-${lastName}
    Email   : ${email}
    Password: ${password}
    `
  );
  // Validate the fields
  const validationError = validationResult(req);
  if (validationError?.errors?.length > 0) {
    return res.status(400).json({ errors: validationError.array() });
  }

  // Check already exist
  const userData = await User.findOne({ email });

  if (userData) {
    console.log("*** ERRORS : User already exists!");
    return res
      .status(400)
      .json({ errors: [{ message: "User already exists!" }] });
  }

  // Crypt Password
  const salt = await bcrypt.genSalt(10);
  const cryptedPassword = await bcrypt.hash(password, salt);

  // Save the user to DB
  const user = new User({
    firstName,
    lastName,
    email,
    password: cryptedPassword, // Crypted Password
  });

  await user.save();

  // Error hanfling for saving

  res.send("Register Completed");
};

exports.authLogin = async (req, res) => {
  const { email, password } = req.body;

  //  Field Validation
  const validationError = validationResult(req);
  if (validationError?.errors?.length > 0) {
    return res.status(400).json({ errors: validationError.array() });
  }

  // User Exist
  const userData = await User.findOne({ email });

  if (!userData) {
    console.log("*** ERRORS : User doesn't exists!");
    return res
      .status(400)
      .json({ errors: [{ message: "User doesn't exists!" }] });
  }

  // TODO3 : Password Compare
  const isPasswordMatched = await bcrypt.compare(password, userData.password);
  if (!isPasswordMatched) {
    console.log("*** ERRORS : Invalid credentials!");
    return res
      .status(400)
      .json({ errors: [{ message: "Invalid credentials!" }] });
  }
  // Authentication return JSON WEB TOKEN(JWT)
  jwt.sign(
    { userData },
    process.env.JWT_SECRET_KEY,
    { expiresIn: 3600 },
    (err, token) => {
      if (err) {
        console.log("*** ERRORS : Invalid credentials!");
        return res
          .status(400)
          .json({ errors: [{ message: "Unknown Error!" }] });
      }
      res.send(token);
    }
  );

  console.log("Login Page");
  //res.send("Login Completed");
};
