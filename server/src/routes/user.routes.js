import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { changePassword, deleteAccount, getMe, updateProfile } from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.get("/me", authMiddleware, getMe);
userRoute.patch("/profile", authMiddleware, updateProfile);
userRoute.patch("/password", authMiddleware, changePassword);
userRoute.delete("/me", authMiddleware, deleteAccount);

export default userRoute;

