import ResponseFormatter from "../core/ResponseFormatter.js";
import ReviewsService from "../services/reviewsService.js";

const reviewsService = new ReviewsService();

export const getReviews = async (req, res) => {
  const page = (req.query.page = +req.query.page || 1);
  const limit = 5;
  const reviews = await reviewsService.getReveiwsPaginate(
    { roomId: req.params.roomId },
    {
      ...req.query,
      limit: limit + 1,
    }
  );
  let nextPage = null;

  if (reviews.length > limit) {
    reviews.shift();
    nextPage = page + 1;
  }

  ResponseFormatter.success(
    res,
    {
      reviews,
      resultLength: reviews.length,
      nextPage,
    },
    null,
    200
  );
};

export const getReviewsAvg = async (req, res) => {
  const reviewsAvg = await reviewsService.getReviewsAvg(req.params.roomId);

  ResponseFormatter.success(
    res,
    {
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

export const getMyReviews = async (req, res) => {
  const page = (req.query.page = +req.query.page || 1);
  const limit = 5;
  const reviews = await reviewsService.getReveiwsPaginate(
    { userId: req.user._id },
    {
      ...req.query,
      limit: limit + 1,
    }
  );

  let nextPage = null;

  if (reviews.length > limit) {
    reviews.shift();
    nextPage = page + 1;
  }

  ResponseFormatter.success(
    res,
    {
      reviews,
      resultLength: reviews.length,
      nextPage,
    },
    null,
    200
  );
};
