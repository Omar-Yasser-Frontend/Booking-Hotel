jest.mock("jsonwebtoken", () => ({
  verify: () => ({
    user: { userId: "this is test id" },
  }),
}));

const Room = require("../../src/models/room");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
  jest.restoreAllMocks();
});

require("dotenv").config();
const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");

describe("Deleting Rooms", () => {
  it("Should not authorize/find room with this data", async () => {
    const res = await request(app)
      .delete("/api/v1/room/606fef600398ff606fef6003")
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(404);
    expect(res.body.status).toBe("fail");
    expect(res.body.message).toBe("Can't delete Room, Room Not Found");
  });

  it("Should authorize/find and remove room", async () => {
    jest.spyOn(Room, "deleteOne").mockResolvedValue({ deletedCount: 1 });
    const res = await request(app)
      .delete("/api/v1/room/606fef600398ff606fef6003")
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(204);
  });
});
