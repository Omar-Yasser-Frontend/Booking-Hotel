import BaseService from "../core/base/baseService.js";
import ReviewsRepository from "../repositories/ReviewsRepository.js";
import APIFeature from "../utils/apiFeatures.js";

class ReviewsService extends BaseService {
  constructor() {
    super(new ReviewsRepository());
  }

  async getReveiwsPaginate(roomId, queryString) {
    const [[reviewsAvg], reviews] = await Promise.all([
      this.repo.getAvgReviews(roomId),
      new APIFeature(
        this.repo
          .find({ roomId }, "Review")
          .populate("userId", "username image"),
        { ...queryString }
      ).paginate(),
    ]);

    return { reviewsAvg, reviews };
  }
}

export default ReviewsService;
