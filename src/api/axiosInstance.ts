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
