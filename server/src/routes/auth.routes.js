import { Router } from "express";
import { register, sendOtp, verifyOtp, login, refreshAccessToken } from "../controllers/auth.controller.js";

const authRoute = Router()

authRoute.post('/register', register)
authRoute.post('/verify-otp', verifyOtp)
authRoute.post('/send-otp', sendOtp)
authRoute.post('/login', login)
authRoute.post('/refresh-token', refreshAccessToken)

export default authRoute
