import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
    createApplication,
    deleteApplication,
    getApplicationById,
    getMyApplications,
    updateApplication,
    updateStatus,
} from "../controllers/application.controller.js";

const applicationRoute = Router();

applicationRoute.get("/", authMiddleware, getMyApplications);
applicationRoute.post("/", authMiddleware, createApplication);
applicationRoute.get("/:id", authMiddleware, getApplicationById);
applicationRoute.patch("/:id", authMiddleware, updateApplication);
applicationRoute.patch("/:id/status", authMiddleware, updateStatus);
applicationRoute.delete("/:id", authMiddleware, deleteApplication);

export default applicationRoute;

