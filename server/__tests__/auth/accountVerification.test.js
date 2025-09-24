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

describe("Testing Account verification", () => {
  it("Should verify account", async () => {
    jest.spyOn(AuthService.prototype, "findById").mockResolvedValueOnce({
      username: "test name",
      email: "test@test.com",
      confirmationToken: {
        expiresAt: Date.now() + 20_000 * 1000,
        token: "s".repeat(64),
      },
      save: jest.fn(),
    });

    const res = await request(app)
      .post("/api/v1/auth/confirmation")
      .send({
        token: "s".repeat(64),
        userId: "1".repeat(24),
      });

    expect(res.status).toBe(200);
    expect(res.headers["authorization"].split(" ")[0]).toBe("Bearer");
    expect(res.headers["set-cookie"][0].split("=")[0]).toBe("refreshToken");
    expect(res.body.message).toBe("Account verified");
  });

  it("Should Throw expired token", async () => {
    jest.spyOn(AuthService.prototype, "findById").mockResolvedValueOnce({
      username: "test name",
      email: "test@test.com",
      confirmationToken: {
        expiresAt: Date.now(),
      },
      save: jest.fn(),
    });

    const res = await request(app)
      .post("/api/v1/auth/confirmation")
      .send({
        token: "s".repeat(64),
        userId: "1".repeat(24),
      });

    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Token Expired");
  });

  it("Should Throw user already verified", async () => {
    jest.spyOn(AuthService.prototype, "findById").mockResolvedValueOnce({
      username: "test name",
      email: "test@test.com",
      save: jest.fn(),
    });

    const res = await request(app)
      .post("/api/v1/auth/confirmation")
      .send({
        token: "s".repeat(64),
        userId: "1".repeat(24),
      });

    expect(res.status).toBe(403);
    expect(res.body.message).toBe("User already verified");
  });

  it("Should Throw Invalid magic link", async () => {
    jest.spyOn(AuthService.prototype, "findById").mockResolvedValueOnce({
      username: "test name",
      email: "test@test.com",
      confirmationToken: {
        expiresAt: Date.now() + 20_000 * 1000,
        token: "A".repeat(64),
      },
      save: jest.fn(),
    });

    const res = await request(app)
      .post("/api/v1/auth/confirmation")
      .send({
        token: "s".repeat(64),
        userId: "1".repeat(24),
      });

    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Invalid magic link");
  });
});
