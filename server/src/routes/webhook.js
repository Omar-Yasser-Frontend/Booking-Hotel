import express from "express";
import * as webhookController from "../controllers/webhookController.js";

const router = express.Router();

router.post(
  "/",
  express.raw({ type: "application/json" }),
  webhookController.webhookHandler
);

export default router;
