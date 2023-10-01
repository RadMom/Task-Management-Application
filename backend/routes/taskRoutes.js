const express = require("express");
const authUser = require("../middleware/authMiddleware");

const tasksRoutes = express.Router();
const {
    createTask,
    getAllPublicTasks,
    getUserTasks,
    getTask,
    editTask,
    deleteTask,
    likeTask,
    unlikeTask,
} = require("../controllers/taskControllers");

// createTask
tasksRoutes.post("/", authUser, createTask);

// getAllPublicTasks
tasksRoutes.get("/public", getAllPublicTasks);

// getAllUserTasks
tasksRoutes.get("/user/:userId", authUser, getUserTasks);

// getSingleTask
tasksRoutes.get("/:taskId", authUser, getTask);

// editTask
tasksRoutes.put("/:taskId", authUser, editTask);

// deleteTask
tasksRoutes.delete("/:taskId", authUser, deleteTask);

// likeTask
tasksRoutes.post("/:taskId/like", authUser, likeTask);

// unlikeTask
tasksRoutes.delete("/:taskId/like", authUser, unlikeTask);

module.exports = tasksRoutes;
