require("dotenv").config(); // 🔑 Load .env variables

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/", authRoutes);
app.use("/", fileRoutes);

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// 🔑 IMPORTANT for deployment
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});