import axiosInstance from "./base-api";

export const loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw Error("Provide email and password");
    }
    try {
        const response = await axiosInstance.post("/user/login", { email, password });
        console.log(response);
    } catch (err) {
        console.log(err);
    }
};
