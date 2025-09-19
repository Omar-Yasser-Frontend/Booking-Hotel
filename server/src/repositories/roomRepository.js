import BaseRepository from "../core/base/baseRepository.js";
import Room from "../models/room.js";

class RoomRepository extends BaseRepository {
  constructor() {
    super(Room);
  }
}

export default RoomRepository;
