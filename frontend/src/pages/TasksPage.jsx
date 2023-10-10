import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchPublicTasks } from "../api/task-api";

import TasksList from "../components/TasksList";

const TaskPage = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["public"],
        queryFn: fetchPublicTasks,
    });

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error: {error.message}</p>}
            {data && (
                <ul>
                    {data.map((task) => (
                        <TasksList key={task._id} task={task} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskPage;
