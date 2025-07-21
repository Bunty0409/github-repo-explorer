import axios from "axios";
import { BASE_URL } from "./apiEndpoints";

const axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
        Accept: "application/vnd.github.v3+json",
    },
});

export default axiosInstance;
