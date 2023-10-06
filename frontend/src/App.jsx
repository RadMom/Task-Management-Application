import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";

function App() {
    return (
        <>
            <HomePage />
            <TaskPage />
        </>
    );
}

export default App;
