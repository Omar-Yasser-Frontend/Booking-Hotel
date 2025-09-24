import "dotenv/config.js";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, jest } from "@jest/globals";

jest.unstable_mockModule("crypto", () => ({
  default: {
    createHash: jest.fn(() => ({
      update: jest.fn().mockReturnThis(),
      digest: jest.fn(() => "s".repeat(64)),
    })),
  },
  createHash: jest.fn(() => ({
    update: jest.fn().mockReturnThis(),
    digest: jest.fn(() => "s".repeat(64)),
  })),
}));

const app = (await import("../../src/app.js")).default;
const AuthService = (await import("../../src/services/authService.js")).default;
const mongoose = (await import("mongoose")).default;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});
afterAll(async () => {
  await mongoose.disconnect();
});

describe("Testing Reset Password", () => {
  it("Should reset password", async () => {
    jest.spyOn(AuthService.prototype, "findById").mockResolvedValueOnce({
      username: "test name",
      email: "test@test.com",
      resetPassword: {
        expiresAt: Date.now() + 20_000 * 1000,
        token: "s".repeat(64),
      },
      save: jest.fn(),
    });

    const res = await request(app)
      .post("/api/v1/auth/reset-password")
      .send({
        token: "s".repeat(64),
        userId: "1".repeat(24),
        password: "testtesttest",
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(
      "Password changed successfully, please login"
    );
  });

  it("Should throw something went wrong(user not found)", async () => {
    const res = await request(app)
      .post("/api/v1/auth/reset-password")
      .send({
        token: "s".repeat(64),
        userId: "1".repeat(24),
        password: "testtesttest",
      });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Something went wrong");
  });

  it("Should throw Expired token", async () => {
    jest.spyOn(AuthService.prototype, "findById").mockResolvedValueOnce({
      username: "test name",
      email: "test@test.com",
      resetPassword: {
        expiresAt: Date.now() - 20_000 * 1000,
        token: "s".repeat(64),
      },
      save: jest.fn(),
    });

    const res = await request(app)
      .post("/api/v1/auth/reset-password")
      .send({
        token: "s".repeat(64),
        userId: "1".repeat(24),
        password: "testtesttest",
      });

    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Token Expired");
  });

  it("Should throw invalid token", async () => {
    jest.spyOn(AuthService.prototype, "findById").mockResolvedValueOnce({
      username: "test name",
      email: "test@test.com",
      resetPassword: {
        expiresAt: Date.now() + 20_000 * 1000,
        token: "A".repeat(64),
      },
      save: jest.fn(),
    });

    const res = await request(app)
      .post("/api/v1/auth/reset-password")
      .send({
        token: "s".repeat(64),
        userId: "1".repeat(24),
        password: "testtesttest",
      });

    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Invalid magic link");
  });
});
