import React from 'react';

// Post Card
const PostCard = ({ post }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-3 border border-gray-200">
            <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold mr-3">
                    {/* Author Profile // TODO // Place Holder let's just add the first letter (you won't get mad, right?) */}
                    {post.author[0]}
                </div>
                <div>
                    <p className="font-semibold text-gray-800">{post.author}</p>
                    <p className="text-gray-500 text-sm">{post.timestamp}</p>
                </div>
            </div>
            <p className="text-gray-700 mb-3">{post.content}</p>
            {post.imageUrl && (
                <div className="mb-3">
                    <img
                        src={post.imageUrl}
                        alt="Post image"
                        className="rounded-lg w-full h-auto object-cover max-h-64"
                    />
                </div>
            )}
            <div className="flex justify-between text-gray-600 text-sm">
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments}</span>
            </div>
        </div>
    );
};

export default PostCard;