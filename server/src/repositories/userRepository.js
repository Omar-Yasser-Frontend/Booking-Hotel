import BaseRepository from "../core/base/baseRepository.js";
import Room from "../models/room.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(Room);
  }
}

export default UserRepository;
