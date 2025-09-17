const BaseService = require("../core/base/baseService");
const RoomRepository = require("../repositories/roomRepository");

class userService extends BaseService {
  constructor() {
    super(new RoomRepository());
  }
}

module.exports = userService;
