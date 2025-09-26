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

let reservations;
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
    (reservations = await reservationService.create([
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
        status: "check-out",
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
        status: "check-in",
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
    ]))
);

afterEach(async () => {
  await Reservation.deleteMany({
    userId: { $in: [user._id, "1".repeat(24), "2".repeat(24)] },
    roomId,
  });
});

describe("Testing cancel reservations", () => {
  it("Should cancel Reservation", async () => {
    const res = await request(app)
      .delete(`/api/v1/reservation/${reservations[0]._id}`)
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    const thisReservation = await reservationService.findById(
      reservations[0]._id
    );

    expect(thisReservation.status).toBe("canceled");
  });

  it("Should Throw can't cancel reservation check-out status", async () => {
    const res = await request(app)
      .delete(`/api/v1/reservation/${reservations[1]._id}`)
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(403);
    expect(res.body.message).toBe(
      "Can't cancel this reservation while in check-out status"
    );
  });

  it("Should Throw can't cancel reservation check-in status", async () => {
    const res = await request(app)
      .delete(`/api/v1/reservation/${reservations[2]._id}`)
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(403);
    expect(res.body.message).toBe(
      "Can't cancel this reservation while in check-in status"
    );
  });

  it("Should Throw reservation not found", async () => {
    const res = await request(app)
      .delete(`/api/v1/reservation/${reservations[4]._id}`)
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Reservation not found");
  });
});
