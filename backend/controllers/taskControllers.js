const mongoose = require("mongoose");
const Task = require("../models/Task");
const User = require("../models/User");

// createTask
// tasksRoutes.post("/");
const createTask = async (req, res, next) => {
    const task = req.body;

    const userId = req.user._id; //typeof req.user._id===object

    //Input validation

    try {
        if (!task.title || !task.description) {
            res.status(400);
            throw new Error("Title, and discription are required !");
        }

        const newTask = new Task({ ...task, creator: userId });
        await newTask.save();
        res.status(200).json({ message: "Task created successfully", newTask });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// getAllPublicTasks
// tasksRoutes.get("/public");
//NEED PAGINATION LOGIC !!!!!
const getAllPublicTasks = async (req, res, next) => {
    try {
        const publicTasks = await Task.find({ isPublic: true });

        if (!publicTasks) {
            res.status(404);
            throw new Error("No public tasks !");
        }
        res.status(200).json(publicTasks);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// getUserTasks
// tasksRoutes.get("/user/:userId");
const getUserTasks = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        console.log(userId == req.user._id.toString());
        if (userId === req.user._id.toString()) {
            const userTasks = await Task.find({ creator: req.user._id });
            res.status(200).json(userTasks);
        } else {
            const userTasks = await Task.find({ creator: req.user._id, isPublic: true });
            res.status(200).json(userTasks);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// getSingleTask
// tasksRoutes.get("/:taskId");
//Why .toString => if (req.user._id.toString() == task.creator.toString()) ???
const getTask = async (req, res, next) => {
    const taskId = req.params.taskId;

    try {
        const task = await Task.findById(taskId);
        //typeof task.creator=== Object
        if (!task) {
            res.status(404);
            throw new Error("Task not found");
        }

        if (!task.isPublic && req.user._id.toString() !== task.creator.toString()) {
            res.status(401);
            throw new Error(
                "Not authorized, token failed! Task is not public and you are not the creator of the task!"
            );
        }

        res.status(200).json(task);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// editTask
// tasksRoutes.put("/:taskId");
const editTask = async (req, res, next) => {
    const taskId = req.params.taskId; // Extract the task ID from the request parameters. String
    const userId = req.user._id; //Object

    const { title, description, deadline, status, isPublic, priority } = req.body;
    try {
        // Check if the task exists
        const task = await Task.findById(taskId);

        if (!task) {
            res.status(404);
            throw new Error("Task not found");
        }

        // Check if the user is the creator of the task
        if (task.creator.toString() !== userId.toString()) {
            res.status(403);
            throw new Error("You do not have permission to edit this task");
        }

        // Update task properties
        task.title = title || task.title;
        task.description = description || task.description;
        task.deadline = deadline || task.deadline;
        task.status = status || task.status;
        task.isPublic = isPublic !== undefined ? isPublic : task.isPublic;
        task.priority = priority || task.priority;

        // Save the updated task
        await task.save();

        return res.status(200).json({ message: "Task updated successfully" });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// deleteTask
// tasksRoutes.delete("/:taskId");
const deleteTask = async (req, res, next) => {
    const taskId = req.params.taskId;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            res.status(404);
            throw new Error("Task not found");
        }
        if (req.user._id.toString() == task.creator.toString()) {
            console.log("userId is = task.creator ID");
            await Task.findByIdAndDelete(taskId);
            res.status(200).json({ message: `Task with ID: ${taskId} deleted` });
        } else {
            res.status(401);
            throw new Error("Not authorized, token failed ! You are not the creator of the task !");
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// likeTask
// tasksRoutes.post("/:taskId/like");
const likeTask = async (req, res, next) => {
    const taskId = req.params.taskId;
    const userIdAsString = req.user._id.toString();

    try {
        //Check if task exists
        const task = await Task.findById(taskId);
        if (!task) {
            res.status(404);
            throw new Error("Task not found");
        }

        // Check if the user has already liked the task
        for (let user of task.likes.users) {
            if (user.userId.toString() === userIdAsString) {
                res.status(400);
                throw new Error("User has already liked the task");
            }
        }

        // Fetch the user's name from the database (only name is retrieved)
        const userName = await User.findById(userIdAsString).select("name");
        if (!userName) {
            res.status(404);
            throw new Error("User not found");
        }

        // Add the like with userId and userName to the task
        task.likes.users.push({ userId: req.user._id, username: userName });

        await task.save();

        return res.status(200).json({ message: "Task liked successfully" });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// unlikeTask
// tasksRoutes.delete("/:taskId/unlike");
const unlikeTask = async (req, res, next) => {
    const taskId = req.params.taskId;
    const userIdAsString = req.user._id.toString();
    console.log(taskId, userIdAsString);

    try {
        //Check if task exists
        const task = await Task.findById(taskId);
        if (!task) {
            res.status(404);
            throw new Error("Task not found");
        }

        //Check if user has already liked the task
        //tuka obatachih neshto. utre na svejo da pregledam!!!!
        if (task.likes.users.some((user) => user.userId.toString() === userIdAsString)) {
            console.log("Before filter:" + task.likes.users);
            task.likes.users = task.likes.users.filter(
                (user) => user.userId && user.userId.toString() != userIdAsString
            );
            console.log("After filter:" + task.likes.users);
            await task.save();
            return res.status(200).json({ message: "Task unliked successfully" });
        } else {
            res.status(400);
            throw new Error("You haven't liked this task");
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = {
    createTask,
    getAllPublicTasks,
    getUserTasks,
    getTask,
    editTask,
    deleteTask,
    likeTask,
    unlikeTask,
};
