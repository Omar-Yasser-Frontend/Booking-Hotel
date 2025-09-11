const express = require("express");

const roomController = require("../controllers/roomController");
const protectedRoutes = require("../middlewares/protectedRoutes");
const validate = require("../middlewares/validationMiddleware");
const { roomSchema } = require("../validation/roomsSchemas");

const router = express.Router();

router.get("/", roomController.getRooms);

router.get("/:id", roomController.getRoomById);

router.use(protectedRoutes);

router.post("/", validate(roomSchema), roomController.createRoom);

router.put("/:id", validate(roomSchema.partial()), roomController.updateRoom);

router.delete("/:id", roomController.deleteRoom);

module.exports = router;
