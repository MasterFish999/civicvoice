"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ActionComposer from "../../components/ActionComposer";
import { lookupRepresentatives } from "../../lib/civic";
import { buildActionMessage } from "../../lib/message";
import { loadCustomRepsByZip, saveCustomRepForZip } from "../../lib/issueStore";

function officeLabel(role) {
  if (!role) return "Representative";
  const clean = role.toLowerCase();
  if (clean.includes("senate")) return "Senator";
  if (clean.includes("representative")) return "Representative";
  if (clean.includes("school board")) return "School Board";
  return role;
}

function normalizeRep(rep) {
  return {
    name: rep.name || "",
    role: rep.role || rep.officeName || "Representative",
    party: rep.party || "",
    email: rep.email || rep.emails?.[0] || "",
    phone: rep.phone || rep.phones?.[0] || "",
    url: rep.url || rep.urls?.[0] || "",
    source: rep.source || "official",
    notes: rep.notes || "",
  };
}

export default function RepresentativesPage() {
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [representatives, setRepresentatives] = useState([]);
  const [normalizedAddress, setNormalizedAddress] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [form, setForm] = useState({
    name: "",
    role: "",
    party: "",
    email: "",
    phone: "",
    url: "",
    notes: "",
  });

  const [messageFields, setMessageFields] = useState({
    name: "",
    location: "",
    impact: "",
    action: "",
  });

  useEffect(() => {
    if (zip && /^\d{5}$/.test(zip)) {
      setRepresentatives((prev) => {
        const saved = loadCustomRepsByZip(zip).map(normalizeRep);
        const official = prev.filter((rep) => rep.source !== "manual");
        return [...official, ...saved];
      });
    }
  }, [zip]);

  const grouped = useMemo(() => {
    const buckets = [];
    for (const rep of representatives) {
      const role = officeLabel(rep.role);
      const bucket = buckets.find((item) => item.role === role);
      if (bucket) bucket.items.push(rep);
      else buckets.push({ role, items: [rep] });
    }
    return buckets;
  }, [representatives]);

  const contacts = useMemo(() => {
    return representatives.map((rep) => ({
      name: rep.name,
      role: rep.role,
      email: rep.email,
      phone: rep.phone,
      url: rep.url,
    }));
  }, [representatives]);

  const subject = "Student constituent concern";
  const message = buildActionMessage({
    issueTitle: "this issue",
    name: messageFields.name,
    location: messageFields.location || normalizedAddress || "your district",
    impact: messageFields.impact,
    action: messageFields.action,
  });

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopyStatus("Message copied.");
    } catch {
      setCopyStatus("Could not copy automatically. Select and copy the message below.");
    }
  }

  async function handleSearch(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    setShowAddForm(false);
    try {
      const data = await lookupRepresentatives(zip);
      const official = Array.isArray(data.representatives) ? data.representatives.map(normalizeRep) : [];
      const saved = loadCustomRepsByZip(zip).map(normalizeRep);
      setRepresentatives([...official, ...saved]);
      setNormalizedAddress(data.normalizedAddress || data.state || "");
      if (!official.length && !saved.length) {
        setError("No representatives were returned for that ZIP code. Add the missing contact below.");
        setShowAddForm(true);
      }
    } catch (err) {
      const saved = /^\d{5}$/.test(zip) ? loadCustomRepsByZip(zip).map(normalizeRep) : [];
      setRepresentatives(saved);
      setNormalizedAddress("");
      setError(err.message || "Search failed.");
      setShowAddForm(true);
    } finally {
      setLoading(false);
    }
  }

  function handleAddRep() {
    if (!zip || !/^\d{5}$/.test(zip)) {
      setError("Enter a ZIP code first.");
      return;
    }
    setShowAddForm(true);
  }

  function saveRep(event) {
    event.preventDefault();
    try {
      const saved = saveCustomRepForZip(zip, form);
      const refreshed = loadCustomRepsByZip(zip).map(normalizeRep);
      setRepresentatives((prev) => [...prev.filter((rep) => rep.source !== "manual"), ...refreshed]);
      setForm({
        name: "",
        role: "",
        party: "",
        email: "",
        phone: "",
        url: "",
        notes: "",
      });
      setShowAddForm(false);
      setError("");
    } catch (err) {
      setError(err.message || "Could not save the contact.");
    }
  }

  return (
    <div className="stack">
      <section className="section-head">
        <div>
          <p className="eyebrow">Find Reps</p>
          <h1>Search by ZIP code</h1>
          <p>Look up local, state, and federal representatives, then use mailto, call, and website buttons to reach them.</p>
        </div>
      </section>

      <section className="card">
        <form onSubmit={handleSearch} className="controls">
          <input
            className="input"
            placeholder="Enter your 5-digit ZIP code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            inputMode="numeric"
            maxLength={5}
          />
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        <div className="helper">
          <span>Official API proxy</span>
          <span>Direct contact buttons</span>
          <span>Save missing reps locally</span>
        </div>

        {error ? <div className="notice" style={{ marginTop: 16 }}>{error}</div> : null}
        {normalizedAddress ? <p className="subtle" style={{ marginTop: 12 }}>Showing results for {normalizedAddress}.</p> : null}

        {grouped.length ? (
          <div className="rep-list" style={{ marginTop: 18 }}>
            {grouped.map((group) => (
              <section key={group.role} className="rep-group">
                <h3>{group.role}</h3>
                <div className="mini-list">
                  {group.items.map((rep, index) => (
                    <article key={`${rep.name}-${index}`} className="info-panel">
                      <div className="row-actions" style={{ marginTop: 0 }}>
                        <span className="badge">{rep.source === "manual" ? "Saved" : "Official"}</span>
                        {rep.party ? <span className="badge small-badge">{rep.party}</span> : null}
                      </div>
                      <h4>{rep.name || "Unnamed official"}</h4>
                      <p>{rep.role}</p>
                      {rep.notes ? <p>{rep.notes}</p> : null}
                      <div className="row-actions">
                        {rep.email ? (
                          <a className="btn" href={`mailto:${rep.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`}>
                            Email
                          </a>
                        ) : null}
                        {rep.phone ? <a className="btn btn-secondary" href={`tel:${rep.phone}`}>Call</a> : null}
                        {rep.url ? <a className="btn btn-secondary" href={rep.url} target="_blank" rel="noreferrer">Website</a> : null}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="notice" style={{ marginTop: 18 }}>
            No results yet. Search a ZIP code first, then add a missing rep if needed.
          </div>
        )}

        <div className="row-actions" style={{ marginTop: 18 }}>
          <button className="btn btn-secondary" type="button" onClick={handleAddRep}>
            Add missing rep
          </button>
        </div>
      </section>

      <section className="card composer-wrap">
        <div className="section-head" style={{ marginBottom: 10 }}>
          <div>
            <p className="eyebrow">Message builder</p>
            <h2>Write once, then send to the right office</h2>
          </div>
          <p>Use the form below to create a short constituent message.</p>
        </div>

        <div className="grid-2">
          <div className="stack-sm">
            <input className="input" value={messageFields.name} onChange={(e) => setMessageFields((prev) => ({ ...prev, name: e.target.value }))} placeholder="Your name (optional)" />
            <input className="input" value={messageFields.location} onChange={(e) => setMessageFields((prev) => ({ ...prev, location: e.target.value }))} placeholder="City, ZIP, or district" />
            <textarea className="textarea" value={messageFields.impact} onChange={(e) => setMessageFields((prev) => ({ ...prev, impact: e.target.value }))} placeholder="How has this affected you or other students?" />
            <textarea className="textarea" value={messageFields.action} onChange={(e) => setMessageFields((prev) => ({ ...prev, action: e.target.value }))} placeholder="What should be done?" />
          </div>

          <div className="stack-sm">
            <div className="message-preview">
              <div className="message-preview-head">
                <strong>Preview</strong>
                <button className="btn btn-secondary" type="button" onClick={copyMessage}>Copy message</button>
              </div>
              <pre className="message-body">{message}</pre>
            </div>
            {copyStatus ? <div className="notice">{copyStatus}</div> : null}
            <div className="notice">
              {contacts.length
                ? "Use the Email button on each official card to open a mailto link."
                : "Once you add a rep with an email, the Email button will appear here."}
            </div>
          </div>
        </div>
      </section>

      {showAddForm ? (
        <section className="card">
          <h2>Add a missing rep</h2>
          <p>Use this if the search did not return the right official or if you want to save a local office with email, phone, and website.</p>
          <form className="issue-submit" onSubmit={saveRep}>
            <div className="grid-2">
              <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} />
              <input className="input" placeholder="Role / office" value={form.role} onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))} />
            </div>
            <div className="grid-2">
              <input className="input" placeholder="Party (optional)" value={form.party} onChange={(e) => setForm((prev) => ({ ...prev, party: e.target.value }))} />
              <input className="input" placeholder="Email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} />
            </div>
            <div className="grid-2">
              <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} />
              <input className="input" placeholder="Website URL" value={form.url} onChange={(e) => setForm((prev) => ({ ...prev, url: e.target.value }))} />
            </div>
            <textarea className="textarea" placeholder="Notes" value={form.notes} onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))} />
            <button className="btn" type="submit">Save rep</button>
          </form>
        </section>
      ) : null}

      {representatives.length ? (
        <section className="card">
          <h2>Contact list</h2>
          <p>These are the officials you can reach from this ZIP search.</p>
        </section>
      ) : null}

      <section className="card">
        <h2>Need to send something right now?</h2>
        <ActionComposer
          issueTitle="this issue"
          intro="Fill in the form, then copy the message or email an official from the list above."
          contacts={contacts}
          ctaHref="/guide"
          ctaLabel="Write a stronger message"
        />
      </section>
    </div>
  );
}
