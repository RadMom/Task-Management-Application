import React from "react";
import TaskDetails from "./TaskDetails";

import classes from "./TasksList.module.css";

const TasksList = ({ tasks }) => {
    return (
        <>
            {tasks && (
                <ul>
                    {tasks.map((task) => (
                        <TaskDetails key={task._id} task={task} />
                    ))}
                </ul>
            )}
        </>
    );
};

export default TasksList;
