const express = require("express");
const userController = require("../controllers/userController");
const protectedRoutes = require("../middlewares/protectedRoutes");
const multer = require("multer");
const imageSanitizeAndTypeValidation = require("../middlewares/imageSanitizeAndTypeValidation");
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: "2mb" },
});

const router = express.Router();

router.use(protectedRoutes);

router.get("/", userController.getUser);

router.post(
  "/upload-profile-image",
  upload.single("profileImage"),
  imageSanitizeAndTypeValidation,
  userController.userUploadImage
);

router.delete("/delete-account", userController.deleteUser);

module.exports = router;
