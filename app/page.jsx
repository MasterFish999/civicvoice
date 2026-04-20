import Link from "next/link";
import { featuredTopicIds, topics } from "../lib/topics";

const steps = [
  {
    title: "Choose an issue",
    body: "Start with a Texas issue students actually feel in school.",
  },
  {
    title: "Write the message",
    body: "Say where you are, what happened, how it affects people, and what should change.",
  },
  {
    title: "Find the right office",
    body: "Search by ZIP code to reach state, local, or federal officials.",
  },
  {
    title: "Send it",
    body: "Use mailto, call buttons, or the official website link.",
  },
];

const featuredTopics = topics.filter((topic) => featuredTopicIds.includes(topic.id));

export default function HomePage() {
  return (
    <div className="stack">
      <section>
        <div className="hero-panel" style={{ padding: "64px 24px", textAlign: "center" }}>
          <div
            style={{
              maxWidth: "840px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span className="pill" style={{ marginBottom: "16px" }}>
              Made for students, by students
            </span>

            <h1 className="page-heading">
              Your voice shapes <span style={{ color: "var(--accent)" }}>the future</span>
            </h1>

            <p style={{ maxWidth: "760px", marginTop: "8px", fontSize: "1.08rem" }}>
              CivicVoice helps Texas students understand school and community issues, find the right office, and send a clear message with less guesswork.
            </p>

            <div className="row-actions" style={{ justifyContent: "center", marginTop: "28px" }}>
              <Link href="/topics" className="btn">Explore issues</Link>
              <Link href="/reps" className="btn btn-secondary">Find my reps</Link>
              <Link href="/guide" className="btn btn-secondary">Write a message</Link>
            </div>

            <div className="stat-row" style={{ width: "100%", marginTop: "48px", textAlign: "center" }}>
              <div className="stat">
                <strong>4</strong>
                <span>Action steps</span>
              </div>
              <div className="stat">
                <strong>6</strong>
                <span>Starter issues</span>
              </div>
              <div className="stat">
                <strong>1</strong>
                <span>Simple message flow</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">How it works</p>
            <h2>Pick an issue, write, and send</h2>
          </div>
          <p>Students should not have to figure out the process alone.</p>
        </div>

        <div className="grid-4">
          {steps.map((step, index) => (
            <div className="step-card" key={step.title}>
              <span className="badge small-badge">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Featured issues</p>
            <h2>Texas topics students are already talking about</h2>
          </div>
          <Link href="/topics" className="btn btn-secondary">See all issues</Link>
        </div>

        <div className="grid-3">
          {featuredTopics.map((topic) => (
            <article key={topic.id} className="topic-card">
              <span className="badge">{topic.category}</span>
              <h3>{topic.title}</h3>
              <p>{topic.summary}</p>
              <p className="subtle">{topic.texasContext}</p>
              <div className="topic-actions">
                <Link href={`/topics/${topic.id}`} className="btn btn-secondary">Open issue</Link>
                <Link href="/guide" className="btn">Write message</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="callout">
          <div>
            <p className="eyebrow">Ready to speak up?</p>
            <h2>Start with one issue and one message</h2>
            <p>Use the issue page to vote, then use the guide and rep lookup to send something useful fast.</p>
          </div>
          <Link href="/topics" className="btn">Go to issues</Link>
        </div>
      </section>
    </div>
  );
}
