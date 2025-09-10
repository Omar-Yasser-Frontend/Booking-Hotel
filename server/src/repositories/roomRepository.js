const BaseRepository = require("../core/base/baseRepository");
const Room = require("../models/room");

class RoomRepository extends BaseRepository {
  constructor() {
    super(Room);
  }
}

module.exports = RoomRepository;
