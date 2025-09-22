import "dotenv/config.js";
import { jest } from "@jest/globals";
import request from "supertest";

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
  await Room.deleteOne({ name: "testing rooms" });
  await mongoose.disconnect();
  jest.restoreAllMocks();
});

const testData = {
  name: "testing rooms",
  description: "this is test description",
  thumbnail: "https://example.com",
  images: [
    "https://example.com",
    "https://example.com",
    "https://example.com",
    "https://example.com",
  ],
  isAvailable: true,
  capacity: { guests: 6, rooms: 6 },
  pricePerNight: 250,
  extras: [{ name: "Test name", price: 5 }],
  location: {
    country: "Egypt",
    city: "El Mansoura",
    address: "this is address",
  },
  rating: 5,
  reviewsCount: 1,
};

describe("test creating ", () => {
  it("should create new Room", async () => {
    const res = await request(app)
      .post("/api/v1/room")
      .send(testData)
      .set("Cookie", "refreshToken=fakeToken;")
      .set("authorization", "Bearer TestToken");

    expect(res.status).toBe(200);
    expect(res.body.data.room).toHaveProperty("_id");
  });

  it("should throw duplicate error", async () => {
    const res = await request(app)
      .post("/api/v1/room")
      .send(testData)
      .set("Cookie", "refreshToken=fakeToken;")
      .set("authorization", "Bearer TestToken");

    expect(res.status).toBe(403);
    expect(res.body.message).toBe(
      "Duplicate Fields Value: testing rooms. Please use another value"
    );
  });

  it("should throw malformed input message", async () => {
    const res = await request(app)
      .post("/api/v1/room")
      .send({ ...testData, name: 400 })
      .set("Cookie", "refreshToken=fakeToken;")
      .set("authorization", "Bearer TestToken");

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Malformed Inputs");
  });
});
