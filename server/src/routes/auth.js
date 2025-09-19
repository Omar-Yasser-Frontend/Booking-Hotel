import express from "express";
import * as authController from "../controllers/authController.js";
import validate from "../middlewares/validationMiddleware.js";
import * as authSchemas from "../validation/authSchemas.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";

const router = express.Router();

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

router.post("/google", authController.googleAuth);

export default router;
