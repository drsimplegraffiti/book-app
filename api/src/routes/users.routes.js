const express = require("express");

const router = express.Router();

const {
  userSignUp,
  userLogin,
  userLogout,
  userProfile,
} = require("../controllers/user.controller");
const { requireAuth } = require("../middleware/auth");

router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.get("/profile", requireAuth, userProfile);

module.exports = router;
