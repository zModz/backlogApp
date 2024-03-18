import { createContext, useReducer, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAuthTwitch } from "../config/twitchAuth";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return { user: action.payload };
        case "USER_LOGOUT":
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null });
    const [auth, setAuth] = useState([]);

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true);
        AsyncStorage.getItem('user').then((res) => {
            dispatch({ type: "USER_LOGIN", payload: JSON.parse(res) });
            setLoading(false)
        })
        
        getAuthTwitch().then((res) => {
            setAuth(res);
            setLoading(false)
        });
}, [dispatch, AsyncStorage]);

// console.log("AuthContext state: ", state);

return (
    <AuthContext.Provider value={{ ...state, dispatch, loading, auth }}>
        {children}
    </AuthContext.Provider>
);
};
