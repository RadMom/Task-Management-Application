import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const TaskPage = () => {
    const fetchPublicTasks = async () => {
        try {
            const result = await fetch("http://localhost:5000/tasks/public");
            const info = await result.json();
            return info;
        } catch (err) {
            console.log(err);
        }
    };
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["tasks/public"],
        queryFn: fetchPublicTasks,
    });

    //content
    let content

    isLoading&& content={}
    console.log(data);
    return (
        <div>
            {data &&
                data.map((task) => (
                    <div key={task._id}>
                        <h2>{task.title}</h2>
                        <p>{task._id}</p>
                        <p>{task.description}</p>
                        {task.isPublic ? <p>Public Task</p> : <p>Not Public Task</p>}
                    </div>
                ))}
        </div>
    );
};

export default TaskPage;
