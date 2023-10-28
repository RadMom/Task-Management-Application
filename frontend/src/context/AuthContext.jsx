import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                userInfo: action.payload,
            };
        case "LOGOUT":
            return {
                userInfo: null,
            };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        userInfo: null,
    });

    console.log("AuthContextProvider");

    useEffect(() => {
        //We parse the data from locale storage because it is JSON string
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            dispatch({ type: "LOGIN", payload: userInfo });
        }
    }, []);

    console.log("AuthContext state :", state.userInfo);

    return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
