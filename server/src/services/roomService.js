import BaseService from "../core/base/baseService.js";
import RoomRepository from "../repositories/roomRepository.js";
import APIFeature from "../utils/apiFeatures.js";

class RoomService extends BaseService {
  constructor() {
    super(new RoomRepository());
  }

  async roomsFilterQuery(queryString) {
    const [rooms, roomsCount] = await Promise.all([
      await new APIFeature(this.repo.find(), queryString)
        .filter()
        .limitFields()
        .paginate()
        .sort(),
      await new APIFeature(this.repo.find(), queryString)
        .filter()
        .countDocuments(),
    ]);

    return { rooms, roomsCount };
  }

  async searchRooms(search, queryString) {
    const result = await new APIFeature(
      this.repo.find({
        $or: [
          { name: { $regex: search } },
          { description: { $regex: search } },
        ],
      }),
      queryString
    ).paginate();

    return result;
  }
}

export default RoomService;
