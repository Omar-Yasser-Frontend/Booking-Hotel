import "dotenv/config.js";
import request from "supertest";
import { expect, jest } from "@jest/globals";
import WishlistService from "../../src/services/wishlistService.js";

const decoded = {
  userId: "68ccab3bb980644d658940d4",
  email: "craft14716@gmail.com",
  iat: 1758244380,
  exp: 1766020380,
};

let wishlist;

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    verify: () => decoded,
  },
}));

const mongoose = (await import("mongoose")).default;
const app = (await import("../../src/app.js")).default;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const wishlistService = new WishlistService();
  wishlist = await wishlistService.create({
    userId: decoded.userId,
    roomId: "1".repeat(24),
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  jest.restoreAllMocks();
});

describe("Testing get wishlists", () => {
  it("Should return wishlists", async () => {
    const res = await request(app)
      .delete("/api/v1/wishlist/" + wishlist._id)
      .set("authorization", "Bearer fakeToken")
      .set("Cookie", "refreshToken=this_is_token");

    expect(res.status).toBe(204);
  });
});
