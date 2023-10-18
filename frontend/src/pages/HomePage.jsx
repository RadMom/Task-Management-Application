import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TaskForm from "../components/TaskForm";
import { fetchUserTasks } from "../api/task-api";
import TasksList from "../components/TasksList";
import Login from "../components/Login&Registration/Login";
import Registration from "../components/Login&Registration/Registration";
import classes from "./HomePage.module.css";
import { useAuthContext } from "../context/useAuthContext";

const HomePage = () => {
    const { userInfo } = useAuthContext();
    console.log(userInfo);
    console.log(localStorage.getItem("userInfo"));
    const [registrationComponent, setRegistrationComponent] = useState(false);

    const { data, isPending, isLoading, isError, error } = useQuery({
        queryKey: ["userTasks", userInfo?._id],
        enabled: !!userInfo?._id, //enabled: This determines whether the query should be automatically
        // executed. It's set to true only if userInfo has a truthy _id value.
        queryFn: () => fetchUserTasks(userInfo._id),
    });
    return (
        <div className={classes["home-page"]}>
            {/* <TaskForm /> */}
            {!userInfo && !isPending && (
                <div>
                    <div className={classes["wellcome-info"]}>
                        <h2>Welcome to My Task Management App</h2>
                        {registrationComponent == false ? (
                            <Login registration={setRegistrationComponent} />
                        ) : (
                            <Registration loginComponent={setRegistrationComponent} />
                        )}
                    </div>
                </div>
            )}

            {isPending && <p>Loading...</p>}
            {isError && <p>Error: {error.message}</p>}
            {userInfo && (
                <ul>
                    {data?.map((task) => (
                        <TasksList key={task._id} task={task} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HomePage;
