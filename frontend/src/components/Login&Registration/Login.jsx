import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/user-api";
import classes from "./Login.module.css";
import { useAuthContext } from "../../context/useAuthContext";

const Login = ({ registration }) => {
    const { dispatch } = useAuthContext();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loginError, setLoginError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const { mutate, data, isLoading, isError, error } = useMutation({
        mutationFn: loginUser,
        onError: (err) => {
            setLoginError(error);
        },
        onSuccess: (data) => {
            localStorage.setItem("userInfo", JSON.stringify(data));
            dispatch({
                type: "LOGIN",
                payload: data,
            });
        },
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setLoginError(null); // Clear any previous errors

        // Initiate the login process
        mutate(formData);
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        registration((state) => !state);
    };

    return (
        <div className={classes["login-form-container"]}>
            <div className={classes["wellcome-info"]}>
                <p>You are not logged in. Please log in to access your tasks.</p>
            </div>
            <form className={classes["login-form"]} onSubmit={handleFormSubmit}>
                {error && <div className={classes["error-message"]}>{error.message}</div>}
                <div className={classes["form-group"]}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={classes["form-group"]}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className={classes["submit-button"]}>
                    Log In
                </button>
                <button onClick={handleRegistration}>Registration</button>
            </form>
        </div>
    );
};

export default Login;
