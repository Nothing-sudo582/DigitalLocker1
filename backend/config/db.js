const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://admin:admin123@ac-x6ioppp-shard-00-00.dkgqctp.mongodb.net:27017,ac-x6ioppp-shard-00-01.dkgqctp.mongodb.net:27017,ac-x6ioppp-shard-00-02.dkgqctp.mongodb.net:27017/DigitalLocker?ssl=true&replicaSet=atlas-awizr5-shard-0&authSource=admin&retryWrites=true&w=majority");
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;