import Link from "next/link";
import { notFound } from "next/navigation";
import { getTopicBySlug, topics } from "../../../lib/topics";
import ActionComposer from "../../../components/ActionComposer";

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.id }));
}

export default function TopicDetailPage({ params }) {
  const topic = getTopicBySlug(params.slug);
  if (!topic) notFound();

  return (
    <div className="stack">
      <section className="hero-panel">
        <div className="row-actions" style={{ marginTop: 0 }}>
          <span className="badge">{topic.category}</span>
          <span className="badge small-badge">Texas issue</span>
        </div>

        <h1 className="page-heading" style={{ marginTop: 10 }}>{topic.title}</h1>
        <p>{topic.summary}</p>

        <div className="row-actions">
          <Link href="/reps" className="btn">Find my representatives</Link>
          <Link href="/guide" className="btn btn-secondary">Write a better message</Link>
          <Link href="/topics" className="btn btn-secondary">Back to issues</Link>
        </div>
      </section>

      <div className="grid-2">
        <section className="card">
          <h2>Why this matters</h2>
          <ul className="bullet-list">
            {topic.why.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <aside className="detail-panel">
          <h3>Texas context</h3>
          <p>{topic.texasContext}</p>
          <div className="divider" />
          <h3>Who to contact</h3>
          <p>{topic.contact}</p>
          <div className="divider" />
          <h3>What to ask for</h3>
          <p>{topic.action}</p>
          <div className="divider" />
          <h3>Quick examples</h3>
          <div className="template-list">
            {topic.templates.map((template, index) => (
              <div className="template" key={index}>{template}</div>
            ))}
          </div>
        </aside>
      </div>

      <ActionComposer
        issueTitle={topic.title}
        intro={`Use this template to draft a message about ${topic.title.toLowerCase()}. Then search ZIP code contacts and send it.`}
        contacts={[]}
        ctaHref="/reps"
        ctaLabel="Find the right office"
      />
    </div>
  );
}
