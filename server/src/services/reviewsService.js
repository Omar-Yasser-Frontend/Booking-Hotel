import BaseService from "../core/base/baseService.js";
import ReviewsRepository from "../repositories/ReviewsRepository.js";
import APIFeature from "../utils/apiFeatures.js";

class ReviewsService extends BaseService {
  constructor() {
    super(new ReviewsRepository());
  }

  async getReveiwsPaginate(roomId, queryString) {
    const reviews = await new APIFeature(
      this.repo.find({ roomId }, "Review").populate("userId", "username image"),
      { ...queryString }
    ).paginate();

    return reviews;
  }
}

export default ReviewsService;
