import axios from "axios";

const clearAuthAndRedirect = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
};

export const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // MUST be set in Vercel
    withCredentials: true,
});

// REQUEST INTERCEPTOR
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        config.headers = config.headers || {};

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
API.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;

        if (status === 401) {
            clearAuthAndRedirect();
        }

        return Promise.reject(error);
    }
);