const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Not Started", "In Progress", "Completed"],
            default: "Not Started",
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                type: String,
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        likes: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
