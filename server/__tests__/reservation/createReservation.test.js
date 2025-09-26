import "dotenv/config.js";
import request from "supertest";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  jest,
} from "@jest/globals";
import ReservationService from "../../src/services/reservationService.js";
import Reservation from "../../src/models/reservations.js";

const roomId = "68c9d7941916248385847bf9";
const reservationService = new ReservationService();

const user = {
  _id: "68ccab3bb980924d658940d4",
  username: "test name",
  email: "test@test.com",
  isActive: true,
  deactiveate: false,
  createdAt: new Date("2025-09-19T01:00:43.393Z"),
  updatedAt: new Date("2025-09-19T01:19:59.424Z"),
  passwordUpdatedAt: new Date("2025-09-19T01:12:50.371Z"),
  passwordChangeDate: () => false,
};

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    verify: () => ({
      userId: "68ccab3bb980924d658940d4",
      email: "test@test.com",
      iat: 1758244380,
      exp: 1766020380,
    }),
  },
}));

jest.unstable_mockModule("../../src/utils/getUserProtectedRoutes.js", () => ({
  default: jest.fn().mockResolvedValue(user),
}));

const app = (await import("../../src/app.js")).default;
const mongoose = (await import("mongoose")).default;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});
afterAll(async () => {
  await mongoose.disconnect();
});

afterEach(async () => {
  await Reservation.deleteMany({ userId: user._id, roomId });
});

describe("Testing create reservation's payment intent", () => {
  it("Should create payment intent and return client secret", async () => {
    const res = await request(app)
      .post("/api/v1/payment/intent")
      .send({
        roomId,
        checkIn: new Date("2025-09-26"),
        checkOut: new Date("2025-09-30"),
        extras: ["Camel Tours", "Traditional Breakfast"],
      })
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("client_secret");
  });

  it("Should throw extra service not found", async () => {
    const res = await request(app)
      .post("/api/v1/payment/intent")
      .send({
        roomId,
        checkIn: new Date("2025-09-26"),
        checkOut: new Date("2025-09-30"),
        extras: ["not exist extra"],
      })
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Extra service not found");
  });

  it("Should throw room already reserved", async () => {
    await reservationService.create({
      userId: user._id,
      roomId,
      intentId: "gkfsdlngdfsgsdf",
      checkIn: new Date("2025-09-28"),
      checkOut: new Date("2025-09-27"),
      extras: [],
      totalPrice: 0,
      nightsCount: 0,
    });

    const res = await request(app)
      .post("/api/v1/payment/intent")
      .send({
        roomId,
        checkIn: new Date("2025-09-26"),
        checkOut: new Date("2025-09-30"),
        extras: [],
      })
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(403);
    expect(res.body.message).toBe(
      "Room Alreadey Reserved in this date, please choose another date"
    );
  });

  it("Should throw room already reserved", async () => {
    await reservationService.create({
      userId: user._id,
      roomId,
      intentId: "gkfsdlngdfsgsdf",
      checkIn: new Date("2025-09-28"),
      checkOut: new Date("2025-10-2"),
      extras: [],
      totalPrice: 0,
      nightsCount: 0,
    });

    const res = await request(app)
      .post("/api/v1/payment/intent")
      .send({
        roomId,
        checkIn: new Date("2025-09-26"),
        checkOut: new Date("2025-09-30"),
        extras: [],
      })
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(403);
    expect(res.body.message).toBe(
      "Room Alreadey Reserved in this date, please choose another date"
    );
  });

  it("Should throw room already reserved", async () => {
    await reservationService.create({
      userId: user._id,
      roomId,
      intentId: "gkfsdlngdfsgsdf",
      checkIn: new Date("2025-09-20"),
      checkOut: new Date("2025-09-27"),
      extras: [],
      totalPrice: 0,
      nightsCount: 0,
    });

    const res = await request(app)
      .post("/api/v1/payment/intent")
      .send({
        roomId,
        checkIn: new Date("2025-09-26"),
        checkOut: new Date("2025-09-30"),
        extras: [],
      })
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(403);
    expect(res.body.message).toBe(
      "Room Alreadey Reserved in this date, please choose another date"
    );
  });
});
