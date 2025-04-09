const User = require("../../model/User");
const bcrypt = require("bcryptjs"); 
const generateToken = require("../utils/generateToken");


// Register a new user

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Create a new user and save to the database
    const user = await User.create({ name, email, password });

    // Send back a JWT token after successful registration
    res.status(201).json({ token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Login existing user

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user is not found or password doesn't match
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Send back a JWT token on successful login
    res.json({ token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
