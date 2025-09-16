const ResponseFormatter = require("../core/ResponseFormatter");
const WishlistService = require("../services/wishlistService");

const wishlistService = new WishlistService();

exports.getWishlists = async (req, res) => {
  const wishlists = await wishlistService.findAndPopulateRooms(req.user._id);

  ResponseFormatter.success(res, { wishlists }, null, 201);
};

exports.addWishlist = async (req, res) => {
  const wishlist = await wishlistService.create({
    roomId: req.body.roomId,
    userId: req.user._id,
  });

  ResponseFormatter.success(res, { wishlist }, null, 201);
};

exports.removeWishlist = async (req, res) => {
  await wishlistService.delete({
    _id: req.params.id,
    userId: req.user._id,
  });

  ResponseFormatter.success(res, null, null, 204);
};
