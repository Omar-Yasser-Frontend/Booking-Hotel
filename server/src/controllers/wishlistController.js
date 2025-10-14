import ResponseFormatter from "../core/ResponseFormatter.js";
import WishlistService from "../services/wishlistService.js";

const wishlistService = new WishlistService();

export const getWishlists = async (req, res) => {
  const wishlists = await wishlistService.findAndPopulateRooms(req.user._id);

  ResponseFormatter.success(res, { wishlists }, null, 200);
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

export const getWishlistById = async (req, res) => {
  const { _id } = req.user;
  const { roomId } = req.params;

  const wishlist = await wishlistService.findOne(
    { roomId, userId: _id },
    "Wishlist",
    true
  );

  ResponseFormatter.success(res, wishlist ? { wishlist } : null);
};
