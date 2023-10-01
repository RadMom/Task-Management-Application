const authUser = require("./authMiddleware");

const checkIsPublic = async (req, res, next) => {
    console.log(req.cookies);
    if (!req.task.isPublic) {
        //Authenticate if user have permision to read,update,delete,like or unlike the task
        await authUser(req, res, next);
        next();
    } else {
        res.status(200).json(req.task);
    }
};

module.exports = checkIsPublic;
