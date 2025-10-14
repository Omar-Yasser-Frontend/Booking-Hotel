import ResponseFormatter from "../core/ResponseFormatter.js";
import ReservationService from "../services/reservationService.js";

const reservationService = new ReservationService();
export const getReservations = async (req, res) => {
  const userReservations = await reservationService.find(
    { userId: req.user._id },
    "Reservation",
    true
  );

  ResponseFormatter.success(res, { reservations: userReservations }, null, 200);
};

export const getReservedDates = async (req, res) => {
  const reservedDates = await reservationService.getReservedDates(
    req.params.roomId
  );
  const buildReservedDates = reservedDates.map(
    ({ _id, checkIn, checkOut }) => ({
      _id,
      from: checkIn,
      to: checkOut,
    })
  );

  ResponseFormatter.success(res, { dates: buildReservedDates });
};

export const cancelReservation = async (req, res) => {
  const reservation = await reservationService.cancelReservation(
    req.params.id,
    req.user._id
  );

  ResponseFormatter.success(res, { reservation });
};
