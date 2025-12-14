// frontend/src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext.jsx";
import Navbar from "./components/Navbar.jsx";
import LoginSignup from "./components/LoginSignup.jsx";
import Feed from "./components/feed.jsx";
import CreatePost from "./components/CreatePost.jsx";
import Profile from "./components/Profile.jsx";
import PostDetail from "./components/PostDetail.jsx";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/auth" />;
};

const App = () => {
  return (
    <div>
      <Navbar />
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "1rem" }}>
        <Routes>
          <Route path="/auth" element={<LoginSignup />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/posts/:id"
            element={
              <PrivateRoute>
                <PostDetail />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
