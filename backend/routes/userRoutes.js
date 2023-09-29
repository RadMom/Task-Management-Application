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
userRoutes.post("/register");

// login
userRoutes.post("/login");

// logout
userRoutes.post("/logout");

// updateUserProfile
userRoutes.put("/:userId");

//deleteUserProfile
userRoutes.put("/:userId");

module.exports = userRoutes;
