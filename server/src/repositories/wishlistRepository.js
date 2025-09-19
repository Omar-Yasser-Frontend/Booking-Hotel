import BaseRepository from "../core/base/baseRepository.js";
import Wishlist from "../models/wishlists.js";

class WishlistRepository extends BaseRepository {
  constructor() {
    super(Wishlist);
  }
}

export default WishlistRepository;
