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
        const newTask = await new Task({ ...task, creator: userId });
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
        const userTasks = await Task.find({ creator: userId });
        res.status(200).json(userTasks);
    } catch (err) {
        console.log(err);
    }
};

// getSingleTask
// tasksRoutes.get("/:taskId");
const getTask = async (req, res, next) => {
    const taskId = req.params.taskId;

    try {
        const task = await Task.findById(taskId);
        console.log(`Task-a e: ${task.creator}`);

        if (!task.isPublic) {
            await authUser(req, res, next);
            const userId = req.user._id;
            const creatorId = task.creator;
            console.log(userId, creatorId);

            if (req.user._id == task.creator) {
                console.log("userId is = task.creator ID");
                res.status(200).json(task);
                return;
            } else {
                res.status(401).json({ message: "Not authorized, token failed!" });
            }
        } else {
            console.log(req.user);
            res.status(200).json(task);
        }
    } catch (err) {
        console.log(err);
    }
};

// editTask
// tasksRoutes.put("/:taskId");
const editTask = async (req, res) => {};
try {
} catch (err) {
    console.log(err);
}

// deleteTask
// tasksRoutes.delete("/:taskId");
const deleteTask = async (req, res) => {};
try {
} catch (err) {
    console.log(err);
}

// likeTask
// tasksRoutes.post("/:taskId/like");
const likeTask = async (req, res) => {};
try {
} catch (err) {
    console.log(err);
}

// unlikeTask
// tasksRoutes.delete("/:taskId/like");
const unlikeTask = async (req, res) => {};
try {
} catch (err) {
    console.log(err);
}

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
