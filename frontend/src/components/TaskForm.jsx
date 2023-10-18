import React, { useState } from "react";
import axios from "axios";

import "./TaskForm.css";
import { createTask } from "../api/task-api";

const TaskForm = ({ task }) => {
    const [formData, setFormData] = useState({
        title: task?.title ? task.title : "",
        creator: "", // You may need to handle selecting a user here
        startDate: task?.startDate ? task.startDate : "",
        deadline: task?.deadline ? task.deadline : "",
        description: task?.description ? task.description : "",
        status: task?.status ? task.status : "Not Started",
        isPublic: task?.isPublic ? task.isPublic : false,
        priority: task?.priority ? task.priority : "Medium",
        likes: [], // You may need to handle likes differently
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        createTask(formData);
        setFormData({
            title: "",
            startDate: "",
            deadline: "",
            description: "",
            status: "Not Started",
            isPublic: false,
            priority: "Medium",
            likes: [],
        });
    };

    const validateFormData = (data) => {
        const errors = {};

        if (!data.title.trim()) {
            errors.title = "Title is required";
        }

        if (!data.description.trim()) {
            errors.description = "Description is required";
        }

        if (!data.status) {
            errors.status = "Status is required";
        }

        if (!data.priority) {
            errors.priority = "Priority is required";
        }

        // You can add more validation rules here for other fields

        return errors;
    };

    return (
        <form className="task-form" onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                {errors.title && <div className="error">{errors.title}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                {errors.description && <div className="error">{errors.description}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={formData.status} onChange={handleChange}>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                {errors.status && <div className="error">{errors.status}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="deadline">Deadline</label>
                <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                {errors.priority && <div className="error">{errors.priority}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="isPublic">Public</label>
                <input
                    type="checkbox"
                    id="isPublic"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="submit-button">
                Submit
            </button>
        </form>
    );
};

export default TaskForm;
