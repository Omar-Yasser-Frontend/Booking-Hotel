import "dotenv/config.js";
import request from "supertest";
import mongoose from "mongoose";
import app from "../../src/app";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.disconnect(process.env.MONGODB_URI);
});

describe("testing GET requets to review", () => {
  it("should return reviews", async () => {
    const res = await request(app).get(
      "/api/v1/review/68c9d7941916248385847bf9"
    );

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data.reviews)).toBe(true);
  });
});
