import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../services/api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
        setUser(null);
        return;
        }

        const response = await apiClient.get("/user");

        setUser(response.data.data);
    } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
    } finally {
        setLoading(false);
    }
    };

    const login = async (email, password) => {
        const response = await apiClient.post("/login", {
            email,
            password,
        });

        const { access_token, user } = response.data.data;

        localStorage.setItem("token", access_token);

        setUser(user);

        return user;
    };

    const logout = async () => {
        try {
        await apiClient.post("/logout");
        } finally {
        localStorage.removeItem("token");
        setUser(null);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
        value={{
            user,
            loading,
            login,
            logout,
            isAuthenticated: !!user,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}