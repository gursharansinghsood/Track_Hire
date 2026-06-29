import Application from "../models/application.model.js";

/* ================= Helper ================= */
const sendError = (res, status, message) =>
    res.status(status).json({ success: false, message });

/* ================= CREATE APPLICATION ================= */
export const createApplication = async (req, res) => {
    try {
        const {
            companyName,
            jobRole,
            location,
            appliedDate,
            status,
            platform,
            notes,
        } = req.body;

        if (!companyName || !jobRole) {
            return sendError(
                res,
                400,
                "companyName and jobRole are required"
            );
        }

        const userId = req.user?.userId;

        if (!userId) {
            return sendError(res, 401, "Unauthorized user");
        }

        const app = await Application.create({
            userId,
            companyName,
            jobRole,
            location,
            appliedDate,
            status: status || "Applied",
            platform,
            notes,
        });

        return res.status(201).json({
            success: true,
            application: app,
        });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};

/* ================= GET ALL APPLICATIONS ================= */
export const getMyApplications = async (req, res) => {
    try {
        const userId = req.user?.userId;

        const apps = await Application.find({ userId }).sort({
            createdAt: -1,
        });

        return res.json({
            success: true,
            applications: apps,
        });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};

/* ================= GET SINGLE APPLICATION ================= */
export const getApplicationById = async (req, res) => {
    try {
        const userId = req.user?.userId;

        const app = await Application.findOne({
            _id: req.params.id,
            userId,
        });

        if (!app) {
            return sendError(res, 404, "Application not found");
        }

        return res.json({
            success: true,
            application: app,
        });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};

/* ================= UPDATE APPLICATION ================= */
export const updateApplication = async (req, res) => {
    try {
        const userId = req.user?.userId;

        const allowedFields = [
            "companyName",
            "jobRole",
            "location",
            "appliedDate",
            "status",
            "platform",
            "notes",
        ];

        const updates = Object.fromEntries(
            Object.entries(req.body).filter(([key]) =>
                allowedFields.includes(key)
            )
        );

        const app = await Application.findOneAndUpdate(
            { _id: req.params.id, userId },
            updates,
            { new: true, runValidators: true }
        );

        if (!app) {
            return sendError(res, 404, "Application not found");
        }

        return res.json({
            success: true,
            application: app,
        });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};

/* ================= DELETE APPLICATION ================= */
export const deleteApplication = async (req, res) => {
    try {
        const userId = req.user?.userId;

        const app = await Application.findOneAndDelete({
            _id: req.params.id,
            userId,
        });

        if (!app) {
            return sendError(res, 404, "Application not found");
        }

        return res.json({
            success: true,
            message: "Application deleted",
        });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};

/* ================= UPDATE STATUS ================= */
export const updateStatus = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const { status } = req.body;

        if (!status) {
            return sendError(res, 400, "status is required");
        }

        const app = await Application.findOne({
            _id: req.params.id,
            userId,
        });

        if (!app) {
            return sendError(res, 404, "Application not found");
        }

        app.status = status;
        await app.save();

        return res.json({
            success: true,
            application: app,
        });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};