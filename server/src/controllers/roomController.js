const FeatureAPI = require("../utils/apiFeatures");
const RoomService = require("../services/roomService");
const ResponseFormatter = require("../core/ResponseFormatter");
const Room = require("../models/room");

exports.getRooms = async (req, res) => {
  const filter = await new FeatureAPI(Room, req.query)
    .filter()
    .sort()
    .paginate()
    .limitFields();

  ResponseFormatter.success(res, {
    resultLength: filter.length,
    rooms: filter,
  });
};

exports.getRoomById = async (req, res) => {
  const room = await new RoomService().findById(req.params.id, "Room");

  ResponseFormatter.success(res, room);
};

exports.createRoom = async (req, res) => {
  const room = await new RoomService().create(req.body);

  ResponseFormatter.success(res, room);
};

exports.updateRoom = async (req, res) => {
  const updatedRoom = await new RoomService().updateOne(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    "Room"
  );

  ResponseFormatter.success(res, updatedRoom);
};

exports.deleteRoom = async (req, res) => {
  await new RoomService().deleteOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  ResponseFormatter.success(res, null, null, 204);
};
