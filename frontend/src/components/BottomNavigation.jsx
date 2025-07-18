// components/BottomNavigation.jsx
import React from 'react';

const BottomNavigation = ({ visible }) => {
    const navItems = [
        { name: 'Home', icon: '🏠' },
        { name: 'Communities', icon: '👥' },
        { name: 'Notifications', icon: '🔔' },
        { name: 'Settings', icon: '⚙️' },
    ];

    return (
        <nav className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 py-2 px-4 flex justify-around transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {navItems.map((item) => (
                // I'll be turning this to links, just you wait
                <button
                    key={item.name}
                    className="flex flex-col items-center text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600 p-2 rounded-lg"
                >
                    <span className="text-2xl">{item.icon}</span>
                </button>
            ))}
        </nav>
    );
};

export default BottomNavigation;