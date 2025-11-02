import express from "express";
import * as paymentController from "../controllers/paymentController.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import validate from "../middlewares/validationMiddleware.js";
import * as reservationSchemas from "../validation/reservationSchema.js";

const router = express.Router();

router.use(protectedRoutes);

router.post(
  "/intent",
  validate(reservationSchemas.reservationSchema),
  paymentController.createPaymentIntent
);

router.get("/intent/:intentId", paymentController.paymentReceipte);

export default router;
