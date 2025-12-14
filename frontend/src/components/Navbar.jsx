// frontend/src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0.75rem 1rem",
        borderBottom: "1px solid #ddd",
        marginBottom: "1rem"
      }}
    >
      <Link to="/" style={{ fontWeight: "bold", textDecoration: "none" }}>
        MiniInstagram
      </Link>

      {user ? (
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/create" style={{ textDecoration: "none" }}>
            Create
          </Link>
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none" }}>
            {user.username}
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link to="/auth">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
