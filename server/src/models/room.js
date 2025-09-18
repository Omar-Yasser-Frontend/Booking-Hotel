const { default: mongoose } = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: [10, "Name must be 10 characters at least"],
      maxLength: [100, "Name can't exceed 1000 character"],
    },
    description: {
      type: String,
      required: true,
      unique: true,
      minLength: [10, "Description must be 10 characters at least"],
      maxLength: [1000, "Description can't exceed 1000 character"],
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
    capacity: {
      guests: { type: Number, required: true },
      rooms: { type: Number, required: true },
    },
    extras: [{ name: String, price: Number }],
    pricePerNight: {
      type: Number,
      min: 10,
      required: true,
    },
    location: {
      country: { type: String, required: true, default: "Egypt" },
      city: { type: String, required: true },
      address: { type: String, required: true },
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Rating can't be less than 0"],
      max: [5, "Rating can't exceed number 5"],
    },
    reviewsCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("room", roomSchema);

module.exports = Room;
