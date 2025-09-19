import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  roomId: { type: mongoose.Types.ObjectId, ref: "room", required: true },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
    index: true,
  },
});

wishlistSchema.index({ roomId: true, userId: true }, { unique: true });

const Wishlist = mongoose.model("wishlist", wishlistSchema);

export default Wishlist;
