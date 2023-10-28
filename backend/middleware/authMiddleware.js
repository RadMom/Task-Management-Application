// JWT auth verification
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authUser = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: "Not authorized, NO token !" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.userId;
        const user = await User.findOne({ _id: userId }).select("_id"); //Now req.user===userId
        console.log("user from authMiddleware: " + user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user._id; // Attach the user's ID to the req object
        next();
    } catch (err) {
        console.error("Authentication error:", err);
        res.status(401).json({ message: err });
    }
};

module.exports = authUser;
