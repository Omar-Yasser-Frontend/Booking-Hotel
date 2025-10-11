import express from "express";
import * as userController from "../controllers/userController.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import multer from "multer";
import { updateMe } from "../validation/authSchemas.js";
import imageSanitizeAndTypeValidation from "../middlewares/imageSanitizeAndTypeValidation.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";
import optionalProtectedRoute from "../middlewares/optionalProtectedRoute.js";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: "2mb" },
});

const router = express.Router();

router.get("/me", optionalProtectedRoute, userController.getMe);

router.use(protectedRoutes);

router.put("/me", validationMiddleware(updateMe), userController.updateMe);

router.post(
  "/me/image",
  upload.single("profileImage"),
  imageSanitizeAndTypeValidation,
  userController.UploadMeImage
);

router.delete("/me", userController.deleteMe);

export default router;
