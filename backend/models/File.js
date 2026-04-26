const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  username: String   // 👈 ADD THIS
});

module.exports = mongoose.model("File", fileSchema);