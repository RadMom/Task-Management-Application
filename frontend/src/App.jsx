import { createBrowserRouter, Router, RouterProvider, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AboutPage";
import TaskDetails from "./components/TaskDetails";
import { useEffect } from "react";
import { logoutUser } from "./api/user-api";
import { useAuthContext } from "./context/useAuthContext";

function App() {
    const { userInfo, dispatch } = useAuthContext();
    // const navigation = useNavigate();
    const userData = localStorage.getItem("userInfo");

    useEffect(() => {
        if (userInfo) {
            const jwtExp = userInfo.jwtExp;

            console.log(jwtExp, Date.now());

            if (jwtExp * 1000 <= Date.now()) {
                // JWT is expired, perform logout and redirect
                logoutUser();
                dispatch({ type: "LOGOUT" });

                // Redirect to the login page or any other page you prefer
                // navigation("/login"); // Replace "/login" with your desired redirect path
            }
        }
        console.log("App component");
    }, [userData, dispatch]);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <ErrorPage />,
            children: [
                { index: true, element: <HomePage /> },
                { path: "about", element: <AboutPage /> },
                {
                    path: "tasks",
                    children: [
                        { index: true, element: <TasksPage /> },
                        // { path: ":taskId", element: <TaskDetails /> },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
