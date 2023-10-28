import React, { useState } from "react";
import classes from "./TaskCard.module.css"; // Replace with your CSS module
import { deleteUserTasks, editUserTask } from "../api/task-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TaskForm = ({ task, cancel }) => {
    const [editedTask, setEditedTask] = useState(task);
    const [isEditing, setIsEditing] = useState(true);

    const queryCLient = useQueryClient();

    const { mutate, data, isError, isLoading, error } = useMutation({
        mutationFn: deleteUserTasks,
        onSuccess: () => {
            queryCLient.invalidateQueries(["tasks"]);
        },
    });
    const saveEditedTask = useMutation({
        mutationFn: editUserTask,
        onSuccess: () => {
            queryCLient.invalidateQueries(["tasks"]);
        },
    });

    const handleSaveClick = (e) => {
        e.preventDefault();
        // You can perform actions here to save the edited task, e.g., making an API request.
        // In this example, we'll just update the state for demonstration.
        setEditedTask(editedTask);
        saveEditedTask.mutate(editedTask);
        cancel((state) => !state);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        cancel((state) => !state);
    };

    const handleDeleteClick = (e) => {
        e.preventDefault();

        mutate(task._id);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditedTask((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <div className={classes["task-card"]}>
            {error && <p>{error.message}</p>}
            <form>
                <div className={classes.header}>
                    <div className={classes["task-title-and-creator"]}>
                        <label className={classes["task-title"]}>Title:</label>
                        <input
                            type="text"
                            className={classes["task-title-input"]}
                            name="title"
                            value={editedTask.title || ""}
                            onChange={handleInputChange}
                        />
                        <p>Creator:{editedTask.creator}</p>
                    </div>
                    <div className={classes["task-chip-container"]}>
                        <label
                            className={
                                editedTask.isPublic
                                    ? classes["public-task"]
                                    : classes["private-task"]
                            }
                        >
                            {editedTask.isPublic ? " Public" : "Private"}
                            <input
                                type="checkbox"
                                className={classes["task-isPublic-input"]}
                                name="isPublic"
                                checked={editedTask.isPublic}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                </div>
                <div className={classes.body}>
                    <div className={classes["task-description"]}>
                        <h3>Description:</h3>
                        <textarea
                            className={classes["task-description-input"]}
                            name="description"
                            value={editedTask.description || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={classes.info}>
                        <label>
                            Status:
                            <select
                                className={classes["task-status-input"]}
                                name="status"
                                value={editedTask.status}
                                onChange={handleInputChange}
                            >
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </label>
                        <label>
                            Start Date:
                            <input
                                type="date"
                                className={classes["task-start-date-input"]}
                                name="startDate"
                                value={
                                    editedTask.startDate
                                        ? new Date(editedTask.startDate).toLocaleDateString("en-CA")
                                        : ""
                                }
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Deadline:
                            <input
                                type="date"
                                className={classes["task-deadline-input"]}
                                name="deadline"
                                value={
                                    editedTask.deadline
                                        ? new Date(editedTask.deadline).toLocaleDateString("en-CA")
                                        : ""
                                }
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Priority:
                            <select
                                className={classes["task-priority-input"]}
                                name="priority"
                                value={editedTask.priority}
                                onChange={handleInputChange}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className={classes["task-buttons"]}>
                    <button className={classes["save-button"]} onClick={handleSaveClick}>
                        Save
                    </button>
                    <button className={classes["cancel-button"]} onClick={handleCancelClick}>
                        Cancel
                    </button>
                    <button className={classes["delete-button"]} onClick={handleDeleteClick}>
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
