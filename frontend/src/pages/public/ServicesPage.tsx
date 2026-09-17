import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Layers,
  Code,
  Server,
  Cpu,
  Wrench,
  CheckCircle2,
  Sparkles,
  Info,
  FileText,
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';

export const ServicesPage: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'website-development':
        return <Layers size={26} className="text-primary" />;
      case 'react-development':
        return <Code size={26} className="text-primary" />;
      case 'backend-api-development':
        return <Server size={26} className="text-primary" />;
      case 'ai-integration':
        return <Cpu size={26} className="text-primary" />;
      default:
        return <Wrench size={26} className="text-primary" />;
    }
  };

  return (
    <div className="section">
      <div className="container">
        {/* Page Header */}
        <div style={{ maxWidth: '800px', marginBottom: 'var(--space-12)' }}>
          <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
            Services &amp; Solutions
          </span>
          <h1 style={{ marginBottom: 'var(--space-4)' }}>
            Software Engineering Services Focused on Business Results
          </h1>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)' }}>
            Explore what I can deliver for your business. Every service comes with direct developer communication,
            transparent milestone delivery, and complete source code ownership.
          </p>
        </div>

        {/* Services Deep Dive List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          {SERVICES_DATA.map((srv, index) => (
            <div
              key={srv.id}
              id={srv.id}
              className="card card-elevated"
              style={{
                padding: 'var(--space-8)',
                background: 'var(--color-surface)',
                scrollMarginTop: 'calc(var(--header-height) + 2rem)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-6)',
                  paddingBottom: 'var(--space-6)',
                  borderBottom: '1px solid var(--color-border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(110, 231, 242, 0.08)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {getServiceIcon(srv.id)}
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-primary)',
                      }}
                    >
                      Service 0{index + 1}
                    </span>
                    <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-text-primary)' }}>
                      {srv.title}
                    </h2>
                  </div>
                </div>

                <Link
                  to={`/start-project?service=${encodeURIComponent(srv.formServiceValue)}`}
                  className="btn btn-primary"
                >
                  <Sparkles size={16} />
                  Start with this Service &rarr;
                </Link>
              </div>

              {/* Tagline & Overview */}
              <p
                style={{
                  fontSize: 'var(--text-lg)',
                  color: 'var(--color-primary)',
                  fontWeight: 500,
                  marginBottom: 'var(--space-4)',
                }}
              >
                {srv.tagline}
              </p>

              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                {srv.description}
              </p>

              {/* Grid of Deliverables and Tasks */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: 'var(--space-8)',
                  marginBottom: 'var(--space-8)',
                }}
              >
                {/* Deliverables */}
                <div>
                  <h3
                    style={{
                      fontSize: 'var(--text-base)',
                      marginBottom: 'var(--space-3)',
                      color: 'var(--color-text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <CheckCircle2 size={16} style={{ color: 'var(--color-success)' }} />
                    What I Deliver:
                  </h3>
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    {srv.deliverables.map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-text-secondary)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                        }}
                      >
                        <span style={{ color: 'var(--color-primary)', marginTop: '2px' }}>&bull;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Example Tasks */}
                <div>
                  <h3
                    style={{
                      fontSize: 'var(--text-base)',
                      marginBottom: 'var(--space-3)',
                      color: 'var(--color-text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <FileText size={16} style={{ color: 'var(--color-primary)' }} />
                    Typical Project Tasks:
                  </h3>
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    {srv.exampleTasks.map((t, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-text-secondary)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                        }}
                      >
                        <span style={{ color: 'var(--color-primary)', marginTop: '2px' }}>&bull;</span>
                        {t}
                      </li>
                    ))}
                  </ul>

                  {/* Proof Case Study Link */}
                  <div
                    style={{
                      marginTop: 'var(--space-6)',
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--color-border-subtle)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-text-muted)',
                        display: 'block',
                        marginBottom: '0.25rem',
                      }}
                    >
                      Evidence of Capability:
                    </span>
                    <Link
                      to={`/projects/${srv.proofProjectSlug}`}
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-primary)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontWeight: 600,
                      }}
                    >
                      {srv.proofProjectTitle} Case Study &rarr;
                    </Link>
                  </div>
                </div>
              </div>

              {/* Technologies strip */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '0.5rem',
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid var(--color-border-subtle)',
                }}
              >
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-muted)',
                    marginRight: '0.5rem',
                  }}
                >
                  Technologies:
                </span>
                {srv.technologies.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-text-secondary)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Future Roadmap Notice for Automation */}
        <div
          style={{
            marginTop: 'var(--space-12)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'rgba(18, 26, 46, 0.5)',
            border: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
          }}
        >
          <Info size={20} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontSize: 'var(--text-base)', marginBottom: '0.25rem' }}>
              Looking for Workflow Automation or Data Pipelines?
            </h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
              Dedicated productized automation services are officially scheduled for Version 2.
              However, if you have a custom automation inquiry or API integration, feel free to submit it via the{' '}
              <Link to="/start-project?service=Other">Project Intake form</Link> under &quot;Other&quot; for direct evaluation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
