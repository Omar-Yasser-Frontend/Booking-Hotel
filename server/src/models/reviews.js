const mongoose = require("mongoose");

const reveiwsSchema = new mongoose.Schema(
  {
    roomId: { type: mongoose.Types.ObjectId, ref: "room", required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String, maxLength: 1000 },
  },
  { timestamps: true }
);

const Reviews = mongoose.model("reviews", reveiwsSchema);

module.exports = Reviews;
