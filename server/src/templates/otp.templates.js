export const otpEmailTemplate = ({ name, otp }) => {
    return `
  <div style="max-width: 520px; margin: auto; font-family: Arial, sans-serif; background: #0f172a; color: #f8fafc; border: 1px solid #334155; border-radius: 12px; padding: 24px;">
    
    <h2 style="text-align: center; color: #6366f1;">
      TrackHire Verification
    </h2>

    <p>Hi ${name || "User"},</p>

    <p style="color: #94a3b8;">
      Welcome to <b style="color:#f8fafc;">TrackHire</b> 👋
    </p>

    <p style="color: #94a3b8;">
      Use the OTP below to verify your email and activate your account:
    </p>

    <div style="text-align: center; margin: 24px 0;">
      <div style="
        display: inline-block;
        padding: 14px 28px;
        font-size: 30px;
        letter-spacing: 8px;
        background: #1e293b;
        border: 1px solid #334155;
        border-radius: 10px;
        font-weight: bold;
        color: #f8fafc;
      ">
        ${otp}
      </div>
    </div>

    <p style="color: #f59e0b; font-size: 14px;">
      ⚠ This OTP is valid for <b>5 minutes</b>. Do not share it with anyone.
    </p>

    <hr style="border: none; border-top: 1px solid #334155; margin: 20px 0;" />

    <p style="font-size: 12px; color: #94a3b8;">
      If you didn’t request this, you can safely ignore this email.
    </p>

    <p style="font-size: 12px; color: #94a3b8; text-align: center;">
      © ${new Date().getFullYear()} TrackHire. All rights reserved.
    </p>

  </div>
  `;
};