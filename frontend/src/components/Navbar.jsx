import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

function Navbar() {
    return (
        <header>
            <h1>Tasks App</h1>
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
                <NavLink
                    to="login"
                    className={({ isActive }) => (isActive ? classes.active : undefined)}
                >
                    Login
                </NavLink>
                <NavLink
                    to="register"
                    className={({ isActive }) => (isActive ? classes.active : undefined)}
                >
                    Registration
                </NavLink>
            </nav>
        </header>
    );
}

export default Navbar;
