import "dotenv/config.js";
import request from "supertest";
import { afterEach, expect, jest } from "@jest/globals";
import Reviews from "../../src/models/reviews.js";

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
const app = (await import("../../src/app.js")).default;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.disconnect(process.env.MONGODB_URI);
});
afterEach(async () => {
  await Reviews.deleteMany({ roomId: "1111ab3bb980644d658940d4" });
});

describe("testing POST requets to review", () => {
  it("Should return create review", async () => {
    const res = await request(app)
      .post("/api/v1/review")
      .send({ comment: "test", rating: 5, roomId: "1111ab3bb980644d658940d4" })
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(200);
  });

  it("Should return error malformed inputs", async () => {
    const res = await request(app)
      .post("/api/v1/review")
      .send({ comment: "test", rating: 5 })
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Malformed Inputs");
  });
});
