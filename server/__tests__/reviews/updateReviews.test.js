import "dotenv/config.js";
import request from "supertest";
import { expect, jest } from "@jest/globals";

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

describe("testing PUT requets to review", () => {
  it("Should return Not Found Error", async () => {
    const res = await request(app)
      .put("/api/v1/review/6fe6f6eeee687163157effef")
      .send({ comment: "test", rating: 5 })
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Can't update Review, Review Not Found");
  });

  it("Should Update the review", async () => {
    const comment = "This comment from test, Hello world";
    const rating = 5;
    const res = await request(app)
      .put("/api/v1/review/68ccaedbbe91041f3302204e")
      .send({ comment, rating })
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");
    delete res.body.data.review.updatedAt;

    expect(res.status).toBe(200);
    expect(res.body.data.review).toEqual({
      _id: "68ccaedbbe91041f3302204e",
      roomId: "68c9d7941916248385847bf9",
      userId: "68ccab3bb980644d658940d4",
      rating,
      comment,
      createdAt: "2025-09-19T01:16:11.736Z",
      __v: 0,
    });
  });

  it("Should throw malformed inputs error", async () => {
    const comment = "This comment from test, Hello world";
    const res = await request(app)
      .put("/api/v1/review/68ccaedbbe91041f3302204e")
      .send({ comment })
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Malformed Inputs");
  });

  // not authorized to delete this comment
  it("Should return error 404", async () => {
    const comment = "This comment from test, Hello world";
    const rating = 4;
    const res = await request(app)
      .put("/api/v1/review/68ccab3bb980644d65894066")
      .send({ comment, rating })
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Can't update Review, Review Not Found");
  });
});
