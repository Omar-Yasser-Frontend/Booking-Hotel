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
        $facet: {
          perRating: [
            {
              $group: {
                _id: "$rating",
                count: { $sum: 1 },
              },
            },
            { $sort: { _id: -1 } },
          ],

          overall: [
            {
              $group: {
                _id: null,
                avgRating: { $avg: "$rating" },
                total: { $sum: 1 },
              },
            },
          ],
        },
      },
      {
        $project: {
          perRating: 1,
          avgRating: { $arrayElemAt: ["$overall.avgRating", 0] },
          totalReviews: { $arrayElemAt: ["$overall.total", 0] },
        },
      },
    ]);
  }
}

export default ReviewsRepository;
