import "dotenv/config.js";
import request from "supertest";
import { jest } from "@jest/globals";

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    verify: () => ({
      userId: "68ccab3bb980644d658940d4",
      email: "craft14716@gmail.com",
      iat: 1758244380,
      exp: 1766020380,
    }),
  },
}));

const mongoose = (await import("mongoose")).default;
const Room = (await import("../../src/models/room.js")).default;
const app = (await import("../../src/app.js")).default;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
  jest.restoreAllMocks();
});

describe("Updating Rooms", () => {
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
