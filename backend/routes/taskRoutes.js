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

// getAllPublicTasks
tasksRoutes.get("/public", getAllPublicTasks);

//authUser routes
// createTask
tasksRoutes.post("/", authUser, createTask);

// getAllUserTasks
tasksRoutes.get("/user/:userId", authUser, getUserTasks);

// getSingleTask
tasksRoutes.get("/:taskId", authUser, getTask);

// editTask
tasksRoutes.put("/:taskId", authUser, editTask);

// deleteTask
tasksRoutes.delete("/:taskId", authUser, deleteTask);

// likeTask
tasksRoutes.put("/:taskId/like", authUser, likeTask);

// unlikeTask
tasksRoutes.put("/:taskId/unlike", authUser, unlikeTask);

module.exports = tasksRoutes;
