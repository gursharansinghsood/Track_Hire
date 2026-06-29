import transporter from "../config/transporter.js";

export const sendEmail = async ({ to, html }) => {
    try {
        const response = await transporter.sendMail({
            from: `"Track Hire" <${process.env.EMAIL_USER}>`,
            to,
            subject: "Verify Your Email",
            html,
        });

        return response;
    } catch (error) {
        console.error("Email Send Error:", error);
        throw new Error("Email sending failed");
    }
};