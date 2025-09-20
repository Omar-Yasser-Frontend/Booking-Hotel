import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Types.ObjectId,
    ref: "room",
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
    index: true,
  },
  intentId: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  nightsCount: { type: Number, required: true },
  extras: { type: [{ name: String, price: Number, _id: false }] },
  status: {
    type: String,
    enum: ["paid", "canceled", "check-in", "check-out"],
    default: "paid",
  },
});

const Reservation = mongoose.model("reservation", reservationSchema);

export default Reservation;
