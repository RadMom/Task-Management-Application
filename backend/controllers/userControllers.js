const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generateJWT = require("../utils/generateJWT");

// registerUser
// userRoutes.post("/register");
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    //Input validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide name, email and password" });
        // throw new Error("Please provide name, email and password");
    }

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
            // throw Error("User already exists");
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword });
        // User Existence Check
        if (user) {
            generateJWT(res, user._id);

            res.status(201).json({
                jwtExp: res.jwtExp,
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            return res.status(400).json({ message: "User already exists" });
            // throw new Error("Invalud user data");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message }); // Status 500 (Internal Server Error) for unexpected errors
    }
};

// loginUser
// userRoutes.post("/login");
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Input Validation
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
        // throw new Error("Please provide email and password");
    }
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        // User Existence Check
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Generate JWT Token
        generateJWT(res, user._id);
        console.log("Exp from generateJWT :" + res.jwtExp);
        // Respond with success and user data
        res.status(200).json({
            jwtExp: res.jwtExp,
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message }); //Status 500 (Internal Server Error) for unexpected errors
    }
};

// logout
// userRoutes.post("/logout");
const logoutUser = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "User logged out" });
};

// updateUserProfile
// userRoutes.put("/:userId");
const updateUser = async (req, res) => {
    //MUST CHECK if user new email already exist!!!
    const id = req.params.userId;
    // Check if the provided id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const user = await User.findById(id);
        const email = user.email;

        if (!user) {
            return res.status(404).json({ message: "User not found" });
            // Validate and update user information
        } else {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                // Hash the new password
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }
        }

        // Save the updated user
        const updatedUser = await user.save();

        // Respond with the updated user data
        res.status(200).json({
            message: `${email} successfully updated`,
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err });
    }
};

//deleteUserProfile
// userRoutes.put("/:userId");
const deleteUser = async (req, res) => {
    const id = req.params.userId;
    // Check if the provided id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const user = await User.findByIdAndDelete(id);
        //Still { message: `User with id: ${id} deleted` }if we put valid id but the id does NOT exist?
        //The findByIdAndDelete method in Mongoose will return null if the provided id does not exist in the database.
        //This means that if you attempt to delete a user with a valid but non-existent id,
        //the user variable will be assigned the value null.
        if (!user) {
            return res.status(404).json({ message: `User with id: ${id} not found` });
        }
        return res.status(200).json({ message: `User with id: ${id} deleted` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { registerUser, loginUser, logoutUser, updateUser, deleteUser };
