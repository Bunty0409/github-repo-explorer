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
