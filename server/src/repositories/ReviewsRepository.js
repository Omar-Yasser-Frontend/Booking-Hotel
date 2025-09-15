const BaseRepository = require("../core/base/baseRepository");
const Reviews = require("../models/reviews");

class ReviewsRepository extends BaseRepository {
  constructor() {
    super(Reviews);
  }
}

module.exports = ReviewsRepository;
