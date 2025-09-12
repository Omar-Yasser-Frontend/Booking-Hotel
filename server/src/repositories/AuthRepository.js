const User = require("../models/user");
const BaseRepository = require("../core/base/baseRepository");

class AuthRepository extends BaseRepository {
  constructor() {
    super(User);
  }
}

module.exports = AuthRepository;
