import express from "express";
import * as reservationController from "../controllers/reservationController.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";

const router = express.Router();

router.use(protectedRoutes);

router.get("/", reservationController.getReservations);

router.get("/dates/:roomId", reservationController.getReservedDates);

router.delete("/:id", reservationController.cancelReservation);

export default router;
