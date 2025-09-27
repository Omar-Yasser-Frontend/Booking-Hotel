import "dotenv/config.js";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, jest } from "@jest/globals";

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

jest.unstable_mockModule("../../src/utils/getUserProtectedRoutes.js", () => ({
  default: jest.fn(),
}));

const app = (await import("../../src/app.js")).default;
const mongoose = (await import("mongoose")).default;
const getUserProtectedRoute = (
  await import("../../src/utils/getUserProtectedRoutes.js")
).default;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});
afterAll(async () => {
  await mongoose.disconnect();
});

describe("Testing Change Password", () => {
  it("Should change password", async () => {
    getUserProtectedRoute.mockResolvedValueOnce({
      username: "test name",
      email: "test@test.com",
      password: "testtesttest",
      isActive: true,
      comparePassword: async () => true,
      passwordChangeDate: () => false,
      save: jest.fn(),
    });

    const res = await request(app)
      .post("/api/v1/auth/change-password")
      .send({
        currentPassword: "s".repeat(64),
        newPassword: "1".repeat(24),
      })
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Password changed successfully");
  });

  it("Should throw Invalid password", async () => {
    getUserProtectedRoute.mockResolvedValueOnce({
      username: "test name",
      email: "test@test.com",
      password: "testtesttest",
      isActive: true,
      comparePassword: async () => false,
      passwordChangeDate: () => false,
      save: () => null,
    });

    const res = await request(app)
      .post("/api/v1/auth/change-password")
      .send({
        currentPassword: "s".repeat(64),
        newPassword: "1".repeat(24),
      })
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Invalid Password");
  });
});
