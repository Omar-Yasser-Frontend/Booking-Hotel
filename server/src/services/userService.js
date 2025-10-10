import BaseService from "../core/base/baseService.js";
import UserRepository from "../repositories/userRepository.js";

class userService extends BaseService {
  constructor() {
    super(new UserRepository());
  }
}

export default userService;
