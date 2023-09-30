const express = require("express");
const userRoutes = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
} = require("../controllers/userControllers");

// registration
userRoutes.post("/register", registerUser);

// login
userRoutes.post("/login", loginUser);

// logout
userRoutes.post("/logout", logoutUser);

// updateUserProfile
userRoutes.put("/:userId", updateUser);

//deleteUserProfile
userRoutes.delete("/:userId", deleteUser);

module.exports = userRoutes;
