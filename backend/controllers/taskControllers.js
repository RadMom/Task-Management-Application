const Task = require("../models/Task");

// createTask
// tasksRoutes.post("/");
const createTask = async (req, res) => {
    const { task, userId } = req.body;
    console.log(req.body);

    // if (task.title  || !task.deadline || task.description) {
    //     res.status(400).json({ message: "Title,creator,deadline and discription are required !" });
    // }

    try {
        const newTask = new Task({ ...task, userId });
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
const getTask = async (req, res) => {
    const taskId = req.params.taskId;
    try {
        const task = await Task.findById(taskId);
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
