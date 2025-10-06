import mongoose from "mongoose";
import BaseRepository from "../core/base/baseRepository.js";
import Reviews from "../models/reviews.js";

class ReviewsRepository extends BaseRepository {
  constructor() {
    super(Reviews);
  }
  getAvgReviews(roomId) {
    return this.model.aggregate([
      {
        $match: { roomId: new mongoose.Types.ObjectId(roomId) },
      },
      {
        $group: {
          _id: "$roomId",
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ]);
  }
}

export default ReviewsRepository;
