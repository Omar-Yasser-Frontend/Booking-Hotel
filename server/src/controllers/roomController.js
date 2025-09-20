import RoomService from "../services/roomService.js";
import ResponseFormatter from "../core/ResponseFormatter.js";

const roomService = new RoomService();

export const getRooms = async (req, res) => {
  const filter = await roomService.roomsFilterQuery(req.query);

  ResponseFormatter.success(res, {
    resultLength: filter.length,
    rooms: filter,
  });
};

export const getRoomById = async (req, res) => {
  const room = await roomService.findById(req.params.id, "Room");

  ResponseFormatter.success(res, { room });
};

export const createRoom = async (req, res) => {
  const room = await roomService.create({
    ...req.body,
    userId: req.user._id,
  });

  ResponseFormatter.success(res, { room });
};

export const updateRoom = async (req, res) => {
  const updatedRoom = await roomService.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    "Room"
  );

  ResponseFormatter.success(res, { room: updatedRoom });
};

export const deleteRoom = async (req, res) => {
  await roomService.deleteOne(
    {
      _id: req.params.id,
      userId: req.user._id,
    },
    "Room"
  );

  ResponseFormatter.success(res, null, null, 204);
};

export const searchRoom = async (req, res) => {
  const filter = await roomService.searchRooms(req.query.search, req.query);

  ResponseFormatter.success(res, {
    resultLength: filter.length,
    rooms: filter,
  });
};
