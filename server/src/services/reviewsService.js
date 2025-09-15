const BaseService = require("../core/base/baseService");
const ReviewsRepository = require("../repositories/ReviewsRepository");
const APIFeature = require("../utils/apiFeatures");

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

module.exports = ReviewsService;
