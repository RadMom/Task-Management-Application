import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import { likeTask, unlikeTask } from "../api/task-api";
import classes from "./TaskDetails.module.css";
import TaskForm from "./TaskCard";
import { useAuthContext } from "../context/useAuthContext";

const TaskDetails = ({ task }) => {
    const { userInfo } = useAuthContext();

    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [canEditTask, setCanEditTask] = useState(false);

    //check if user can edit this task
    useEffect(() => {
        if (userInfo) {
            if (userInfo._id === task.creator) {
                setCanEditTask(true);
            }
        }
    }, [userInfo]);

    //task mutations
    const likeTaskMutation = useMutation({
        mutationFn: likeTask,

        onError: (error) => {
            setError((err) => error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            setError("");
        },
    });

    const unlikeTaskMutation = useMutation({
        mutationFn: unlikeTask,

        onError: (error) => {
            setError((err) => error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            setError("");
        },
    });

    //task handlers
    const likeTaskHandler = (e) => {
        e.preventDefault();
        likeTaskMutation.mutate(task._id);
    };

    const unlikeTaskHandler = (e) => {
        e.preventDefault();
        unlikeTaskMutation.mutate(task._id);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <>
            {isEditing ? (
                <TaskForm task={task} cancel={setIsEditing} />
            ) : (
                <div className={classes["task-card"]}>
                    {error && <p className={classes["error-message"]}>{error}</p>}
                    <div className={classes.header}>
                        <div className={classes["task-title-and-creator"]}>
                            <h2 className={classes["task-title"]}>Title: {task.title}</h2>
                            <p className={classes["task-creator"]}>Creator: {task.creator}</p>
                        </div>

                        <div className={classes["task-chip-container"]}>
                            <p
                                className={
                                    task.isPublic
                                        ? `${classes["task-chip"]} ${classes["public-task"]}`
                                        : `${classes["task-chip"]} ${classes["private-task"]}`
                                }
                            >
                                {task.isPublic ? "Public" : "Private"}
                            </p>
                        </div>
                    </div>
                    <div className={classes.body}>
                        <div className={classes["task-description"]}>
                            <h3>Description :</h3> <p> {task.description}</p>
                        </div>

                        <div className={classes.info}>
                            <p className={classes["task-status"]}>Status: {task.status}</p>

                            <p className={classes["task-start-date"]}>
                                Start Date:{" "}
                                {task.startDate
                                    ? new Date(task.startDate).toLocaleDateString()
                                    : "No start date"}
                            </p>

                            <p className={classes["task-deadline"]}>
                                Deadline:{" "}
                                {task.deadline
                                    ? new Date(task.deadline).toLocaleDateString()
                                    : "No deadline"}
                            </p>

                            <p className={classes["task-priority"]}>Priority: {task.priority}</p>
                        </div>
                    </div>

                    <div className={classes["task-buttons"]}>
                        <button className={classes["like-button"]} onClick={likeTaskHandler}>
                            {task.likes.users.length} likes
                        </button>
                        <button className={classes["unlike-button"]} onClick={unlikeTaskHandler}>
                            Unlike
                        </button>
                    </div>
                    {canEditTask && <button onClick={handleEditClick}>Edit</button>}
                </div>
            )}
        </>
    );
};

export default TaskDetails;
