import BaseService from "../core/base/baseService.js";
import WishlistRepository from "../repositories/wishlistRepository.js";

class WishlistService extends BaseService {
  constructor() {
    super(new WishlistRepository());
  }

  async findAndPopulateRooms(userId) {
    const result = await this.repo
      .find({ userId })
      .populate("roomId", "name thumbnail");

    return result;
  }
}

export default WishlistService;
