const express = require("express");
const paymentController = require("../controllers/paymentController");
const protectedRoutes = require("../middlewares/protectedRoutes");
const router = express.Router();
const validate = require("../middlewares/validationMiddleware");
const reservationSchemas = require("../validation/resesrcationSchema");

router.use(protectedRoutes);

router.post(
  "/intent",
  validate(reservationSchemas.reservationSchema),
  paymentController.createPaymentIntent
);

module.exports = router;
