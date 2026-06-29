import Application from "../models/application.model.js";
import Session from "../models/session.model.js";
import User from "../models/user.model.js";

import { isPasswordMatched } from "../utils/comparePassword.js";
import { hashPasswordGenerate } from "../utils/hashPassword.js";

/* ================= GET ME ================= */
export const getMe = async (req, res) => {
    try {
        const userId = req.user?.userId;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const totalApplications = await Application.countDocuments({
            userId,
        });

        return res.status(200).json({
            success: true,
            user: {
                ...user.toObject(),
                totalApplications,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ================= UPDATE PROFILE ================= */
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.userId;

        const allowedFields = [
            "name",
            "phone",
            "location",
            "github",
            "linkedin",
            "skills",
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        // skills string → array conversion
        if (typeof updates.skills === "string") {
            updates.skills = updates.skills
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
        }

        const user = await User.findByIdAndUpdate(
            userId,
            updates,
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ================= CHANGE PASSWORD ================= */
export const changePassword = async (req, res) => {
    try {
        const userId = req.user?.userId;

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isValid = await isPasswordMatched(
            currentPassword,
            user.password
        );

        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        user.password = await hashPasswordGenerate(newPassword);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ================= DELETE ACCOUNT ================= */
export const deleteAccount = async (req, res) => {
    try {
        const userId = req.user?.userId;

        await Application.deleteMany({ userId });
        await Session.deleteMany({ userId });
        await User.findByIdAndDelete(userId);

        res.clearCookie("refreshToken");

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};