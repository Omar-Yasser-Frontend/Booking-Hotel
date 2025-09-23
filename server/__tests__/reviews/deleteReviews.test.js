import "dotenv/config.js";
import request from "supertest";
import { afterAll, afterEach, beforeEach, expect, jest } from "@jest/globals";

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
const Reviews = (await import("../../src/models/reviews.js")).default;
const app = (await import("../../src/app.js")).default;

let reviews;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.disconnect(process.env.MONGODB_URI);
});

beforeEach(async () => {
  reviews = await Reviews.create([
    {
      userId: "68ccab3bb980644d658940d4",
      roomId: "68ccab3bb980644d65894011",
      comment: "test comment",
      rating: 3,
    },
    {
      userId: "68ccab3bb980644d65894862",
      roomId: "68ccab3bb980644d65894022",
      comment: "test comment",
      rating: 3,
    },
  ]);
});
afterEach(async () => {
  await Reviews.deleteMany({
    comment: "test comment",
  });
});

describe("testing DELETE requets to review", () => {
  it("Should return Not Found Error", async () => {
    // removing review that don't belong to me(different user id)
    const res = await request(app)
      .delete("/api/v1/review/68ccab3bb980644d65894862")
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Can't delete Review, Review Not Found");
  });

  it("Should return Not Found Error", async () => {
    // removing review that does not exist
    const res = await request(app)
      .delete("/api/v1/review/111111111111111111111111")
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Can't delete Review, Review Not Found");
  });

  it("Should return no Response", async () => {
    const currReview = reviews[0];
    // removing review that belong to me
    const res = await request(app)
      .delete(`/api/v1/review/${currReview._id}`)
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(204);
  });
});
