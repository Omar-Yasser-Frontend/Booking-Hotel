const RoomService = require("../services/roomService");
const ResponseFormatter = require("../core/ResponseFormatter");

const roomService = new RoomService();

exports.getRooms = async (req, res) => {
  const filter = await roomService.roomsFilterQuery(req.query);

  ResponseFormatter.success(res, {
    resultLength: filter.length,
    rooms: filter,
  });
};

exports.getRoomById = async (req, res) => {
  const room = await roomService.findById(req.params.id, "Room");

  ResponseFormatter.success(res, { room });
};

exports.createRoom = async (req, res) => {
  console.log("Failed Here");
  const room = await roomService.create({
    ...req.data,
    userId: req.user.userId,
  });

  ResponseFormatter.success(res, { room });
};

exports.updateRoom = async (req, res) => {
  const updatedRoom = await roomService.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    "Room"
  );

  ResponseFormatter.success(res, { room: updatedRoom });
};

exports.deleteRoom = async (req, res) => {
  await roomService.deleteOne(
    {
      _id: req.params.id,
      userId: req.user.userId,
    },
    "Room"
  );

  ResponseFormatter.success(res, null, null, 204);
};
