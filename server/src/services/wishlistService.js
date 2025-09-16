const BaseService = require("../core/base/baseService");
const WishlistRepository = require("../repositories/wishlistRepository");

class WishlistService extends BaseService {
  constructor() {
    super(new WishlistRepository());
  }

  async findAndPopulateRooms(userId) {
    const result = await this.repo.find().populate("roomId", "name thumbnail");

    return result;
  }
}

module.exports = WishlistService;
