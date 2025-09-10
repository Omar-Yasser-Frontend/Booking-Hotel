const express = require("express");
const roomController = require("../controllers/roomController");
const protectedRoutes = require("../middlewares/protectedRoutes");

const router = express.Router();

router.get("/", roomController.getRooms);

router.get("/:id", roomController.getRoomById);

router.use(protectedRoutes);

router.post("/", roomController.createRoom);

router.put("/:id", roomController.updateRoom);

router.delete("/:id", roomController.deleteRoom);

module.exports = router;
