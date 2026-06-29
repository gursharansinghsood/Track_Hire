import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        companyName: { type: String, required: true, trim: true },
        jobRole: { type: String, required: true, trim: true },
        location: { type: String, trim: true, default: "" },
        appliedDate: { type: Date },
        status: {
            type: String,
            enum: ["Applied", "Interviewing", "Offer", "Rejected"],
            default: "Applied",
        },
        platform: { type: String, trim: true, default: "" },
        notes: { type: String, trim: true, default: "" },
    },
    { timestamps: true }
);

const Application = mongoose.model("application", applicationSchema);

export default Application;

