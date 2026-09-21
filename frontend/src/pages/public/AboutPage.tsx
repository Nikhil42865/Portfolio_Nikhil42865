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
  ShieldCheck,
  Zap,
  Terminal,
  ArrowRight,
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';

export const AboutPage: React.FC = () => {
  const skillCategories = [
    {
      title: 'Frontend & UI Engineering',
      icon: <Code size={20} style={{ color: 'var(--color-primary)' }} />,
      skills: [
        'React 19',
        'TypeScript',
        'Modern JavaScript (ES2022+)',
        'Vite',
        'Vanilla CSS & CSS Modules',
        'Responsive Layouts & CSS Grid',
        'WCAG 2.2 AA Accessibility',
      ],
    },
    {
      title: 'Backend & API Architecture',
      icon: <Server size={20} style={{ color: 'var(--color-primary)' }} />,
      skills: [
        'Node.js',
        'Express',
        'RESTful API Design',
        'Zod Schema Validation',
        'JWT & Secure Cookie Auth',
        'Rate Limiting & Security (Helmet)',
        'Error Envelope Standardization',
      ],
    },
    {
      title: 'Databases & Storage',
      icon: <Database size={20} style={{ color: 'var(--color-primary)' }} />,
      skills: [
        'MongoDB & Mongoose',
        'Database Indexing & Queries',
        'Geospatial 2dsphere Queries',
        'File Storage & Upload Pipelines',
        'Data Modeling & Normalization',
      ],
    },
    {
      title: 'AI Integration & Deployment',
      icon: <Cpu size={20} style={{ color: 'var(--color-primary)' }} />,
      skills: [
        'Gemini & OpenAI API Integration',
        'Structured JSON Generation',
        'RAG & Vector Embeddings Basics',
        'Python & ML Pipelines',
        'Render, Vercel & Cloud Deployments',
        'Automated CI/CD Workflows',
      ],
    },
  ];

  const whatsappUrl = siteConfig.getWhatsappUrl(
    'Hi Nikhil, I reviewed your background and would like to discuss working together.'
  );

  return (
    <div className="section">
      <div className="container">
        {/* Intro Hero Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-12)',
            alignItems: 'center',
            marginBottom: 'var(--space-20)',
          }}
        >
          <div>
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <Badge variant="brand" size="sm">
                Developer Profile
              </Badge>
            </div>

            <h1 style={{ marginBottom: 'var(--space-4)' }}>
              Hi, I&apos;m Nikhil Kumar.
            </h1>

            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--color-primary)',
                fontWeight: 500,
                marginBottom: 'var(--space-4)',
              }}
            >
              Full-Stack Developer, API Architect &amp; AI Product Integrator.
            </p>

            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)', lineHeight: 1.65 }}>
              I help founders, businesses, and engineering teams build dependable web applications.
              My focus is on writing clean, maintainable code that solves real business problems rather than
              accumulating technical debt.
            </p>

            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', lineHeight: 1.65 }}>
              Whether you need a responsive landing page, a complex React dashboard, a resilient Express API, or
              pragmatic AI workflows, I take pride in delivering software that feels fast, looks premium, and works reliably.
            </p>

            {/* Quick Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <Link to="/start-project" className="btn btn-primary">
                <Sparkles size={16} />
                Start a Project
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <MessageSquare size={16} style={{ color: '#25D366' }} />
                <span>WhatsApp Message</span>
              </a>
            </div>
          </div>

          {/* Terminal / Code Card */}
          <Card
            variant="elevated"
            style={{
              background: '#070B14',
              border: '1px solid var(--color-border)',
              padding: 'var(--space-6)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              lineHeight: 1.6,
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
              <Terminal size={15} style={{ color: 'var(--color-primary)' }} />
              <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-2xs)' }}>
                nikhil_profile.json
              </span>
            </div>

            <pre style={{ margin: 0, overflowX: 'auto' }}>
              <code>
                {`{
  "name": "Nikhil Kumar",
  "title": "Full-Stack & AI Engineer",
  "location": "India (IST, UTC+5:30)",
  "education": "B.Tech Computer Science",
  "experience_focus": [
    "Production React 19 / TypeScript",
    "Node.js Microservices & REST APIs",
    "MongoDB Schema Design",
    "AI APIs (Gemini, OpenAI, Claude)",
    "Clean Code & Zero-Tech-Debt"
  ],
  "availability": "Accepting Selected Q2/Q3 Projects",
  "typical_response_time": "< 24 hours",
  "communication": ["WhatsApp", "Email", "Slack"]
}`}
              </code>
            </pre>
          </Card>
        </div>

        {/* Skill Matrix Grid */}
        <div style={{ marginBottom: 'var(--space-20)' }}>
          <SectionHeader
            eyebrow="Technical Stack"
            title="Core Competencies &amp; Toolkit"
            description="Proven technologies used across client applications and production deployments."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {skillCategories.map((category) => (
              <Card
                key={category.title}
                variant="raised"
                style={{
                  padding: 'var(--space-6)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: 'var(--space-4)' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(56, 189, 248, 0.08)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {category.icon}
                  </div>
                  <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>
                    {category.title}
                  </h3>
                </div>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem',
                  }}
                >
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                      }}
                    >
                      <CheckCircle2 size={13} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Engineering Philosophies */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <SectionHeader
            eyebrow="Principles"
            title="How I Approach Engineering"
            description="The mental models and discipline I bring to every product engagement."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {[
              {
                icon: <Zap size={20} style={{ color: 'var(--color-primary)' }} />,
                title: 'Clarity Over Cleverness',
                desc: 'Code is read far more often than it is written. I prefer explicit, well-tested TypeScript and straightforward architecture over opaque abstractions.',
              },
              {
                icon: <ShieldCheck size={20} style={{ color: 'var(--color-success)' }} />,
                title: 'Reliability Before Flashiness',
                desc: 'A gorgeous UI is meaningless if form validation drops requests or an API silently fails. Every feature is built with robust error handling, schema guards, and resilience.',
              },
              {
                icon: <MessageSquare size={20} style={{ color: 'var(--color-warning)' }} />,
                title: 'Prompt, Transparent Communication',
                desc: 'No ghosting or ambiguous delays. You get regular progress reports, immediate flagging of blockers, and clear technical explanations without jargon.',
              },
            ].map((phil) => (
              <Card
                key={phil.title}
                variant="default"
                style={{
                  padding: 'var(--space-6)',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {phil.icon}
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                  {phil.title}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {phil.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <Card
          variant="glass"
          style={{
            padding: 'var(--space-10) var(--space-8)',
            textAlign: 'center',
            maxWidth: '720px',
            margin: '0 auto',
          }}
        >
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>
            Let&apos;s Build Something Dependable Together
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
            Have an application idea, an existing codebase that needs polish, or an API you need built right?
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            <Link to="/start-project" className="btn btn-primary">
              <Sparkles size={16} />
              Start a Project Request
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Direct Contact
              <ArrowRight size={15} />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
