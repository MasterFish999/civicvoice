"use client";

import { useState } from "react";
import { useAuth } from "../../components/AuthProvider";

export default function LoginPage() {
  const { user, signInWithGoogle, signInWithEmail, signUpWithEmail, logOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleEmailLogin(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await signInWithEmail(email, password);
      setMessage("Signed in.");
    } catch (err) {
      setMessage(err.message || "Could not sign in.");
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailSignup(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await signUpWithEmail(email, password);
      setMessage("Account created.");
    } catch (err) {
      setMessage(err.message || "Could not sign up.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack">
      <section className="section-head">
        <div>
          <p className="eyebrow">Login</p>
          <h1>Sign in to vote and submit ideas</h1>
          <p>Use Google or email/password so your votes stay tied to one account.</p>
        </div>
      </section>

      <section className="grid-2">
        <div className="card">
          <h2>Google sign-in</h2>
          <p>Fastest option for students and staff.</p>
          <button className="btn" type="button" onClick={signInWithGoogle} disabled={loading}>
            Continue with Google
          </button>

          {user ? (
            <div className="notice" style={{ marginTop: 14 }}>
              You are signed in as {user.displayName || user.email || "a user"}.
              <div style={{ marginTop: 10 }}>
                <button className="btn btn-secondary" onClick={logOut}>Log out</button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="card">
          <h2>Email sign-in</h2>
          <form className="stack-sm" onSubmit={handleEmailLogin}>
            <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <div className="row-actions">
              <button className="btn" type="submit" disabled={loading}>Sign in</button>
              <button className="btn btn-secondary" type="button" onClick={handleEmailSignup} disabled={loading}>Sign up</button>
            </div>
          </form>
          {message ? <div className="notice" style={{ marginTop: 14 }}>{message}</div> : null}
        </div>
      </section>

      <section className="card">
        <h2>What login unlocks</h2>
        <ul className="bullet-list">
          <li>Vote once on each issue</li>
          <li>Submit ideas that are not listed yet</li>
          <li>Save local representative additions for faster mailto links later</li>
        </ul>
      </section>
    </div>
  );
}
