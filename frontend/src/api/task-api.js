import axios from "axios";
import axiosInstance from "./base-api";

//CREATE Task

//GET ALL PUBLIC Tasks
export const fetchPublicTasks = async () => {
    try {
        const response = await axiosInstance.get("/tasks/public");
        const tasks = await response.data;
        console.log(tasks);
        return tasks;
    } catch (err) {
        console.log(err);
    }
};

//GET ALL USER Tasks
export const fetchUserTasks = async (id) => {
    try {
        const response = await axiosInstance.delete(`/tasks/ ${id}`);
    } catch (err) {}
};

//GET Task
export const fetchTask = async () => {
    try {
    } catch (err) {}
};

//EDIT Task
export const editUserTasks = async () => {
    try {
    } catch (err) {}
};

//DELETE Task
export const deleteUserTasks = async () => {
    try {
    } catch (err) {}
};

//Like Task
export const likeTask = async (id) => {
    console.log(id);
    try {
        const response = await axiosInstance.put(`/tasks/${id}/like`);
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err);
    }
};

//Unlike Task
export const unlikeTask = async (id) => {
    try {
    } catch (err) {}
};
