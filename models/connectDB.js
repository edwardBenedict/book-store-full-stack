const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Succesfully connected to DB!");
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};

// "mongodb+srv://edben:<password>@trainingcluster.tpyei.mongodb.net/test"

module.exports = connectDB;
