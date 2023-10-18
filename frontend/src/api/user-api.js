import axiosInstance from "./base-api";
import { useAuthContext } from "../context/useAuthContext";

export const loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw Error("Provide email and password");
    }
    try {
        const response = await axiosInstance.post("/user/login", { email, password });
        const userInfo = await response.data;
        console.log(userInfo);

        return userInfo;
    } catch (err) {
        console.error(err);
        throw Error(
            err.response.data.error ? err.response.data.error.message : err.response.data.message
        );
    }
};

export const registerUser = async ({ name, email, password }) => {
    if (!name || !email || !password) {
        throw Error("Provide username, email and password");
    }
    try {
        const response = await axiosInstance.post("/user/register", { name, email, password });
        const userInfo = await response.data;
        console.log(userInfo);

        return userInfo;
    } catch (err) {
        console.error(err);
        throw Error(
            err.response.data.error ? err.response.data.error.message : err.response.data.message
        );
    }
};

export const logoutUser = async () => {
    try {
        const response = await axiosInstance.post("/user/logout");
        const data = await response.data;
        console.log(data);
        localStorage.removeItem("userInfo");

        return data;
    } catch (err) {
        console.error(err);
        throw Error(
            err.response.data.error ? err.response.data.error.message : err.response.data.message
        );
    }
};
