import express from "express";
import { createReport, getReports } from "../controllers/report.controllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createReport);
router.get("/", authMiddleware, getReports);

export default router;
