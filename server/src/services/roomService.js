const BaseService = require("../core/base/baseService");
const RoomRepository = require("../repositories/roomRepository");
const APIFeature = require("../utils/apiFeatures");

class RoomService extends BaseService {
  constructor() {
    super(new RoomRepository());
  }

  async roomsFilterQuery(queryString) {
    const result = await new APIFeature(this.repo.find(), queryString)
      .filter()
      .limitFields()
      .paginate()
      .sort();

    return result;
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

module.exports = RoomService;
