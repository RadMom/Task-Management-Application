import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";
import LoginPage from "./pages/LoginPage";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AboutPage";
import TaskDetails from "./components/TaskDetails";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
    useEffect(() => {
        // Access document.cookie here
        const cookieValue = document.cookie;
        console.log(cookieValue);
    }, []);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <ErrorPage />,
            children: [
                { index: true, element: <HomePage /> },
                { path: "login", element: <LoginPage /> },
                { path: "register", element: <RegistrationPage /> },
                { path: "about", element: <AboutPage /> },
                {
                    path: "tasks",
                    children: [
                        { index: true, element: <TasksPage /> },
                        { path: ":taskId", element: <TaskDetails /> },
                    ],
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
