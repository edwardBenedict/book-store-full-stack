const express = require("express");
const router = require("./routes/router");
require("dotenv").config();

const app = express();

const connectDB = require("./models/connectDB");
connectDB();

app.use(express.json());
app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server Running on http://localhost:${process.env.PORT}.`);
});
