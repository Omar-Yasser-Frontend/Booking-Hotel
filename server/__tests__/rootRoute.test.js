import "dotenv/config.js";
import request from "supertest";
import app from "../src/app.js";

describe("Testing Root route", () => {
  it("should return 200 status code", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  it("should return welcome JSON message", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({
      status: "success",
      data: null,
      message: "Welcome to my Hotel App",
    });
  });
});
