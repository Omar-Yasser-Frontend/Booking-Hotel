jest.mock("jsonwebtoken", () => ({
  verify: () => ({
    user: { userId: "this is test id" },
  }),
}));

require("dotenv").config();
const request = require("supertest");
const app = require("../../src/app");
const { default: mongoose } = require("mongoose");
const Room = require("../../src/models/room");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});
afterAll(async () => {
  const result = await Room.deleteOne({ name: "testing rooms" });
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
  capacity: {
    guests: 6,
    rooms: 6,
  },
  pricePerNight: 250,
  extras: ["test"],
  location: {
    country: "Egypt",
    city: "El Mansoura",
    address: "this is address",
  },
  rating: 0,
  reviewsCount: 0,
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

  it("should throw duplicate error message", async () => {
    const res = await request(app)
      .post("/api/v1/room")
      .send(testData)
      .set("Cookie", "refreshToken=fakeToken;")
      .set("authorization", "Bearer TestToken");

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      "Duplicate Fields Value: testing rooms. Please use another value"
    );
  });

  it("should throw duplicate error message", async () => {
    const res = await request(app)
      .post("/api/v1/room")
      .send({ ...testData, name: undefined })
      .set("Cookie", "refreshToken=fakeToken;")
      .set("authorization", "Bearer TestToken");

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Malformed Inputs");
  });
});
