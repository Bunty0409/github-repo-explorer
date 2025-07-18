// src/api/axiosInstance.ts
import axios from "axios";

const token = import.meta.env.VITE_GITHUB_TOKEN;

const axiosInstance = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
    },
});

export default axiosInstance;
