import User from "../models/user.js";
import BaseRepository from "../core/base/baseRepository.js";

class AuthRepository extends BaseRepository {
  constructor() {
    super(User);
  }
}

export default AuthRepository;
