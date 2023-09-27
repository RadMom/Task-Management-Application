const express = require("express");
const tasksRoutes = express.Router();

// createTask
tasksRoutes.post("/");

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
