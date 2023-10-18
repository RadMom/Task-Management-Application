import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = ({ userInfo }) => {
    return (
        <>
            <Navbar userInfo={userInfo} />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;
