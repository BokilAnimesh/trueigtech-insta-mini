// frontend/src/components/Feed.jsx
import React, { useEffect, useState } from "react";
import API from "../api.js";
import { useAuth } from "../context/authContext.jsx";
import PostCard from "./PostCard.jsx";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    setLoading(true);
    try {
      const res = await API.get("/posts/feed");
      const data = res.data.map((p) => ({
        ...p,
        currentUserId: user._id
      }));
      setPosts(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleLike = async (id) => {
    await API.post(`/posts/${id}/like`);
    fetchFeed();
  };

  const handleUnlike = async (id) => {
    await API.post(`/posts/${id}/unlike`);
    fetchFeed();
  };

  if (loading) return <div>Loading feed...</div>;

  return (
    <div>
      <h2>Home Feed</h2>
      {posts.length === 0 && <p>No posts yet. Follow users or create a post!</p>}
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onLike={() => handleLike(post._id)}
          onUnlike={() => handleUnlike(post._id)}
        />
      ))}
    </div>
  );
};

export default Feed;
