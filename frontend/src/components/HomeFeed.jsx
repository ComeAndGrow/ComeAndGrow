'use client';
// Yeah, I can't do Server Components right now, too much of a pain

import React, { useState, useEffect, useRef, useCallback } from 'react';
import PostCard from './PostCard';
import TopNavigation from './TopNavigation';
import BottomNavigation from './BottomNavigation';
import CreatePostButton from './CreatePostButton';

// We'll be mocking this Data for now until I get everything working
const mockPostsData = Array.from({ length: 50 }, (_, i) => ({

    // Post ID
    id: `post-${i + 1}`,

    // Author Name
    author: `User${(i % 5) + 1}`,

    content: `This is the content for post number ${i + 1}. This is some long post, hopefully you're seeing something.`,

    // Lucky how there's a Site for this :D
    imageUrl: i % 3 === 0 ? `https://picsum.photos/400/300?random=${i}` : null, // Add some images

    // The Basics, I don't want Retweets because why? Maybe Requotes but definitely not that
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 20),

    timestamp: new Date(Date.now() - i * 60 * 60 * 1000).toLocaleString(), // Recent posts first
}));

const fetchMockPosts = (page = 0, limit = 10) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const startIndex = page * limit;
            const endIndex = startIndex + limit;
            const paginatedPosts = mockPostsData.slice(startIndex, endIndex);
            const hasMore = endIndex < mockPostsData.length;
            resolve({ posts: paginatedPosts, hasMore });
        }, 800); // Simulate network delay
    });
};


const HomeFeed = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [showNavBars, setShowNavBars] = useState(true);
    const lastScrollY = useRef(0);
    const timeoutRef = useRef(null); // For scroll debounce

    const loadPosts = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const { posts: newPosts, hasMore: newHasMore } = await fetchMockPosts(page);
            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            setHasMore(newHasMore);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setLoading(false);
        }
    }, [page, loading, hasMore]);

    
    useEffect(() => {
        loadPosts(); // Load the posts I guess

        const handleScroll = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                const currentScrollY = window.scrollY;
                const isScrollingDown = currentScrollY > lastScrollY.current;

                // Nav Bar disappear on scrolling down
                if (currentScrollY > 100) { 
                    setShowNavBars(!isScrollingDown);
                } else {
                    setShowNavBars(true); // Always show if near the top
                }

                lastScrollY.current = currentScrollY;

                // Infinite scroll logic
                if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200 && !loading && hasMore) {
                    loadPosts();
                }
            }, 100); // Debounce scroll events
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [loadPosts, loading, hasMore]);


    return (
        <div className="relative min-h-screen bg-gray-100 pb-20 pt-16">

            {/* I'll have to work on this a bit more */}
            <TopNavigation visible={showNavBars} />

            <main className="container mx-auto px-4 py-4">
                {posts.length === 0 && !loading && (
                    <p className="text-center text-gray-500 mt-10">No posts to display yet.</p>
                )}
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
                {loading && (
                    <div className="text-center py-4 text-gray-500">Loading more posts...</div>
                )}
                {!hasMore && posts.length > 0 && (
                    <div className="text-center py-4 text-gray-500">You've reached the end of the feed!</div>
                )}
            </main>

            {/* Button doesn't work for now */}
            <CreatePostButton visible={showNavBars} />

            {/* Some old navigation layout */}
            <BottomNavigation visible={showNavBars} />
        </div>
    );
};

export default HomeFeed;