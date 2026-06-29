import Otp from "../models/otp.model.js";
import Session from "../models/session.model.js";
import User from "../models/user.model.js";

import { sendEmail } from "../services/email.service.js";
import {
  accessTokenGenerator,
  refreshTokenGenerator,
  refreshTokenVerify,
} from "../services/jwt.service.js";

import { generateOtp } from "../services/otp.sercvice.js";
import { otpEmailTemplate } from "../templates/otp.templates.js";

import { isPasswordMatched } from "../utils/comparePassword.js";
import { hashPasswordGenerate } from "../utils/hashPassword.js";

import {
  conflictResponse,
  errorResponse,
  invalidResponse,
  requiredFieldsError,
  successResponse,
} from "../utils/response.js";

import { refreshTokenCookieOption } from "../config/cookie.js";

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return requiredFieldsError(res);

    const existingUser = await User.findOne({ email, isVerified: true });
    if (existingUser)
      return conflictResponse(res, "User already exists");

    const hashedPassword = await hashPasswordGenerate(password);

    await User.findOneAndUpdate(
      { email },
      {
        $set: {
          name,
          email,
          password: hashedPassword,
        },
      },
      { upsert: true, new: true }
    );

    const otp = generateOtp();

    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true }
    );

    await sendEmail({
      to: email,
      html: otpEmailTemplate({ name, otp }),
    });

    return successResponse(res, "Verify your email");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/* ================= VERIFY OTP ================= */
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return requiredFieldsError(res);

    const user = await User.findOne({ email });
    const otpRecord = await Otp.findOne({ email });

    if (!user || !otpRecord)
      return invalidResponse(res);

    if (otpRecord.otp !== otp)
      return invalidResponse(res);

    user.isVerified = true;
    await user.save();

    await Otp.deleteOne({ email });

    return successResponse(res, "OTP verified successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/* ================= RESEND OTP ================= */
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return requiredFieldsError(res);

    const user = await User.findOne({ email });
    if (!user) return invalidResponse(res);

    const otp = generateOtp();

    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    await sendEmail({
      to: email,
      html: otpEmailTemplate({ name: user.name, otp }),
    });

    return successResponse(res, "OTP sent successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return requiredFieldsError(res);

    const user = await User.findOne({
      email,
      isVerified: true,
    });

    if (!user)
      return invalidResponse(res);

    const isMatch = await isPasswordMatched(password, user.password);
    if (!isMatch)
      return invalidResponse(res);

    const session = await Session.create({
      userId: user._id,
    });

    const payload = {
      userId: user._id,
      sessionId: session._id,
    };

    const accessToken = accessTokenGenerator(payload);
    const refreshToken = refreshTokenGenerator(payload);

    session.refreshToken = refreshToken;
    await session.save();

    res.cookie("refreshToken", refreshToken, refreshTokenCookieOption);

    return successResponse(res, "Login successful", {
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

/* ================= REFRESH TOKEN ================= */
export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return invalidResponse(res);

    const payload = refreshTokenVerify(refreshToken);

    const session = await Session.findById(payload.sessionId);
    if (!session)
      return invalidResponse(res);

    if (session.refreshToken !== refreshToken)
      return invalidResponse(res);

    const user = await User.findOne({
      _id: payload.userId,
      isVerified: true,
    });

    if (!user)
      return invalidResponse(res);

    const accessToken = accessTokenGenerator({
      userId: user._id,
      sessionId: session._id,
    });

    return successResponse(res, "Access token generated", {
      accessToken,
    });
  } catch (error) {
    return errorResponse(res, error.message);
  }
};