import "dotenv/config.js";
import { jest } from "@jest/globals";
import z from "zod";
import validation from "../src/middlewares/validationMiddleware";

const testSchema = z.object({
  name: z.string().trim(),
});

describe("testing validation middleware", () => {
  const res = {};
  const next = jest.fn();

  it("should call next", async () => {
    const req = { body: { name: "test name" } };
    await validation(testSchema)(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should return ZodError", async () => {
    const req = { body: {} };
    await expect(validation(testSchema)(req, res, next)).rejects.toThrow(
      z.ZodError
    );
    expect(next).toHaveBeenCalledTimes(0);
  });
});
