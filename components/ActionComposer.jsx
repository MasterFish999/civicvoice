"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { buildActionMessage, buildEmailSubject, buildMailtoLink } from "../lib/message";

export default function ActionComposer({
  issueTitle,
  intro = "Use the form below to write a short, respectful message.",
  contacts = [],
  showContactHint = true,
  ctaHref = "/reps",
  ctaLabel = "Find representatives",
}) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [impact, setImpact] = useState("");
  const [action, setAction] = useState("");
  const [status, setStatus] = useState("");

  const message = useMemo(
    () => buildActionMessage({ issueTitle, name, location, impact, action }),
    [issueTitle, name, location, impact, action]
  );

  const subject = useMemo(() => buildEmailSubject(issueTitle), [issueTitle]);

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setStatus("Message copied.");
    } catch {
      setStatus("Could not copy automatically. Select and copy the text below.");
    }
  }

  return (
    <section className="card composer-card">
      <div className="section-head" style={{ marginBottom: 12 }}>
        <div>
          <p className="eyebrow">Take action</p>
          <h2>Write a message in under a minute</h2>
          <p>{intro}</p>
        </div>
      </div>

      <div className="grid-2 composer-grid">
        <div className="stack-sm">
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)" />
          <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Your city, ZIP, or school district" />
          <textarea className="textarea" value={impact} onChange={(e) => setImpact(e.target.value)} placeholder="How has this issue affected you or other students?" />
          <textarea className="textarea" value={action} onChange={(e) => setAction(e.target.value)} placeholder="What should be done?" />
        </div>

        <div className="stack-sm">
          <div className="message-preview">
            <div className="message-preview-head">
              <strong>Preview</strong>
              <button className="btn btn-secondary" type="button" onClick={copyMessage}>Copy message</button>
            </div>
            <pre className="message-body">{message}</pre>
          </div>

          {contacts.length ? (
            <div className="contact-box">
              <h3>Send to an official</h3>
              <div className="contact-list">
                {contacts.map((contact, index) => {
                  const mailto = buildMailtoLink(contact.email, subject, message);
                  return (
                    <div key={`${contact.name || contact.label || "contact"}-${index}`} className="contact-row">
                      <div>
                        <strong>{contact.name || contact.label || "Official"}</strong>
                        <p>{contact.role || contact.label || "Representative"}</p>
                      </div>
                      <div className="row-actions compact-actions">
                        {contact.email ? <a className="btn" href={mailto}>Email</a> : null}
                        {contact.phone ? <a className="btn btn-secondary" href={`tel:${contact.phone}`}>Call</a> : null}
                        {contact.url ? <a className="btn btn-secondary" href={contact.url} target="_blank" rel="noreferrer">Website</a> : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {showContactHint ? (
            <div className="notice">
              {contacts.length ? "Use the buttons above to send your message right away." : "After writing, search ZIP code contacts on the reps page to find the right office."}
            </div>
          ) : null}

          <div className="row-actions">
            <Link href={ctaHref} className="btn btn-secondary">{ctaLabel}</Link>
          </div>

          {status ? <div className="notice">{status}</div> : null}
        </div>
      </div>
    </section>
  );
}
