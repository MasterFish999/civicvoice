"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../components/AuthProvider";
import { topics } from "../../lib/topics";
import { castIssueVote, loadIssueSuggestions, saveIssueSuggestion, loadIssueVotes } from "../../lib/issueStore";

const emptyForm = {
  title: "",
  category: "Other",
  location: "",
  description: "",
  impact: "",
};

const categories = ["School Policy", "Education", "Safety", "Health & Wellness", "Access", "Other"];

export default function TopicsPage() {
  const { user, loading: authLoading } = useAuth();
  const [voteState, setVoteState] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setVoteState(loadIssueVotes());
    setSuggestions(loadIssueSuggestions());
  }, []);

  const issues = useMemo(
    () => topics.map((topic) => ({
      ...topic,
      supportCount: Number(voteState[topic.id]?.count || 0),
      voters: voteState[topic.id]?.voters || [],
    })),
    [voteState]
  );

  const sortedIssues = useMemo(
    () => [...issues].sort((a, b) => Number(b.supportCount || 0) - Number(a.supportCount || 0)),
    [issues]
  );

  async function handleVote(issueId) {
    if (!user) {
      setStatus("Log in before voting.");
      return;
    }

    try {
      const result = castIssueVote(issueId, user.uid);
      if (result.alreadyVoted) {
        setStatus("You already voted on this issue.");
        return;
      }
      setVoteState(loadIssueVotes());
      setStatus("Vote recorded.");
    } catch (err) {
      setStatus(err.message || "Could not record vote.");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!user) {
      setStatus("Log in before submitting an issue.");
      return;
    }

    if (!form.title.trim() || !form.description.trim()) {
      setStatus("Add a title and a description.");
      return;
    }

    try {
      saveIssueSuggestion({
        title: form.title.trim(),
        category: form.category,
        location: form.location.trim(),
        description: form.description.trim(),
        impact: form.impact.trim(),
        authorUid: user.uid,
        authorEmail: user.email || "",
      });
      setSuggestions(loadIssueSuggestions());
      setForm(emptyForm);
      setStatus("Issue submitted.");
    } catch (err) {
      setStatus(err.message || "Could not submit the issue.");
    }
  }

  return (
    <div className="stack">
      <section className="section-head">
        <div>
          <p className="eyebrow">Issues</p>
          <h1>Texas issue board</h1>
          <p>Vote once on each issue, then submit anything that should be added next.</p>
        </div>
        <div className="row-actions" style={{ marginTop: 0 }}>
          <Link href="/guide" className="btn btn-secondary">How to write</Link>
          <Link href="/reps" className="btn">Find reps</Link>
        </div>
      </section>

      {status ? <div className="notice">{status}</div> : null}
      {!user && !authLoading ? (
        <div className="notice">
          Log in to vote and submit issues. Each account gets one vote per issue.
        </div>
      ) : null}

      <section className="grid-2">
        {sortedIssues.map((topic) => {
          const voted = user ? (topic.voters || []).includes(user.uid) : false;
          return (
            <article key={topic.id} className="topic-card issue-card">
              <div className="row-actions" style={{ marginTop: 0 }}>
                <span className="badge">{topic.category}</span>
                <span className="badge small-badge">{topic.supportCount} votes</span>
              </div>

              <h3>{topic.title}</h3>
              <p>{topic.summary}</p>

              <div className="issue-meta">
                <strong>Texas context</strong>
                <p>{topic.texasContext}</p>
                <p><strong>Usually contact:</strong> {topic.contact}</p>
              </div>

              <div className="topic-actions">
                <Link href={`/topics/${topic.id}`} className="btn btn-secondary">Open issue</Link>
                <button className="btn" onClick={() => handleVote(topic.id)} disabled={!user || voted}>
                  {voted ? "Voted" : "Vote once"}
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <section className="card">
        <h2>Have an issue not listed? Submit it!</h2>
        <p>Use this form to add a new idea students should be able to vote on later.</p>

        <form onSubmit={handleSubmit} className="issue-submit">
          <div className="grid-2">
            <input
              className="input"
              placeholder="Issue title"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              disabled={!user}
            />
            <select
              className="select"
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              disabled={!user}
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <input
            className="input"
            placeholder="City, ZIP, or school district"
            value={form.location}
            onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
            disabled={!user}
          />
          <textarea
            className="textarea"
            placeholder="Describe the issue"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            disabled={!user}
          />
          <textarea
            className="textarea"
            placeholder="How does it affect students?"
            value={form.impact}
            onChange={(e) => setForm((prev) => ({ ...prev, impact: e.target.value }))}
            disabled={!user}
          />
          <button className="btn" type="submit" disabled={!user}>
            Submit it
          </button>
        </form>

        <div className="divider" />

        <h3>Recent submissions</h3>
        {suggestions.length ? (
          <div className="mini-list">
            {suggestions.slice(0, 4).map((item) => (
              <article key={item.id} className="info-panel">
                <span className="badge small-badge">{item.category || "Other"}</span>
                <h4>{item.title}</h4>
                <p>{item.location || "Texas"}</p>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="subtle">No extra issues have been submitted yet.</p>
        )}
      </section>
    </div>
  );
}
