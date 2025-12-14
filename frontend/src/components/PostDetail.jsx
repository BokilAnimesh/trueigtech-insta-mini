// frontend/src/components/PostDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/authContext.jsx";

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");

  const fetchPost = async () => {
    const res = await API.get(`/posts/${id}`);
    setPost(res.data);
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) return <div>Loading post...</div>;

  const likedByMe = post.likes.some((uid) => uid === user._id);

  const handleLike = async () => {
    await API.post(`/posts/${id}/like`);
    fetchPost();
  };

  const handleUnlike = async () => {
    await API.post(`/posts/${id}/unlike`);
    fetchPost();
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    await API.post(`/posts/${id}/comments`, { text: commentText });
    setCommentText("");
    fetchPost();
  };

  return (
    <div>
      <h2>Post</h2>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 12
        }}
      >
        <Link to={`/profile/${post.author._id}`}>
          <strong>@{post.author.username}</strong>
        </Link>
        <img
          src={post.imageUrl}
          alt={post.caption}
          style={{ width: "100%", maxHeight: 500, objectFit: "cover", marginTop: 8 }}
        />
        <p style={{ marginTop: 8 }}>{post.caption}</p>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={likedByMe ? handleUnlike : handleLike}>
            {likedByMe ? "Unlike" : "Like"}
          </button>
          <span>{post.likes.length} likes</span>
        </div>

        <h3 style={{ marginTop: 16 }}>Comments</h3>
        <ul>
          {post.comments.map((c) => (
            <li key={c._id}>
              <strong>@{c.user.username}</strong>: {c.text}
            </li>
          ))}
        </ul>

        <form onSubmit={handleComment} style={{ marginTop: 8, display: "flex", gap: 8 }}>
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            style={{ flexGrow: 1 }}
          />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
};

export default PostDetail;
