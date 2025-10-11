import BaseService from "../core/base/baseService.js";
import ReviewsRepository from "../repositories/ReviewsRepository.js";
import APIFeature from "../utils/apiFeatures.js";

class ReviewsService extends BaseService {
  constructor() {
    super(new ReviewsRepository());
  }

  async getReveiwsPaginate(filter, queryString) {
    const reviews = await new APIFeature(
      this.repo.find(filter, "Review").populate("userId", "username image"),
      { ...queryString }
    ).paginate();

    return reviews;
  }

  async getReviewsAvg(roomId) {
    const [reviewsAvg] = await this.repo.getAvgReviews(roomId);

    return reviewsAvg;
  }
}

export default ReviewsService;
