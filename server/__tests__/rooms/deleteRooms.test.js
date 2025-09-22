import "dotenv/config.js";
import request from "supertest";
import { jest } from "@jest/globals";

// require("dotenv").config();
// const request = require("supertest");
// const app = require("../../src/app");
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

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
