import "dotenv/config.js";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, jest } from "@jest/globals";

// jest.unstable_mockModule("../../src/services/authService.js");
jest.unstable_mockModule("../../src/libs/sendEmails.js", () => ({
  default: jest.fn(),
}));

const app = (await import("../../src/app.js")).default;
const AuthService = (await import("../../src/services/authService.js")).default;
const AuthRepository = (
  await import("../../src/repositories/AuthRepository.js")
).default;
const mongoose = (await import("mongoose")).default;
const sendEmails = (await import("../../src/libs/sendEmails.js")).default;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});
afterAll(async () => {
  await mongoose.disconnect();
});

describe("Testing Login", () => {
  it("should send confirmation email when login", async () => {
    jest.spyOn(AuthService.prototype, "findUserByEmail").mockResolvedValueOnce({
      username: "test name",
      isActive: false,
      save: async () => "nothing",
      password: "testtesttest",
    });
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "test@test.com",
      password: "testtesttest",
    });

    expect(sendEmails).toHaveBeenCalled();
    expect(res.status).toBe(403);
    expect(res.body.message).toBe(
      "Please confirm your email before logging in"
    );
  });

  it("should Authorize the user when login", async () => {
    jest.spyOn(AuthService.prototype, "findUserByEmail").mockResolvedValueOnce({
      username: "test name",
      isActive: true,
      password: "testtesttest",
    });
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "test@test.com",
      password: "testtesttest",
    });

    expect(res.headers["set-cookie"][0].split("=")[0]).toBe("refreshToken");
    expect(res.headers["authorization"].split(" ")[0]).toBe("Bearer");
  });

  it("should Fail with message Invalid email or password", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "notExist@email.com",
      password: "testtesttest",
    });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid email or password");
  });

  it("should Fail with message Invalid email or password", async () => {
    jest.spyOn(AuthRepository.prototype, "findOne").mockResolvedValueOnce({
      username: "test name",
      isActive: true,
      password: "testtesttest",
      comparePassword: async () => false,
    });
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "test@test.com",
      password: "real batman:)",
    });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid email or password");
  });
});
