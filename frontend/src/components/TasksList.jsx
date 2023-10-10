import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { likeTask } from "../api/task-api";
import classes from "./TasksList.module.css";

const TasksList = ({ task }) => {
    const mutation = useMutation({
        mutationFn: likeTask,
    });
    const likeTaskHandler = (e) => {
        e.preventDefault();
        mutation.mutate(task._id);
    };

    const unlikeTaskHandler = () => {};
    return (
        <div className={classes["task-card"]}>
            <h2 className={classes["task-title"]}>{task.title}</h2>
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
            {task.isPublic && <span className={classes["task-chip"]}>Public</span>}
            <p>{task.likes.length}</p>
            <div>
                <button onClick={likeTaskHandler}>like</button>
                <button onClick={unlikeTaskHandler}>unlike</button>
            </div>
        </div>
    );
};

export default TasksList;
