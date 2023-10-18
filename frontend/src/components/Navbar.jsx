import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useAuthContext } from "../context/useAuthContext";
import { logoutUser } from "../api/user-api";

function Navbar() {
    const { userInfo, dispatch } = useAuthContext();
    const navigation = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        logoutUser();
        dispatch({ type: "LOGOUT" });
        navigation("/");
    };
    return (
        <header>
            <h1>Tasks App</h1>
            <div className={classes["nav-info"]}>
                <nav>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? classes.active : undefined)}
                        end
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="tasks"
                        className={({ isActive }) => (isActive ? classes.active : undefined)}
                    >
                        Public Tasks
                    </NavLink>
                    <NavLink
                        to="about"
                        className={({ isActive }) => (isActive ? classes.active : undefined)}
                    >
                        About
                    </NavLink>
                </nav>
                {userInfo && (
                    <div className={classes["user-info"]}>
                        <p>Username: {userInfo.name}</p>{" "}
                        <button onClick={handleLogout}>logout</button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Navbar;
