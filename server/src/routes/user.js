import express from "express";
import * as userController from "../controllers/userController.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import multer from "multer";
import imageSanitizeAndTypeValidation from "../middlewares/imageSanitizeAndTypeValidation.js";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: "2mb" },
});

const router = express.Router();

router.use(protectedRoutes);

router.get("/me", userController.getMe);

router.post(
  "/me/image",
  upload.single("profileImage"),
  imageSanitizeAndTypeValidation,
  userController.UploadMeImage
);

router.delete("/me", userController.deleteMe);

export default router;
