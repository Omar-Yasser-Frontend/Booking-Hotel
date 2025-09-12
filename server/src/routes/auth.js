const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validate = require("../middlewares/validationMiddleware");
const authSchemas = require("../validation/authSchemas");

router.post("/signup", validate(authSchemas.createUser), authController.signup);

router.post("/login", validate(authSchemas.login), authController.login);

router.post("/confirmation", authController.confirmUser);

module.exports = router;
