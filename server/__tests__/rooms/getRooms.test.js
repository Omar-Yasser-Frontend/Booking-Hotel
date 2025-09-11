require("dotenv").config();
const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
  jest.restoreAllMocks();
});

describe("Rooms Filter", () => {
  it("should return 10 rooms", async () => {
    const res = await request(app).get("/api/v1/room");

    expect(res.body.data.resultLength).toBe(10);
  });

  it("shoud get cairo rooms less than 250 pound per night", async () => {
    const { body } = await request(app).get(
      "/api/v1/room?city=Cairo&pricePerNight[lt]=250"
    );
    const rooms = body.data.rooms;

    rooms.forEach((room) => {
      expect(room.location.city).toBe("Cairo");
      expect(room.pricePerNight).toBeLessThan(250);
    });
  });

  it("shoud have capacity more than 6 guests", async () => {
    const { body } = await request(app).get("/api/v1/room?guests[gt]=6");
    const rooms = body.data.rooms;

    rooms.forEach((room) => {
      expect(room.capacity.guests).toBeGreaterThan(6);
    });
  });

  it("should have rating of 4 or higher", async () => {
    const { body } = await request(app).get("/api/v1/room?rating[gt]=4");
    const rooms = body.data.rooms;

    rooms.forEach((room) => {
      expect(room.rating).toBeGreaterThan(4);
    });
  });

  it("should not return data", async () => {
    const { body } = await request(app).get("/api/v1/room?city=5");
    const resultLength = body.data.resultLength;

    expect(resultLength).toBe(0);
  });
});

describe("Rooms Paginate", () => {
  it("Should return 0 result", async () => {
    const { body } = await request(app).get("/api/v1/room?limit=50&page=2");
    const resultLength = body.data.resultLength;

    expect(resultLength).toBe(0);
  });

  it("Should return 20 result", async () => {
    const { body } = await request(app).get("/api/v1/room?limit=20");
    const resultLength = body.data.resultLength;

    expect(resultLength).toBe(20);
  });

  it("Should return 20 result", async () => {
    const { body: body1 } = await request(app).get(
      "/api/v1/room?page=1&limit=20"
    );
    const { body: body2 } = await request(app).get(
      "/api/v1/room?page=2&limit=20"
    );

    expect(body1).not.toEqual(body2);
  });
});

describe("Rooms sort", () => {
  it("Should return rooms sorted by less price", async () => {
    const { body } = await request(app).get("/api/v1/room?sort=pricePerNight");
    const prices = body.data.rooms.map((room) => room.pricePerNight);
    const handleComparison = [];

    prices.forEach((roomPrice) => {
      handleComparison.push(roomPrice);
      expect(Math.max(...handleComparison, roomPrice)).toBe(roomPrice);
    });
  });

  it("Should return rooms sorted by high guests", async () => {
    const { body } = await request(app).get(
      "/api/v1/room?sort=-capacity.guests"
    );
    const guests = body.data.rooms.map((room) => room.capacity.guests);
    const handleComparison = [];

    guests.forEach((guest) => {
      handleComparison.push(guest);
      expect(Math.min(...handleComparison, guest)).toBe(guest);
    });
  });
});

describe("Rooms Field Select", () => {
  it("Should not found name, pricePerNight and location field", async () => {
    const { body } = await request(app).get(
      "/api/v1/room?fields=-name,-pricePerNight,-location"
    );

    body.data.rooms.forEach((room) => {
      expect(room).not.toHaveProperty("name");
      expect(room).not.toHaveProperty("pricePerNight");
      expect(room).not.toHaveProperty("location");
    });
  });
});
