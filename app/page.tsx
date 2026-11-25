import type { CSSProperties } from "react";
import { experience, pipeline, profile, projects, skills, stats, type Project } from "@/lib/content";
import ContactForm from "./components/contact-form";

function ProjectCard({ p }: { p: Project }) {
  const inner = (
    <>
      <p className="kind mono">{p.kind}</p>
      <h3>
        {p.name}
        {p.href && <span aria-hidden> ↗</span>}
      </h3>
      <p>{p.blurb}</p>
      <p className="chips">
        {p.stack.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </p>
    </>
  );

  return p.href ? (
    <a className="card" href={p.href} target="_blank" rel="noreferrer">
      {inner}
    </a>
  ) : (
    <article className="card">{inner}</article>
  );
}

export default function Home() {
  return (
    <>
      <header className="topbar">
        <span className="mono">~/mashood</span>
        <nav>
          <a href="#work">work</a>
          <a href="#projects">projects</a>
          <a href="#stack">stack</a>
          <a href="#contact">contact</a>
        </nav>
      </header>

      <main className="wrap">
        {/* ---------- Hero ---------- */}
        <section className="hero">
          <p className="status mono">
            <span className="dot" aria-hidden /> {profile.status}
          </p>
          <h1>
            {profile.name}
            <span className="role">{profile.role}</span>
          </h1>
          <p className="tagline">{profile.tagline}</p>

          <ol className="pipeline mono" aria-label="Delivery pipeline">
            {pipeline.map((stage, i) => (
              <li key={stage} style={{ "--i": i } as CSSProperties}>
                {stage}
              </li>
            ))}
          </ol>

          <dl className="stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------- Experience ---------- */}
        <section id="work" className="block">
          <h2 className="mono">
            <span>01</span> experience
          </h2>
          <div className="timeline">
            {experience.map((job) => (
              <article key={job.company} className="job">
                <p className="period mono">{job.period}</p>
                <div>
                  <h3>{job.company}</h3>
                  <p className="jobtitle">{job.title}</p>
                  <ul>
                    {job.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <p className="chips">
                    {job.stack.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- Projects ---------- */}
        <section id="projects" className="block">
          <h2 className="mono">
            <span>02</span> projects
          </h2>
          <div className="grid-cards">
            {projects.map((p) => (
              <ProjectCard key={p.name} p={p} />
            ))}
          </div>
        </section>

        {/* ---------- Stack ---------- */}
        <section id="stack" className="block">
          <h2 className="mono">
            <span>03</span> stack
          </h2>
          <pre className="terminal mono">
            <span className="prompt">$ kubectl get skills -o wide</span>
            {"\n"}
            {skills.map((s) => (
              <span key={s.group}>
                <span className="key">{s.group.padEnd(14, " ")}</span>
                {s.items.join("  ·  ")}
                {"\n"}
              </span>
            ))}
          </pre>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="block">
          <h2 className="mono">
            <span>04</span> contact
          </h2>
          <div className="contactgrid">
            <div>
              <p className="big">Hiring for platform, SRE or infra? Want a collab with @fromcodetocloud?</p>
              <ul className="links">
                {profile.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noreferrer">
                      {l.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="mono">{profile.location} · deployed with monolayer on AWS</footer>
    </>
  );
}
