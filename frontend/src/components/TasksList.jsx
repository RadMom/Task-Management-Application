import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import { likeTask, unlikeTask } from "../api/task-api";
import classes from "./TasksList.module.css";

const TasksList = ({ task }) => {
    const [error, setError] = useState("");

    const likeTaskMutation = useMutation({
        mutationFn: likeTask,

        onError: (error) => {
            setError((err) => error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["public"] });
            queryClient.invalidateQueries({ queryKey: ["userTasks"] });
            setError("");
        },
    });

    const unlikeTaskMutation = useMutation({
        mutationFn: unlikeTask,

        onError: (error) => {
            setError((err) => error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["public"] });
            queryClient.invalidateQueries({ queryKey: ["userTasks"] });
            setError("");
        },
    });

    const likeTaskHandler = (e) => {
        e.preventDefault();
        likeTaskMutation.mutate(task._id);
    };

    const unlikeTaskHandler = (e) => {
        e.preventDefault();
        unlikeTaskMutation.mutate(task._id);
    };
    return (
        <div className={classes["task-card"]}>
            {error && <p className={classes["error-message"]}>{error}</p>}
            <h2 className={classes["task-title"]}>Title: {task.title}</h2>
            {task.description && (
                <p className={classes["task-description"]}>Description: {task.description}</p>
            )}
            <p className={classes["task-creator"]}>Creator: {task.creator}</p>
            <p className={classes["task-status"]}>Status: {task.status}</p>
            {task.startDate && (
                <p className={classes["task-start-date"]}>
                    Start Date: {new Date(task.startDate).toLocaleDateString()}
                </p>
            )}
            {task.deadline && (
                <p className={classes["task-deadline"]}>
                    Deadline: {new Date(task.deadline).toLocaleDateString()}
                </p>
            )}
            <p className={classes["task-priority"]}>Priority: {task.priority}</p>
            <div className={classes["task-chip-container"]}>
                <span
                    className={
                        task.isPublic
                            ? `${classes["task-chip"]} ${classes["public-task"]}`
                            : `${classes["task-chip"]} ${classes["private-task"]}`
                    }
                >
                    {task.isPublic ? "Public" : "Private"}
                </span>
            </div>
            <div className={classes["task-buttons"]}>
                <button className={classes["like-button"]} onClick={likeTaskHandler}>
                    {task.likes.users.length} likes
                </button>
                <button className={classes["unlike-button"]} onClick={unlikeTaskHandler}>
                    Unlike
                </button>
            </div>
        </div>
    );
};

export default TasksList;
