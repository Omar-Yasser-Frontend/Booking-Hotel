import "dotenv/config.js";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, jest } from "@jest/globals";

jest.unstable_mockModule("../../src/libs/sendEmails.js", () => ({
  default: jest.fn(),
}));

const app = (await import("../../src/app.js")).default;
const AuthService = (await import("../../src/services/authService.js")).default;
const mongoose = (await import("mongoose")).default;
const sendEmails = (await import("../../src/libs/sendEmails.js")).default;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});
afterAll(async () => {
  await mongoose.disconnect();
});

describe("Testing signup", () => {
  it("should send confirmation email when signup", async () => {
    jest.spyOn(AuthService.prototype, "create").mockResolvedValueOnce({
      username: "test name",
      email: "test@test.com",
    });
    const res = await request(app).post("/api/v1/auth/signup").send({
      email: "test@test.com",
      password: "testtesttest",
      username: "test username",
    });

    expect(sendEmails).toHaveBeenCalled();
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Check your email to confirm your account");
  });

  it("should Response with malformed inputs", async () => {
    const res = await request(app).post("/api/v1/auth/signup").send({
      email: "test@test.com",
      password: "testtesttest",
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Malformed Inputs");
  });
});
