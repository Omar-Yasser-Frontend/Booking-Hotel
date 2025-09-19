import ResponseFormatter from "../core/ResponseFormatter.js";
import WishlistService from "../services/wishlistService.js";

const wishlistService = new WishlistService();

export const getWishlists = async (req, res) => {
  const wishlists = await wishlistService.findAndPopulateRooms(req.user._id);

  ResponseFormatter.success(res, { wishlists }, null, 201);
};

export const addWishlist = async (req, res) => {
  const wishlist = await wishlistService.create({
    roomId: req.body.roomId,
    userId: req.user._id,
  });

  ResponseFormatter.success(res, { wishlist }, null, 201);
};

export const removeWishlist = async (req, res) => {
  await wishlistService.delete({
    _id: req.params.id,
    userId: req.user._id,
  });

  ResponseFormatter.success(res, null, null, 204);
};
