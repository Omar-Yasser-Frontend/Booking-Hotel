import AppError from "../core/AppError.js";
import BaseService from "../core/base/baseService.js";
import ReservationRepository from "../repositories/ReservationRepository.js";

class ReservationService extends BaseService {
  constructor() {
    super(new ReservationRepository());
  }

  async checkReservationAvailability(roomId, checkIn, checkOut) {
    const reservations = await this.repo
      .find({
        roomId,
        $or: [
          // 1. startDate الجديد يقع بين startDate و endDate القديم
          {
            checkIn: { $lte: checkIn },
            checkOut: { $gte: checkIn },
          },
          // 2. endDate الجديد يقع بين startDate و endDate القديم
          {
            checkIn: { $lte: checkOut },
            checkOut: { $gte: checkOut },
          },
          // 3. الحجز الجديد يغطي الحجز القديم كله
          {
            checkIn: { $gte: checkIn },
            checkOut: { $lte: checkOut },
          },
        ],
      })
      .lean();

    return reservations.length;
  }

  async createReservation(data) {
    const { roomId, checkIn, checkOut } = data;
    const result = await this.checkReservationAvailability(
      roomId,
      checkIn,
      checkOut
    );
    console.log(result);
    if (result)
      throw new AppError(
        "Room is reserved in this date, please choose another Date",
        403
      );

    const newReservation = await this.repo.create(data);

    return newReservation;
  }

  async cancelReservation(_id, userId) {
    const reservation = await this.repo.findOne({ _id, userId });

    if (!reservation) throw new AppError("Reservation not found", 404);

    if (["check-in", "check-out"].includes(reservation.status))
      throw new AppError(
        `Can't cancel this reservation while in ${reservation.status} status`,
        403
      );

    reservation.status = "canceled";
    return await reservation.save();
  }
}

export default ReservationService;
