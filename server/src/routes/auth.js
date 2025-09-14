const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validate = require("../middlewares/validationMiddleware");
const authSchemas = require("../validation/authSchemas");
const protectedRoutes = require("../middlewares/protectedRoutes");

router.post("/signup", validate(authSchemas.createUser), authController.signup);

router.post("/login", validate(authSchemas.login), authController.login);

router.post(
  "/confirmation",
  validate(authSchemas.accountVerify),
  authController.confirmUser
);

router.post(
  "/change-password",
  validate(authSchemas.changePassword),
  protectedRoutes,
  authController.changePassword
);

router.post(
  "/forgot-password",
  validate(authSchemas.forgotPassword),
  authController.forgotPassword
);

router.post(
  "/reset-password",
  validate(authSchemas.resetPassword),
  authController.resetPassword
);

module.exports = router;
