import BaseService from "../core/base/baseService.js";
import RoomRepository from "../repositories/roomRepository.js";

class userService extends BaseService {
  constructor() {
    super(new RoomRepository());
  }
}

export default userService;
