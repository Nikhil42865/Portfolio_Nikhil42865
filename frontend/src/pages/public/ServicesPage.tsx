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
  FileText,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';

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
        return <Layers size={24} style={{ color: 'var(--color-primary)' }} />;
      case 'react-development':
        return <Code size={24} style={{ color: 'var(--color-primary)' }} />;
      case 'backend-api-development':
        return <Server size={24} style={{ color: 'var(--color-primary)' }} />;
      case 'ai-integration':
        return <Cpu size={24} style={{ color: 'var(--color-primary)' }} />;
      default:
        return <Wrench size={24} style={{ color: 'var(--color-primary)' }} />;
    }
  };

  return (
    <div className="section">
      <div className="container">
        {/* Page Header */}
        <SectionHeader
          align="left"
          eyebrow="Services & Solutions"
          title="Software Engineering Focused on Business Outcomes"
          description="Explore what I build and deliver for founders and teams. Transparent scopes, predictable milestones, direct developer communication, and full source code ownership."
        />

        {/* Quick Nav Chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: 'var(--space-12)',
          }}
        >
          {SERVICES_DATA.map((srv) => (
            <a
              key={srv.id}
              href={`#${srv.id}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-secondary)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--color-border-subtle)',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                textDecoration: 'none',
                transition: 'all var(--duration-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-primary)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-secondary)';
                e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
              }}
            >
              <span>{srv.title}</span>
            </a>
          ))}
        </div>

        {/* Services Deep Dive Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
          {SERVICES_DATA.map((srv, index) => (
            <Card
              key={srv.id}
              id={srv.id}
              variant="elevated"
              style={{
                padding: 'var(--space-8)',
                background: 'var(--color-surface)',
                scrollMarginTop: 'calc(var(--header-height) + 1.5rem)',
              }}
            >
              {/* Header Strip */}
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
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(56, 189, 248, 0.08)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                        display: 'block',
                      }}
                    >
                      Service 0{index + 1}
                    </span>
                    <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)' }}>
                      {srv.title}
                    </h2>
                  </div>
                </div>

                <Link
                  to={`/start-project?service=${encodeURIComponent(srv.formServiceValue)}`}
                  className="btn btn-primary btn-sm"
                >
                  <Sparkles size={14} />
                  <span>Start with this Service</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Tagline & Overview */}
              <p
                style={{
                  fontSize: 'var(--text-lg)',
                  color: 'var(--color-primary)',
                  fontWeight: 500,
                  marginBottom: 'var(--space-3)',
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
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 'var(--space-8)',
                  marginBottom: 'var(--space-8)',
                  padding: 'var(--space-6)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                {/* Deliverables */}
                <div>
                  <h3
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      letterSpacing: 'var(--tracking-wide)',
                      marginBottom: 'var(--space-3)',
                      color: 'var(--color-text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                    }}
                  >
                    <CheckCircle2 size={15} style={{ color: 'var(--color-success)' }} />
                    <span>What I Deliver:</span>
                  </h3>
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.45rem',
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {srv.deliverables.map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--color-text-secondary)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                        }}
                      >
                        <span style={{ color: 'var(--color-primary)', marginTop: '2px' }}>&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Example Tasks */}
                <div>
                  <h3
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      letterSpacing: 'var(--tracking-wide)',
                      marginBottom: 'var(--space-3)',
                      color: 'var(--color-text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                    }}
                  >
                    <FileText size={15} style={{ color: 'var(--color-primary)' }} />
                    <span>Typical Project Scope:</span>
                  </h3>
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.45rem',
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {srv.exampleTasks.map((t, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--color-text-secondary)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                        }}
                      >
                        <span style={{ color: 'var(--color-text-muted)', marginTop: '2px' }}>&bull;</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Scope & Requirements Footer */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-4)',
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid var(--color-border-subtle)',
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={15} style={{ color: 'var(--color-primary)' }} />
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                      Estimated Timeline: <strong style={{ color: 'var(--color-text-primary)' }}>{srv.timelineEstimate}</strong>
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                      Starting at: <strong style={{ color: 'var(--color-primary)' }}>{srv.pricingStarting}</strong>
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  Need: {srv.whatINeedFromYou}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Callout */}
        <div style={{ marginTop: 'var(--space-16)', textAlign: 'center' }}>
          <Card
            variant="glass"
            style={{
              padding: 'var(--space-8)',
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
              Need something custom or not listed here?
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
              I regularly handle custom full-stack solutions, legacy codebase migrations, and architectural consultations.
            </p>
            <Link to="/contact" className="btn btn-secondary">
              Contact Me Directly
              <ArrowRight size={15} />
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};
