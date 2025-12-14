// frontend/src/components/LoginSignup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/authContext.jsx";

const LoginSignup = () => {
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    emailOrUsername: ""
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "signup") {
        const res = await API.post("/auth/signup", {
          username: form.username,
          email: form.email,
          password: form.password
        });
        login(res.data.token, res.data.user);
      } else {
        const res = await API.post("/auth/login", {
          emailOrUsername: form.emailOrUsername,
          password: form.password
        });
        login(res.data.token, res.data.user);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {mode === "signup" && (
          <>
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </>
        )}

        {mode === "login" && (
          <input
            name="emailOrUsername"
            placeholder="Email or Username"
            value={form.emailOrUsername}
            onChange={handleChange}
            required
          />
        )}

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <div style={{ color: "red" }}>{error}</div>}

        <button type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>

      <div style={{ marginTop: 16 }}>
        {mode === "login" ? (
          <p>
            Don't have an account?{" "}
            <button onClick={() => setMode("signup")}>Sign Up</button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button onClick={() => setMode("login")}>Login</button>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
