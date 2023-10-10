import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000", // Replace with your API's base URL
    withCredentials: true, // Enable credentials (cookies, authentication headers)
});

export default axiosInstance;
