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

describe("Testing forgot password", () => {
  it("Should send magic link to email", async () => {
    jest.spyOn(AuthService.prototype, "findOne").mockResolvedValueOnce({
      resetPassword: {},
      save: () => null,
    });
    const res = await request(app).post("/api/v1/auth/forgot-password").send({
      email: "test@test.com",
    });

    expect(sendEmails).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Check your email to reset password");
  });

  it("Should fake response to send magic link to email", async () => {
    const res = await request(app).post("/api/v1/auth/forgot-password").send({
      email: "test@test.com",
    });

    expect(sendEmails).not.toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Check your email to reset password");
  });
});
