import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { likeTask, unlikeTask } from "../api/task-api";
import classes from "./TasksList.module.css";

const TasksList = ({ task }) => {
    const likeTaskMutation = useMutation(
        {
            mutationFn: likeTask,
        },
        {
            onError: (error) => {
                console.log(error);
                // The error will be automatically captured and can be used in your component
                return error;
            },
        }
    );
    console.log(likeTaskMutation);
    const unlikeTaskMutation = useMutation(
        {
            mutationFn: unlikeTask,
        },
        {
            onError: (error) => {
                console.log(error);
                // The error will be automatically captured and can be used in your component
                throw error;
            },
        }
    );

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
            {likeTaskMutation.isError && <p>{likeTaskMutation.error.message}error</p>}
            {unlikeTaskMutation.error && <p>{unlikeTaskMutation.error}error</p>}
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

            <div>
                <button onClick={likeTaskHandler}>{task.likes.users.length} likes</button>
                <button onClick={unlikeTaskHandler}>unlike</button>
            </div>
        </div>
    );
};

export default TasksList;
