import BaseRepository from "../core/base/baseRepository.js";
import Reservation from "../models/reservations.js";

class ReservationRepository extends BaseRepository {
  constructor() {
    super(Reservation);
  }
}

export default ReservationRepository;
