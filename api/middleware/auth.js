const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const requireAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(" ")[1];
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findOne({ _id }).select("_id");

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "fail",
      message: "Please authenticate",
    });
  }
};

module.exports = { requireAuth };