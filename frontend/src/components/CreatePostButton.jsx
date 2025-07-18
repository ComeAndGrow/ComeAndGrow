import React from 'react';

// WORK IN PROGRESS DONT JUDGE
const CreatePostButton = ({ visible }) => {
    return (
        <button
            className={`fixed bottom-25 right-5 z-30 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            title="Create new post"
        >
            +
        </button>
    );
};

export default CreatePostButton;