import express from "express";

import * as reviewsController from "../controllers/reviewController.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import * as reviewValidation from "../validation/reviewSchema.js";
import validation from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/:roomId", reviewsController.getReviews);

router.get("/avg/:roomId", reviewsController.getReviewsAvg);

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

export default router;
