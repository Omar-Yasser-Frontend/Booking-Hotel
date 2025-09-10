const BaseService = require("../core/base/baseService");
const RoomRepository = require("../repositories/roomRepository");

class RoomService extends BaseService {
  constructor() {
    super(new RoomRepository());
  }
}

module.exports = RoomService;
