import express from "express";
import * as authController from "../controllers/authController.js";
import validate from "../middlewares/validationMiddleware.js";
import * as authSchemas from "../validation/authSchemas.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import ratelimit from "express-rate-limit";

const router = express.Router();

router.post(
  "/forgot-password",
  ratelimit({
    windowMs: 10 * 60 * 1000,
    limit: 1,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
    message: {
      status: "fail",
      message: "Too many request, please try again after 10m",
    },
  }),
  validate(authSchemas.forgotPassword),
  authController.forgotPassword
);

router.use(
  ratelimit({
    windowMs: 60 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
    message: {
      status: "fail",
      message: "Too many request, please try again after 10m",
    },
  })
);

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
  "/reset-password",
  validate(authSchemas.resetPassword),
  authController.resetPassword
);

router.post("/google", authController.googleAuth);

export default router;
