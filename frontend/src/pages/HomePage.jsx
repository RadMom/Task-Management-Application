import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserTasks } from "../api/task-api";
import { useAuthContext } from "../context/useAuthContext";
//components
import TaskForm from "../components/TaskForm";
import TasksList from "../components/TasksList";
import Login from "../components/Login&Registration/Login";
import Registration from "../components/Login&Registration/Registration";
//CSS
import classes from "./HomePage.module.css";

const HomePage = () => {
    const { userInfo } = useAuthContext();

    // Initialize state to track whether user info is available.
    const [isUserInfoAvailable, setIsUserInfoAvailable] = useState(false);
    const [isInitialRender, setIsinitialRender] = useState(true);
    // console.log("isInitial" + isInitialRender);

    // State to manage which component to show => login/registration.
    const [isRegistrationVisible, setIsRegistrationVisible] = useState(false);

    useEffect(() => {
        if (userInfo) {
            setIsUserInfoAvailable(true); // Set isUserInfoAvailable to true when userInfo is available
        } else {
            setIsUserInfoAvailable(false);
        }
    }, [userInfo]);

    useEffect(() => {
        setIsinitialRender(false);
    }, []);

    //userTasks query
    const { data, isFetching, isLoading, isError, error, fetchStatus, status } = useQuery({
        queryKey: ["tasks", { user: userInfo?._id }],
        queryFn: () => fetchUserTasks(userInfo?._id),
        enabled: isUserInfoAvailable === true, //enabled: This determines whether the query should be automatically
        // executed. It is set to true only if userInfo has a truthy _id value.
    });

    // console.log(
    //     "    isUserInfoAvailable = " + isUserInfoAvailable,
    //     "    data = " + data,
    //     "    isFetching = " + isFetching,
    //     "    isLoading = " + isLoading,
    //     "    fetchStatus = " + fetchStatus,
    //     "    status = " + status
    // );

    return (
        <div className={classes["home-page"]}>
            {/* {data && <TaskForm />} */}

            {isError && isUserInfoAvailable === true && <p>Error: {error.message}</p>}

            {/* Display tasks when data is available. */}
            {isUserInfoAvailable &&
                data &&
                (isLoading ? <p>fetching</p> : <TasksList tasks={data} />)}
            {!isUserInfoAvailable && !data && !isInitialRender && (
                <div>
                    <div className={classes["wellcome-info"]}>
                        <h2>Welcome to My Task Management App</h2>
                        {isRegistrationVisible == false ? (
                            <Login showRegistrationComponent={setIsRegistrationVisible} />
                        ) : (
                            <Registration showLoginComponent={setIsRegistrationVisible} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
