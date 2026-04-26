const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// Model
const User = mongoose.model("User", userSchema);

// SIGNUP (SAVE DATA)
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = new User({ email, password });
    await newUser.save();

    res.json({ message: "User saved successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Error saving user" });
  }
});

module.exports = router;