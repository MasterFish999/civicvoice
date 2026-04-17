import Link from "next/link";
import { civicRoles } from "../../lib/governance";

const steps = [
  {
    title: "State the issue",
    body: "Say what is happening in plain language and keep it focused on one problem.",
  },
  {
    title: "State where you are",
    body: "Include your city, ZIP code, school, or district so the message feels local and real.",
  },
  {
    title: "State the impact",
    body: "Explain how the policy affects you or other students instead of only giving an opinion.",
  },
  {
    title: "State what should change",
    body: "Ask for one specific action, such as a policy review, a hearing, or a vote against a rule.",
  },
];

export default function GuidePage() {
  return (
    <div className="stack">
      <section className="section-head">
        <div>
          <p className="eyebrow">Guide</p>
          <h1>How to write a message that makes change</h1>
          <p>Use a short, respectful message that says who you are, what the issue is, how it affects you, and what should happen next.</p>
        </div>
      </section>

      <section className="grid-2">
        {steps.map((step, index) => (
          <article className="step-card" key={step.title}>
            <span className="badge small-badge">0{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </section>

      <section className="card">
        <h2>A simple template</h2>
        <div className="template">
          Hello,
          <br /><br />
          My name is [name], and I am a student from [city / ZIP / school district].<br /><br />
          I am writing about [issue]. This has affected me or other students because [impact].<br /><br />
          I respectfully ask that you [specific action].<br /><br />
          Thank you for your time and consideration.
        </div>
      </section>

      <section className="card">
        <h2>Which office usually matters?</h2>
        <div className="role-list">
          {civicRoles.slice(0, 4).map((role) => (
            <article className="role-card" key={role.title}>
              <div className="row-actions" style={{ marginTop: 0 }}>
                <span className="badge">{role.level}</span>
              </div>
              <h3>{role.title}</h3>
              <p>{role.summary}</p>
              <p><strong>Best for:</strong> {role.bestFor}</p>
            </article>
          ))}
        </div>
        <div className="row-actions" style={{ marginTop: 16 }}>
          <Link href="/topics" className="btn">Browse issues</Link>
          <Link href="/reps" className="btn btn-secondary">Find my reps</Link>
        </div>
      </section>
    </div>
  );
}
