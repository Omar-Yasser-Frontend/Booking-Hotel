jest.mock("jsonwebtoken", () => ({
  verify: () => ({
    user: { userId: "this is test id" },
  }),
}));

const Room = require("../../src/models/room");

require("dotenv").config();
const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
  jest.restoreAllMocks();
});

describe("Deleting Rooms", () => {
  it("Should not authorize/find room with this data", async () => {
    const res = await request(app)
      .put("/api/v1/room/606fef600398ff606fef6003")
      .send({ name: "this is test", description: "this will be mocked" })
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(404);
    expect(res.body.status).toBe("fail");
    expect(res.body.message).toBe("Can't update Room, Room Not Found");
  });

  it("Should authorize/find and remove room", async () => {
    const data = { name: "this is test", description: "this will be mocked" };
    jest.spyOn(Room, "findOneAndUpdate").mockResolvedValue(data);
    const res = await request(app)
      .put("/api/v1/room/606fef600398ff606fef6003")
      .send(data)
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data.room).toEqual(data);
  });
});
