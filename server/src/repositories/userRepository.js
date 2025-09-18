const BaseRepository = require("../core/base/baseRepository");
const Room = require("../models/room");

class UserRepository extends BaseRepository {
  constructor() {
    super(Room);
  }
}

module.exports = UserRepository;
