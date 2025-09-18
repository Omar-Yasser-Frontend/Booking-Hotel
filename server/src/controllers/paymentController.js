const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const RoomService = require("../services/roomService");
const ResponseFormatter = require("../core/ResponseFormatter");
const AppError = require("../core/AppError");
const { differenceInDays } = require("date-fns");
const ReservationService = require("../services/reservationService");

const roomService = new RoomService();
const reservationService = new ReservationService();
exports.createPaymentIntent = async (req, res) => {
  const { roomId, checkOut, checkIn } = req.body;
  if (
    await reservationService.checkReservationAvailability(
      roomId,
      checkIn,
      checkOut
    )
  )
    throw new AppError(
      "Room Alreadey Reserved in this date, please choose another date",
      403
    );

  const room = await roomService.findById(req.body.roomId);
  room._id = room._id.toString();
  const map = new Map();

  room.extras.forEach((extra) => map.set(extra.name, extra.price));

  const extras = req.body.extras.map((extra) => {
    const price = map.get(extra);
    if (!price) throw new AppError("Extra service not found", 404);
    return { name: extra, price };
  });

  const nightsCount = differenceInDays(req.body.checkOut, req.body.checkIn);
  const totalPrice =
    room.pricePerNight * nightsCount +
    extras.reduce((acc, cur) => acc + cur.price, 0);

  const metadata = {
    ...req.body,
    userId: req.user._id.toString(),
    totalPrice,
    nightsCount,
    extras: JSON.stringify(extras),
  };

  const intent = await stripe.paymentIntents.create({
    amount: totalPrice * 100,
    currency: "usd",
    metadata,
  });

  console.log(metadata);

  ResponseFormatter.success(res, { client_secret: intent.client_secret });
};
