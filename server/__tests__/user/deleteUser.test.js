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
  ...userData,
  save: jest.fn(),
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

describe("Testing delete user", () => {
  it("Should delete user", async () => {
    const res = await request(app)
      .delete("/api/v1/user/delete-account")
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(204);
  });

  it("Should throw not authorized", async () => {
    const res = await request(app)
      .delete("/api/v1/user/delete-account")
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(401);
    expect(res.body.message).toEqual("Not Authorized");
  });
});
