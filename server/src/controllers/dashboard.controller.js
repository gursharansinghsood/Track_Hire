import Application from "../models/application.model.js";

/* ================= UTIL ================= */

const getUserId = (req) => req.user?.userId;

const normalizeStatus = (status) =>
    String(status || "").trim();

/* ================= STATUS ================= */

const computeStatusDistribution = (applications) => {
    const statuses = ["Applied", "Interviewing", "Offer", "Rejected"];
    const map = new Map(statuses.map((s) => [s, 0]));

    for (const app of applications) {
        const st = normalizeStatus(app.status);
        if (map.has(st)) map.set(st, map.get(st) + 1);
    }

    return statuses
        .map((s) => ({ name: s, value: map.get(s) }))
        .filter((x) => x.value > 0);
};

/* ================= TOP COMPANIES ================= */

const computeTopCompanies = (applications, limit = 6) => {
    const map = new Map();

    for (const app of applications) {
        const key = (app.companyName || "").trim();
        if (!key) continue;

        map.set(key, (map.get(key) || 0) + 1);
    }

    return Array.from(map.entries())
        .map(([company, count]) => ({ company, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
};

/* ================= PLATFORM ================= */

const computePlatformDistribution = (applications) => {
    const map = new Map();

    for (const app of applications) {
        const key = (app.platform || "").trim();
        if (!key) continue;

        map.set(key, (map.get(key) || 0) + 1);
    }

    return Array.from(map.entries()).map(([source, count]) => ({
        source,
        count,
    }));
};

/* ================= UPCOMING ================= */

const getAppDate = (app) => {
    const raw = app.appliedDate || app.createdAt;
    const d = new Date(raw);
    return Number.isNaN(d.getTime()) ? null : d;
};

const computeUpcoming = (applications) => {
    const now = new Date();
    const upcoming = [];

    for (const app of applications) {
        const status = normalizeStatus(app.status);
        const d = getAppDate(app);

        if (!d) continue;

        const isUpcoming =
            status === "Interviewing" || status === "Offer";

        if (!isUpcoming) continue;
        if (d < now) continue;

        upcoming.push({
            title: `${app.companyName} - ${app.jobRole}`,
            meta: d.toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }),
            badge: status === "Interviewing" ? "Interview" : "Offer",
            jobId: app._id,
        });
    }

    return upcoming
        .sort((a, b) => new Date(a.meta) - new Date(b.meta))
        .slice(0, 10);
};

/* ================= CONTROLLERS ================= */

export const getDashboardSummary = async (req, res) => {
    try {
        const userId = getUserId(req);

        const applications = await Application.find({ userId });

        const normalized = applications.map((a) =>
            normalizeStatus(a.status)
        );

        return res.status(200).json({
            success: true,
            summary: {
                total: applications.length,
                interviews: normalized.filter(
                    (s) => s === "Interviewing"
                ).length,
                offers: normalized.filter((s) => s === "Offer").length,
                rejected: normalized.filter(
                    (s) => s === "Rejected"
                ).length,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getDashboardCharts = async (req, res) => {
    try {
        const userId = getUserId(req);

        const applications = await Application.find({ userId });

        return res.status(200).json({
            success: true,
            charts: {
                statusDistribution:
                    computeStatusDistribution(applications),
                topCompanies: computeTopCompanies(applications),
                bySource:
                    computePlatformDistribution(applications),
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getDashboardUpcoming = async (req, res) => {
    try {
        const userId = getUserId(req);

        const applications = await Application.find({ userId });

        const upcoming = computeUpcoming(applications);

        return res.status(200).json({
            success: true,
            upcoming,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};