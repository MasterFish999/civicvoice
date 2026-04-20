"use client";

import { useState } from "react";
import { useAuth } from "../../components/AuthProvider";

export default function LoginPage() {
  const { user, signInWithEmail, signUpWithEmail, logOut } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isSignup) {
        await signUpWithEmail(email, password);
        setMessage("Account created successfully.");
      } else {
        await signInWithEmail(email, password);
        setMessage("Signed in successfully.");
      }
    } catch (err) {
      setMessage(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (user) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <div className="card" style={{ width: "100%", maxWidth: "420px", textAlign: "center" }}>
          <h1 style={{ marginBottom: "1rem" }}>Welcome back</h1>
          <p style={{ marginBottom: "1.5rem" }}>
            Signed in as <strong>{user.email}</strong>
          </p>
          <button className="btn" onClick={logOut}>
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "2rem",
        }}
      >
        <h1 style={{ marginBottom: "0.5rem", textAlign: "center" }}>
          {isSignup ? "Create account" : "Sign in"}
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            opacity: 0.7,
          }}
        >
          CivicVoice
        </p>

        <form className="stack-sm" onSubmit={handleSubmit}>
          <input
            className="input"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn" type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : isSignup
              ? "Create account"
              : "Sign in"}
          </button>
        </form>

        <button
          type="button"
          className="btn btn-secondary"
          style={{ marginTop: "1rem", width: "100%" }}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Sign in"
            : "Need an account? Sign up"}
        </button>

        {message ? (
          <div
            className="notice"
            style={{ marginTop: "1rem", textAlign: "center" }}
          >
            {message}
          </div>
        ) : null}
      </div>
    </div>
  );
}