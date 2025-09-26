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

beforeEach(
  async () =>
    await reservationService.create([
      {
        userId: user._id,
        roomId,
        intentId: "gkfsdlngdfsgsdf",
        checkIn: new Date("2025-09-20"),
        checkOut: new Date("2025-09-27"),
        extras: [],
        totalPrice: 0,
        nightsCount: 0,
      },
      {
        userId: user._id,
        roomId,
        intentId: "gkfsdlngdfsgsdf",
        checkIn: new Date("2025-09-20"),
        checkOut: new Date("2025-09-27"),
        extras: [],
        totalPrice: 0,
        nightsCount: 0,
      },
      {
        userId: "1".repeat(24),
        roomId,
        intentId: "gkfsdlngdfsgsdf",
        checkIn: new Date("2025-09-20"),
        checkOut: new Date("2025-09-27"),
        extras: [],
        totalPrice: 0,
        nightsCount: 0,
      },
      {
        userId: "2".repeat(24),
        roomId,
        intentId: "gkfsdlngdfsgsdf",
        checkIn: new Date("2025-09-20"),
        checkOut: new Date("2025-09-27"),
        extras: [],
        totalPrice: 0,
        nightsCount: 0,
      },
    ])
);

afterEach(async () => {
  await Reservation.deleteMany({
    userId: { $in: [user._id, "1".repeat(24), "2".repeat(24)] },
    roomId,
  });
});

describe("Testing getting user reservations", () => {
  it("Should get all user reservations", async () => {
    const res = await request(app)
      .get("/api/v1/reservation")
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(200);
    expect(res.body.data.reservations).toHaveLength(2);
    res.body.data.reservations.forEach((reservation) =>
      expect(reservation.userId).toBe(user._id)
    );
  });
});
