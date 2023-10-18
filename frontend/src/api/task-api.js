import axios from "axios";
import axiosInstance from "./base-api";

//For TanStack Query to determine a query has errored, the query function must throw or return a rejected Promise.
// Any error that is thrown in the query function will be persisted on the error state of the query.

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
            err.response.data.error ? err.response.data.error.message : err.response.data.message
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
            err.response.data.error ? err.response.data.error.message : err.response.data.message
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
    try {
        const response = await axiosInstance.delete(`/tasks/${taskId}`);
        const data = response.data;
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
            err.response.data.error ? err.response.data.error.message : err.response.data.message
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
            err.response.data.error ? err.response.data.error.message : err.response.data.message
        );
    }
};
