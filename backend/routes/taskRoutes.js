const express = require("express");
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
tasksRoutes.post("/", createTask);

// getAllPublicTasks
tasksRoutes.get("/public");

// getAllUserTasks
tasksRoutes.get("/user/:userId");

// getSingleTask
tasksRoutes.get("/:taskId");

// editTask
tasksRoutes.put("/:taskId");

// deleteTask
tasksRoutes.delete("/:taskId");

// likeTask
tasksRoutes.post("/:taskId/like");

// unlikeTask
tasksRoutes.delete("/:taskId/like");

module.exports = tasksRoutes;
