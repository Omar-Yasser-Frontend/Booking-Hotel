import "dotenv/config.js";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, jest } from "@jest/globals";

const userData = {
  username: "test name",
  email: "test@test.com",
  isActive: true,
};
const userQuery = {
  passwordChangeDate: () => false,
  toObject: jest.fn().mockReturnValue(userData),
};

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    verify: () => ({
      userId: "1".repeat(24),
      email: "craft14716@gmail.com",
      iat: 1758244380,
      exp: 1766020380,
    }),
  },
}));

const actual = (await import("../../src/utils/getUserProtectedRoutes.js"))
  .default;

jest.unstable_mockModule("../../src/utils/getUserProtectedRoutes.js", () => ({
  default: jest
    .fn()
    .mockResolvedValueOnce(userQuery)
    .mockImplementationOnce(actual),
}));

const app = (await import("../../src/app.js")).default;
const mongoose = (await import("mongoose")).default;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});
afterAll(async () => {
  await mongoose.disconnect();
});

describe("Testing get user", () => {
  it("Should return user data", async () => {
    const res = await request(app)
      .get("/api/v1/user")
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(200);
    expect(res.body.data.user).toEqual({
      username: "test name",
      email: "test@test.com",
    });
  });

  it("Should throw Not Authorized", async () => {
    const res = await request(app)
      .get("/api/v1/user")
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(401);
    expect(res.body.message).toEqual("Not Authorized");
  });
});
