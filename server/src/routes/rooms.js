import express from "express";

import * as roomController from "../controllers/roomController.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import validate from "../middlewares/validationMiddleware.js";
import { roomSchema } from "../validation/roomsSchemas.js";
import restrictTo from "../middlewares/restrictTo.js";

const router = express.Router();

router.get("/", roomController.getRooms);

router.get("/search", roomController.searchRoom);

router.get("/:id", roomController.getRoomById);

router.use(protectedRoutes, restrictTo(["admin"]));

router.post("/", validate(roomSchema), roomController.createRoom);

router.put("/:id", validate(roomSchema.partial()), roomController.updateRoom);

router.delete("/:id", roomController.deleteRoom);

export default router;
