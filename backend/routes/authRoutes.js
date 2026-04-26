const express = require("express");
const router = express.Router();
const User = require("../models/User");


// ------------------- SIGNUP -------------------
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // basic validation
    if (!username || !password) {
      return res.json({ message: "All fields are required" });
    }

    // check if user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    // create new user
    const newUser = new User({
      username,
      password
    });

    await newUser.save();

    res.json({ message: "Signup successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// ------------------- LOGIN -------------------
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // validation
    if (!username || !password) {
      return res.json({ message: "All fields are required" });
    }

    // find user
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    // check password
    if (user.password !== password) {
      return res.json({ message: "Wrong password" });
    }

    // success
    res.json({ message: "Login successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// ------------------- OPTIONAL: GET USERS (for debugging) -------------------
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});


module.exports = router;