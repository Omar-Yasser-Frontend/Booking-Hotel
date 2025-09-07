const request = require("supertest");
const app = require("../src/app");

describe("Testing Not found route", () => {
  test("checking not found route message and status", async () => {
    const res = await request(app).get("/this/is/test");
    expect(res.body).toEqual({ message: "Route Not Found", status: "fail" });
    expect(res.status).toBe(404);
  });
});
