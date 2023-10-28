import { useAuthContext } from "../context/useAuthContext";
import axiosInstance from "./base-api";
import { logoutUser } from "./user-api";

//For TanStack Query to determine a query has errored, the query function must throw or return a rejected Promise.
// Any error that is thrown in the query function will be persisted on the error state of the query.

//Check JWT expiration time
const isJwtExpired = () => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
        const jwtExp = JSON.parse(userInfo).jwtExp;

        console.log(jwtExp, Date.now());

        if (jwtExp * 1000 <= Date.now()) {
            // JWT is expired, perform logout and redirect
            logoutUser();

            // Redirect to the login page or any other page you prefer
            // navigation("/login"); // Replace "/login" with your desired redirect path
        }
    }
};

//CREATE Task
export const createTask = async (task) => {
    try {
        const response = await axiosInstance.post("/tasks", task);
        const data = response.data;
        console.log(data.newTask);
        return data.newTask;
    } catch (err) {
        console.error(err);
        throw Error(
            err.response.data.error
                ? err.response.data.error.message
                : err.response.data.message
                ? err.response.data.message
                : "An unexpected error ..."
        );
    }
};
//GET ALL PUBLIC Tasks
export const fetchPublicTasks = async () => {
    try {
        const response = await axiosInstance.get("/tasks/public");
        const tasks = await response.data;
        console.log(tasks);
        return tasks;
    } catch (err) {
        console.error(err);
        throw Error(
            err.response.data.error
                ? err.response.data.error.message
                : err.response.data.message
                ? err.response.data.message
                : "An unexpected error ..."
        );
    }
};

//GET ALL USER Tasks
export const fetchUserTasks = async (userId) => {
    try {
        const response = await axiosInstance.get(`tasks/user/${userId}`);
        const tasks = await response.data;
        console.log(tasks);
        return tasks;
    } catch (err) {
        throw Error(
            err.response.data.error
                ? err.response.data.error.message
                : err.response.data.message
                ? err.response.data.message
                : "An unexpected error ..."
        );
    }
};

//GET Task
export const fetchTask = async (taskId) => {
    try {
        const response = await axiosInstance.get(`tasks/${taskId}`);
        const task = await response.data;
        console.log(task);
        return task;
    } catch (err) {
        throw Error(
            err.response.data.error
                ? err.response.data.error.message
                : err.response.data.message
                ? err.response.data.message
                : "An unexpected error ..."
        );
    }
};

//EDIT Task
export const editUserTask = async (task) => {
    console.log(task);
    try {
        const response = await axiosInstance.put(`tasks/${task._id}`, task);
    } catch (err) {
        throw Error(
            err.response.data.error
                ? err.response.data.error.message
                : err.response.data.message
                ? err.response.data.message
                : "An unexpected error ..."
        );
    }
};

//DELETE Task
export const deleteUserTasks = async (taskId) => {
    const taskID = await taskId;
    console.log(taskID);
    console.log(taskId);
    try {
        const response = await axiosInstance.delete(`/tasks/${taskId}`);
        const data = await response.data;
        console.log(data);
        return data;
    } catch (err) {
        throw Error(
            err.response.data.error
                ? err.response.data.error.message
                : err.response.data.message
                ? err.response.data.message
                : "An unexpected error ..."
        );
    }
};

//Like Task
export const likeTask = async (id) => {
    try {
        const response = await axiosInstance.put(`/tasks/${id}/like`);
        const data = await response.data;
        return data;
    } catch (err) {
        console.error("likeTask err: " + err);
        throw Error(
            err.response.data.error
                ? err.response.data.error.message
                : err.response.data.message
                ? err.response.data.message
                : "An unexpected error ..."
        );
    }
};

//Unlike Task
export const unlikeTask = async (id) => {
    console.log(id);
    try {
        const response = await axiosInstance.put(`/tasks/${id}/unlike`);
        const data = await response.data;
        return data;
    } catch (err) {
        console.error("unlikeTask err: " + err);
        throw Error(
            err.response.data.error
                ? err.response.data.error.message
                : err.response.data.message
                ? err.response.data.message
                : "An unexpected error ..."
        );
    }
};
