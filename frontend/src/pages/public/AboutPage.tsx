import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Code,
  Server,
  Database,
  Cpu,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const AboutPage: React.FC = () => {
  const skillCategories = [
    {
      title: 'Frontend & UI Engineering',
      icon: <Code size={20} className="text-primary" />,
      skills: ['React 19', 'TypeScript', 'Modern JavaScript (ES2022+)', 'Vite', 'Vanilla CSS & CSS Modules', 'Responsive Layouts & CSS Grid', 'WCAG 2.2 AA Accessibility'],
    },
    {
      title: 'Backend & API Architecture',
      icon: <Server size={20} className="text-primary" />,
      skills: ['Node.js', 'Express', 'RESTful API Design', 'Zod Schema Validation', 'JWT & Secure Cookie Auth', 'Rate Limiting & Security (Helmet)', 'Error Handling Envelopes'],
    },
    {
      title: 'Databases & Storage',
      icon: <Database size={20} className="text-primary" />,
      skills: ['MongoDB & Mongoose', 'Database Indexing & Queries', 'Geospatial 2dsphere Queries', 'Object Storage (Cloudinary / S3)', 'Data Modeling & Validation'],
    },
    {
      title: 'AI Integration & DevOps',
      icon: <Cpu size={20} className="text-primary" />,
      skills: ['OpenAI / Gemini / Anthropic APIs', 'Structured JSON Output Generation', 'RAG Concepts & Embedding Search', 'Python & Machine Learning Basics', 'Git / GitHub CI/CD', 'Vercel, Render & Railway Deployments'],
    },
  ];

  const whatsappUrl = siteConfig.getWhatsappUrl(
    'Hi Nikhil, I saw your profile on your portfolio and wanted to reach out.'
  );

  return (
    <div className="section">
      <div className="container">
        {/* Intro Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-12)',
            alignItems: 'center',
            marginBottom: 'var(--space-16)',
          }}
        >
          <div>
            <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
              Developer Profile
            </span>
            <h1 style={{ marginBottom: 'var(--space-4)' }}>
              Hi, I&apos;m Nikhil Kumar.
            </h1>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-primary)', fontWeight: 500, marginBottom: 'var(--space-4)' }}>
              Full-Stack Developer, API Architect &amp; AI Product Integrator.
            </p>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
              I help founders, businesses, and engineering teams build dependable web applications.
              My focus is on writing clean, maintainable code that solves real business problems rather than
              accumulating technical debt.
            </p>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
              Whether you need a responsive landing page, a complex React dashboard, a resilient Express API, or
              pragmatic AI workflows, I take pride in delivering software that feels fast, looks premium, and works reliably.
            </p>

            {/* Quick Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <Link to="/start-project" className="btn btn-primary">
                <Sparkles size={16} />
                Start a Project
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <MessageSquare size={16} style={{ color: '#25D366' }} />
                WhatsApp Message
              </a>
            </div>
          </div>

          {/* Terminal / Code Composition */}
          <div
            className="card card-elevated"
            style={{
              background: '#070B14',
              border: '1px solid var(--color-border)',
              padding: 'var(--space-6)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-sm)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: 'var(--space-4)',
                paddingBottom: 'var(--space-3)',
                borderBottom: '1px solid var(--color-border-subtle)',
              }}
            >
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FB7185' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FBBF24' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34D399' }} />
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginLeft: 'auto' }}>
                developer-summary.ts
              </span>
            </div>

            <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
              <span style={{ color: 'var(--color-primary)' }}>const</span> developer = &#123;
              <br />
              &nbsp;&nbsp;name: <span style={{ color: '#34D399' }}>&apos;Nikhil Kumar&apos;</span>,
              <br />
              &nbsp;&nbsp;focus: <span style={{ color: '#34D399' }}>&apos;Full-Stack Web &amp; AI&apos;</span>,
              <br />
              &nbsp;&nbsp;location: <span style={{ color: '#34D399' }}>&apos;India (Remote Worldwide)&apos;</span>,
              <br />
              &nbsp;&nbsp;principles: [
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#FBBF24' }}>&apos;Direct Communication&apos;</span>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#FBBF24' }}>&apos;Type-Safe Contracts&apos;</span>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#FBBF24' }}>&apos;Defensive Validation&apos;</span>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#FBBF24' }}>&apos;Performant Fluid UI&apos;</span>,
              <br />
              &nbsp;&nbsp;],
              <br />
              &nbsp;&nbsp;availability: <span style={{ color: '#34D399' }}>&apos;Available for V1 Client Work&apos;</span>,
              <br />
              &#125;;
            </div>
          </div>
        </div>

        {/* Verified Technical Skills Matrix */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <span className="tag" style={{ marginBottom: 'var(--space-2)' }}>
              Technical Competence
            </span>
            <h2>Skills &amp; Capabilities</h2>
            <p style={{ marginInline: 'auto' }}>
              Technologies I work with hands-on on a regular basis.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {skillCategories.map((cat, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  background: 'var(--color-surface)',
                  padding: 'var(--space-6)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: 'var(--space-4)' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(110, 231, 242, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {cat.icon}
                  </div>
                  <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>
                    {cat.title}
                  </h3>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {cat.skills.map((s) => (
                    <li
                      key={s}
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <CheckCircle2 size={14} style={{ color: 'var(--color-primary)' }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Working Principles */}
        <div
          className="card card-elevated"
          style={{
            padding: 'var(--space-10) var(--space-8)',
            background: 'linear-gradient(135deg, #18233D 0%, #121A2E 100%)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
              How I Approach Every Project
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
              I believe great software is built through clarity, frequent updates, and thorough testing.
              When we work together, you get someone who genuinely cares about your product outcome.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--space-6)',
                textAlign: 'left',
              }}
            >
              <div>
                <h4 style={{ fontSize: 'var(--text-base)', color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
                  1. Understand First
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                  I make sure we agree on requirements and outcomes before writing code.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: 'var(--text-base)', color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
                  2. Regular Demos
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                  You see working progress regularly so there are zero surprises at delivery.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: 'var(--text-base)', color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
                  3. Clean Handover
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                  Complete code repository, documentation, deployment, and post-delivery support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
