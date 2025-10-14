import express from "express";
import * as wishlistController from "../controllers/wishlistController.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import validation from "../middlewares/validationMiddleware.js";
import * as wishlistSchemas from "../validation/wishlistSchemas.js";

const router = express.Router();

router.use(protectedRoutes);

router.get("/", wishlistController.getWishlists);

router.get("/:roomId", wishlistController.getWishlistById);

router.post(
  "/",
  validation(wishlistSchemas.wishlist),
  wishlistController.addWishlist
);

router.delete("/:id", wishlistController.removeWishlist);

export default router;
