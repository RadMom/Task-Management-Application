import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

//new
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//AuthProvider
import { AuthContextProvider } from "./context/AuthContext";

//create a client
export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    //provide the client to your App
    <React.StrictMode>
        <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools />
            </QueryClientProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
