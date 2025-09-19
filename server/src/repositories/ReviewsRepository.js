import BaseRepository from "../core/base/baseRepository.js";
import Reviews from "../models/reviews.js";

class ReviewsRepository extends BaseRepository {
  constructor() {
    super(Reviews);
  }
}

export default ReviewsRepository;
