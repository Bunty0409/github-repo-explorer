import axios from "axios";
import { BASE_URL } from "./apiEndpoints";

// const token = import.meta.env.VITE_GITHUB_TOKEN;
const token = "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";


const axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
    },
});

export default axiosInstance;
