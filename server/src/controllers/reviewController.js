import ResponseFormatter from "../core/ResponseFormatter.js";
import ReviewsService from "../services/reviewsService.js";

const reviewsService = new ReviewsService();

export const getReviews = async (req, res) => {
  req.query.page = +req.query.page;
  const reviews = await reviewsService.getReveiwsPaginate(req.params.roomId, {
    ...req.query,
    limit: 5,
  });

  ResponseFormatter.success(
    res,
    {
      reviews,
      page: req.query.page || 1,
      resultLength: reviews.length,
    },
    null,
    200
  );
};

export const getReviewsAvg = async (req, res) => {
  req.query.page = +req.query.page;
  const reviewsAvg = await reviewsService.getReviewsAvg(req.params.roomId);

  ResponseFormatter.success(
    res,
    {
      page: req.query.page || 1,
      reviewsAvg,
    },
    null,
    200
  );
};

export const updateReview = async (req, res) => {
  const review = await reviewsService.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    "Review"
  );

  ResponseFormatter.success(res, { review }, null, 200);
};

export const deleteReview = async (req, res) => {
  await reviewsService.deleteOne(
    { _id: req.params.id, userId: req.user._id },
    "Review"
  );

  ResponseFormatter.success(res, null, null, 204);
};

export const createReview = async (req, res) => {
  const review = await reviewsService.create({
    ...req.body,
    userId: req.user._id,
  });

  ResponseFormatter.success(res, { review }, null, 200);
};
