import axios from "axios";

const clearAuthAndRedirect = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
};

export const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (!config.headers) config.headers = {};
        if (token) config.headers.Authorization = `Bearer ${token}`;
        else delete config.headers.Authorization;

        return config;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        if (status === 401) clearAuthAndRedirect();
        return Promise.reject(error);
    }
);






