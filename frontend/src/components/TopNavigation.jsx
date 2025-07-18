"use client";
// I'll definitely have to see the "useContext" thing

import React, { useState } from 'react';

const TopNavigation = ({ visible, mode = "light" }) => {

    // const [currMode, setMode] = useState(mode);

    return (
        <header className={`fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Profile Logo */}
            <button className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                {/* Replace with actual user profile image */}
                <span className="material-icons">👤</span>
            </button>

            {/* Platform Logo */}
            <div className="text-xl font-bold text-blue-600">
                MarkiMoo
            </div>

            {/* Spacer or additional icon if needed */}
            <div className="w-10">
                {/* <button
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={()=>setMode(currMode == "light" ? "dark" : "light")}
                >
                    <span className="material-icons">
                        {currMode == "light" ? '🌙' : '☀️'}
                    </span>
                </button> */}
            </div>
        </header>
    );
};

export default TopNavigation;