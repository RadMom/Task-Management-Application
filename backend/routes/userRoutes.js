const express = require("express");
const userRoutes = express.Router();

// registration
userRoutes.post("/register");

// login
userRoutes.post("/login");

// updateUserProfile
userRoutes.put("/:userId");

//deleteUserProfile
userRoutes.put("/:userId");

module.exports = userRoutes;
