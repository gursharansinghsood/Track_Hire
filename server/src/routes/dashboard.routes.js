import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
    getDashboardCharts,
    getDashboardUpcoming,
    getDashboardSummary,
} from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/charts", authMiddleware, getDashboardCharts);
router.get("/upcoming", authMiddleware, getDashboardUpcoming);
router.get("/summary", authMiddleware, getDashboardSummary);

export default router;

