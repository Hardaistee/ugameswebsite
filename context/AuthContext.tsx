"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API_CONFIG } from "../lib/api-config";

interface User {
    email: string;
    name: string;
    phone?: string;
    createdAt?: string;
    lastLogin?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
    updateProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const API_URL = `${API_CONFIG.BACKEND_URL}/api`;

    // Initialize auth state
    useEffect(() => {
        const storedToken = localStorage.getItem("ugames_token");
        const storedUser = localStorage.getItem("ugames_user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (newToken: string, userData: User) => {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem("ugames_token", newToken);
        localStorage.setItem("ugames_user", JSON.stringify(userData));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("ugames_token");
        localStorage.removeItem("ugames_user");
        router.push("/giris");
    };

    const updateProfile = async () => {
        if (!token) return;

        try {
            const response = await axios.get(`${API_URL}/user/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                const userData = response.data.user;
                setUser(userData);
                localStorage.setItem("ugames_user", JSON.stringify(userData));
            }
        } catch (error) {
            console.error("Profile update error:", error);
            // If token is invalid, logout
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                logout();
            }
        }
    };

    // Verify token validity on mount if token exists
    useEffect(() => {
        if (token) {
            updateProfile();
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
