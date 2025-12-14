// frontend/src/components/Profile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/authContext.jsx";

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const fetchProfile = async () => {
    const res = await API.get(`/users/${id}/profile`);
    setProfile(res.data.user);
    setStats(res.data.stats);
    setIsFollowing(
      res.data.user.followers.some((f) => f._id === user._id)
    );
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handleFollow = async () => {
    await API.post(`/users/${id}/follow`);
    fetchProfile();
  };

  const handleUnfollow = async () => {
    await API.post(`/users/${id}/unfollow`);
    fetchProfile();
  };

  if (!profile) return <div>Loading profile...</div>;

  const isMe = user._id === profile._id;

  return (
    <div>
      <h2>@{profile.username}</h2>
      <p>Email: {profile.email}</p>
      {stats && (
        <div style={{ display: "flex", gap: 16 }}>
          <span>Posts: {stats.postsCount}</span>
          <span>Followers: {stats.followersCount}</span>
          <span>Following: {stats.followingCount}</span>
        </div>
      )}
      {!isMe && (
        <div style={{ marginTop: 8 }}>
          {isFollowing ? (
            <button onClick={handleUnfollow}>Unfollow</button>
          ) : (
            <button onClick={handleFollow}>Follow</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
