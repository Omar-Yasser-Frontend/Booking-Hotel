const express = require("express");
const wishlistController = require("../controllers/wishlistController");
const protectedRoutes = require("../middlewares/protectedRoutes");
const validation = require("../middlewares/validationMiddleware");
const wishlistSchemas = require("../validation/wishlistSchemas");

const router = express.Router();

router.use(protectedRoutes);

router.get("/", wishlistController.getWishlists);

router.post(
  "/",
  validation(wishlistSchemas.wishlist),
  wishlistController.addWishlist
);

router.delete("/:id", wishlistController.removeWishlist);

module.exports = router;
