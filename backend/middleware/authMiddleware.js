// JWT auth verification
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authUser = async (req, res, next) => {
    // console.log(req);
    let token;
    token = req.cookies.jwt;

    if (token) {
        try {
            const { userId } = jwt.verify(token, process.env.JWT_SECRET);
            console.log("auth userId:" + userId);
            req.user = await User.findOne({ _id: userId }).select("_id"); //Now req.user===userId
            console.log("authUser after req.user:" + req.user);
            next();
        } catch (err) {
            console.log(err);
            res.status(401).json(err.message);
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token !" });
    }
};

module.exports = authUser;
