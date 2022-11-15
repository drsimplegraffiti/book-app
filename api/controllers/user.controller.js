const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields." });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ name, email, password });
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = await user.generateAuthToken();
    res.status(200).json({ name: user.name, email, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.userLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

// user profile
exports.userProfile = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById({ _id });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
