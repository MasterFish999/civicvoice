import Link from "next/link";
import { civicRoles, powerMap } from "../../lib/governance";

export default function LearnPage() {
  return (
    <div className="stack">
      <section className="section-head">
        <div>
          <p className="eyebrow">Learn</p>
          <h1>Who has power over what?</h1>
          <p>Understanding the office matters before sending a message. This page explains the most useful levels in plain language.</p>
        </div>
      </section>

      <section className="grid-3">
        {powerMap.map((item) => (
          <article className="step-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="card">
        <h2>Office guide</h2>
        <div className="role-list">
          {civicRoles.map((role) => (
            <article className="role-card" key={role.title}>
              <div className="row-actions" style={{ marginTop: 0 }}>
                <span className="badge">{role.level}</span>
              </div>
              <h3>{role.title}</h3>
              <p>{role.summary}</p>
              <p><strong>Best for:</strong> {role.bestFor}</p>
              <ul className="bullet-list">
                {role.power.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Simple rule of thumb</h2>
        <p>
          School board and district staff handle day-to-day school policies. City leaders handle local services. Texas lawmakers handle state policy. Congress handles federal law.
        </p>
        <div className="row-actions">
          <Link href="/guide" className="btn">Write a message</Link>
          <Link href="/reps" className="btn btn-secondary">Find representatives</Link>
        </div>
      </section>
    </div>
  );
}
