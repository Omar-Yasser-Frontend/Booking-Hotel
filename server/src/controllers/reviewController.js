const ResponseFormatter = require("../core/ResponseFormatter");
const ReviewsService = require("../services/reviewsService");

const reviewsService = new ReviewsService();

exports.getReviews = async (req, res) => {
  req.query.page = +req.query.page;
  const reviews = await reviewsService.getReveiwsPaginate(req.params.roomId, {
    ...req.query,
    limit: req.query.limit || 5,
  });

  ResponseFormatter.success(
    res,
    { reviews, page: req.query.page || 1, resultLength: reviews.length },
    null,
    200
  );
};

exports.updateReview = async (req, res) => {
  const review = await reviewsService.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    "Review"
  );

  ResponseFormatter.success(res, { review }, null, 200);
};

exports.deleteReview = async (req, res) => {
  await reviewsService.deleteOne(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    "Review"
  );

  ResponseFormatter.success(res, null, null, 204);
};

exports.createReview = async (req, res) => {
  const review = await reviewsService.create({
    ...req.body,
    userId: req.user._id,
  });

  ResponseFormatter.success(res, { review }, null, 200);
};
