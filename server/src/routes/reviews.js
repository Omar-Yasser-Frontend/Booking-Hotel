const express = require("express");

const reviewsController = require("../controllers/reviewController");
const protectedRoutes = require("../middlewares/protectedRoutes");
const reviewValidation = require("../validation/reviewSchema");
const validation = require("../middlewares/validationMiddleware");

const router = express.Router();

router.get("/:roomId", reviewsController.getReviews);

router.use(protectedRoutes);

router.post(
  "/",
  validation(reviewValidation.review),
  reviewsController.createReview
);

router.put(
  "/:id",
  validation(reviewValidation.updateReview),
  reviewsController.updateReview
);

router.delete("/:id", reviewsController.deleteReview);

module.exports = router;
