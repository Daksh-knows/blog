const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  logout,
} = require("../controllers/authController");
const {
  registerValidation,
  loginValidation,
  validate,
} = require("../utils/validators");
const { protect } = require("../middleware/auth");

router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);

module.exports = router;
