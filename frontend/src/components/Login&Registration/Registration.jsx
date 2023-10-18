import React, { useState } from "react";
import classes from "./Login.module.css";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/user-api";
import { useAuthContext } from "../../context/useAuthContext";

function Registration({ loginComponent }) {
    const { dispatch } = useAuthContext();
    const [formData, setFormData] = useState({
        name: "",
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
        mutationFn: registerUser,
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
        loginComponent((state) => !state);
    };

    return (
        <div className={classes["login-form-container"]}>
            <div className={classes["wellcome-info"]}>
                <p>Please enter your details below</p>
            </div>
            <form className={classes["login-form"]} onSubmit={handleFormSubmit}>
                {error && <div className={classes["error-message"]}>{error.message}</div>}
                <div className={classes["form-group"]}>
                    <label htmlFor="name">Username</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                    Registration
                </button>
            </form>
            <div>
                <p>You have registration already ?</p>
                <button className={classes["submit-button"]} onClick={handleRegistration}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default Registration;
