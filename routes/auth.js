const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const validate = require("../middleware/validate");
const { loginSchema } = require("../utils/validation/authValidation");

router.post("/login", validate(loginSchema), authController.login);

module.exports = router;
