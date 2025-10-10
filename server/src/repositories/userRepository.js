import BaseRepository from "../core/base/baseRepository.js";
import User from "../models/user.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
}

export default UserRepository;
