import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPublicTasks } from "../api/task-api";
//components
import TasksList from "../components/TasksList";

const TaskPage = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["tasks"],
        queryFn: fetchPublicTasks,
    });
    console.log(data);

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error: {error.message}</p>}
            {data && <TasksList tasks={data} />}
        </>
    );
};

export default TaskPage;
