const { ObjectId } = require("mongoose");
const Task = require("../models/Task");
const checkIsPublic = require("../middleware/checkIsPublicMuddleware");
const authUser = require("../middleware/authMiddleware");

// createTask
// tasksRoutes.post("/");
const createTask = async (req, res) => {
    const { task, userId } = req.body;
    console.log(req.body);

    // if (task.title  || !task.deadline || task.description) {
    //     res.status(400).json({ message: "Title,creator,deadline and discription are required !" });
    // }

    try {
        const newTask = new Task({ ...task, creator: userId });
        await newTask.save();
        res.status(200).json(newTask);
    } catch (err) {
        console.log(err);
    }
};

// getAllPublicTasks
// tasksRoutes.get("/public");
const getAllPublicTasks = async (req, res) => {
    try {
        const publicTasks = await Task.find({ isPublic: true });
        res.status(200).json(publicTasks);
    } catch (err) {
        console.log(err);
    }
};

// getUserTasks
// tasksRoutes.get("/user/:userId");
const getUserTasks = async (req, res) => {
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
        console.log(err);
    }
};

// getSingleTask
// tasksRoutes.get("/:taskId");
//Why .toString => if (req.user._id.toString() == task.creator.toString()) ???
const getTask = async (req, res) => {
    const taskId = req.params.taskId;

    try {
        const task = await Task.findById(taskId);
        console.log(`Task-a e: ${typeof task.creator}`); //Object

        if (!task.isPublic) {
            if (req.user._id.toString() == task.creator.toString()) {
                //task.creator is object that's why we use toString()
                console.log("userId is = task.creator ID");
                res.status(200).json(task);
            } else {
                res.status(401).json({ message: "Not authorized, token failed!" });
            }
        } else {
            res.status(200).json(task);
        }
    } catch (err) {
        console.log(err);
    }
};

// editTask
// tasksRoutes.put("/:taskId");
const editTask = async (req, res) => {
    const taskId = req.params.taskId;
    const userId = req.user;
    const task = req.body;
    try {
    } catch (err) {
        console.log(err);
    }
};

// deleteTask
// tasksRoutes.delete("/:taskId");
const deleteTask = async (req, res) => {
    const taskId = req.params.taskId;
    console.log(taskId);
    try {
        const task = await Task.findById(taskId);
        if (req.user._id.toString() == task.creator.toString()) {
            //task.creator is object that's why we use toString()
            console.log("userId is = task.creator ID");
            await Task.findByIdAndDelete(taskId);
            res.status(200).json({ message: "Task deleted" });
        } else {
            res.status(401).json({ message: "Not authorized, token failed!" });
        }
    } catch (err) {
        console.log(err);
    }
};

// likeTask
// tasksRoutes.post("/:taskId/like");
const likeTask = async (req, res) => {
    const taskId = req.params.taskId;
    const userId = req.user._id;
    console.log(taskId, userId);
    try {
        //Check if task exists
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        //Check if user has already liked the task
        if (task.likes.users.includes(userId)) {
            return res.status(400).json({ message: "You have already liked the task" });
        }

        task.likes.users.push(userId);

        await task.save();

        return res.status(200).json({ message: "Task liked successfully" });
    } catch (err) {
        console.log(err);
    }
};

// unlikeTask
// tasksRoutes.delete("/:taskId/unlike");
//Why had to .toString when task.likes.users.filter((id) => id.toString() != userId.toString());???
const unlikeTask = async (req, res) => {
    const taskId = req.params.taskId;
    const userId = req.user._id;
    console.log(taskId, userId);
    try {
        //Check if task exists
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        //Check if user has already liked the task
        if (!task.likes.users.includes(userId)) {
            return res.status(400).json({ message: "You haven't liked this task" });
        }

        console.log("Before filter:" + task.likes.users);
        task.likes.users = task.likes.users.filter((id) => id.toString() != userId.toString());
        console.log("After filter:" + task.likes.users);

        await task.save();

        return res.status(200).json({ message: "Task unliked successfully" });
    } catch (err) {
        console.log(err);
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
