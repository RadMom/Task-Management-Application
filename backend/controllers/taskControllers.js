const mongoose = require("mongoose");
const Task = require("../models/Task");
const User = require("../models/User");

// createTask
// tasksRoutes.post("/");
const createTask = async (req, res, next) => {
    const task = req.body;

    const userId = req.user._id;
    console.log(task);

    //Input validation

    try {
        if (!task.title || !task.description) {
            // return res.status(400).json({ message: "Title, and discription are required !" });

            const error = new Error("Title, and discription are required !");
            error.statusCode = 400;
            throw error;
        }
        const newTask = new Task({ ...task, creator: userId });
        await newTask.save();
        res.status(200).json({ message: "Task created successfully", newTask });
    } catch (err) {
        console.error(err);
        next(err);
        // res.status(500).json({ message: "Internal server error" });
    }
};

// getAllPublicTasks
// tasksRoutes.get("/public");
//NEED PAGINATION LOGIC !!!!!
const getAllPublicTasks = async (req, res, next) => {
    try {
        const publicTasks = await Task.find({ isPublic: true });

        if (!publicTasks) {
            const error = new Error("No public tasks !");
            error.statusCode = 404;
            throw error;
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
        if (userId == req.user.toString()) {
            const userTasks = await Task.find({ creator: userId });
            res.status(200).json(userTasks);
        } else {
            const userTasks = await Task.find({ creator: userId, isPublic: true });
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
        console.log(`Task is: ${typeof task.creator}`); //Object
        if (!task) {
            // return res.status(404).json({ message: "Task not found" });
            const error = new Error("Task not found");
            error.statusCode = 404;
            throw error;
        }

        if (!task.isPublic && req.user._id.toString() !== task.creator.toString()) {
            // return res.status(401).json({ message: "Not authorized, token failed!" });
            const error = new Error("Not authorized, token failed!");
            error.statusCode = 401;
            throw error;
        }

        res.status(200).json(task);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// editTask
// tasksRoutes.put("/:taskId");
const editTask = async (req, res) => {
    const taskId = req.params.taskId; // Extract the task ID from the request parameters
    const userId = req.user._id;
    console.log("TypeOf userId" + typeof userId);
    const { title, description, deadline, status, isPublic, priority } = req.body;
    try {
        // Check if the task exists
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Check if the user is the creator of the task
        if (task.creator.toString() !== userId.toString()) {
            return res
                .status(403)
                .json({ message: "You do not have permission to edit this task" });
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
        return res.status(500).json({ message: "Internal server error" });
    }
};

// deleteTask
// tasksRoutes.delete("/:taskId");
const deleteTask = async (req, res) => {
    const taskId = req.params.taskId;
    console.log(taskId);
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (req.user._id.toString() == task.creator.toString()) {
            //task.creator is object that's why we use toString()
            console.log("userId is = task.creator ID");
            await Task.findByIdAndDelete(taskId);
            res.status(200).json({ message: `Task with ID: ${taskId} deleted` });
        } else {
            res.status(401).json({ message: "Not authorized, token failed!" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// likeTask
// tasksRoutes.post("/:taskId/like");
const likeTask = async (req, res) => {
    const taskId = req.params.taskId;
    const userIdToCheck = req.user._id.toString(); //new mongoose.Types.ObjectId(req.user._id);

    try {
        //Check if task exists
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Check if the user has already liked the task

        for (let user of task.likes.users) {
            if (user.userId.toString() == userIdToCheck) {
                // throw Error("User has already liked the task");
                return res.status(400).json({ error: "User has already liked the task" });
            }
        }

        // Fetch the user's name from the database (only name is retrieved)
        const userInfo = await User.findById(userIdToCheck).select("name");
        if (!userInfo) {
            return res.status(404).json({ message: "User not found" });
        }

        const userName = userInfo.name;

        // Add the like with userId and userName to the task
        task.likes.users.push({ userId: req.user._id, username: userName });

        await task.save();

        return res.status(200).json({ message: "Task liked successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// unlikeTask
// tasksRoutes.delete("/:taskId/unlike");
//Why had to .toString when task.likes.users.filter((id) => id.toString() != userId.toString());???
const unlikeTask = async (req, res) => {
    const taskId = req.params.taskId;
    const userIdAsString = req.user._id.toString();
    console.log(taskId, userIdAsString);

    try {
        //Check if task exists
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        //Check if user has already liked the task
        //tuka obatachih neshto. utre na svejo da pregledam!!!!
        if (task.likes.users.map((user) => user.userId.toString() !== userIdAsString)) {
            return res.status(400).json({ message: "You haven't liked this task" });
        }

        console.log("Before filter:" + task.likes.users);
        task.likes.users = task.likes.users.filter(
            (user) => user.userId && user.userId.toString() != userIdAsString
        );
        console.log("After filter:" + task.likes.users);

        await task.save();

        return res.status(200).json({ message: "Task unliked successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
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
