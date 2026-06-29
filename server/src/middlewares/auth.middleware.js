import { verifyToken } from "../services/jwt.service.js";

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        const token =
            authHeader?.startsWith("Bearer ")
                ? authHeader.split(" ")[1]
                : req.cookies?.refreshToken || req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        let payload;

        try {
            payload = verifyToken(token);
        } catch (err) {
            const isExpired = err?.name === "TokenExpiredError";

            if (isExpired) {
                res.clearCookie("refreshToken", {
                    httpOnly: true,
                    sameSite: "lax",
                });

                res.clearCookie("token", {
                    httpOnly: true,
                    sameSite: "lax",
                });
            }

            return res.status(401).json({
                success: false,
                message: isExpired ? "Token expired" : "Invalid token",
            });
        }

        /**
         * IMPORTANT FIX:
         * payload = { userId, sessionId }
         */
        req.user = {
            userId: payload.userId,
            sessionId: payload.sessionId,
        };

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Auth middleware error",
        });
    }
};