"use client";

import React, { useState } from "react";

export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();
        setError("");
        setMessage("");

        try {

            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login Failed");
            }

            const data = await response.json();
            const token = data.token;

            if (token) {
                // Setting Token 
                document.cookie = `token=${token}; path=/; max-age=36000; SameSite=Lax`;
                // Message for later Alert
                setMessage("Login Successful! Redirecting to Home Page...");
                // Redirect to the Home Page
                window.location.replace("/");
            } else {
                setError("Login Successful but no Token Received");
            }

        } catch (err) {
            setError(err.message || "An unexpected Error occurred during login.");
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                            placeholder="Your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                            placeholder="*************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Sign In
                        </button>
                    </div>
                    {error && (
                        <p className="text-red-500 text-xs italic mt-4">{error}</p>
                    )}
                    {message && (
                        <p className="text-green-500 text-xs italic mt-4">{message}</p>
                    )}
                </form>
            </div>
        </div>
    );

};