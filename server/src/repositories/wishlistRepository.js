const BaseRepository = require("../core/base/baseRepository");
const Wishlist = require("../models/wishlists");

class WishlistRepository extends BaseRepository {
  constructor() {
    super(Wishlist);
  }
}

module.exports = WishlistRepository;
