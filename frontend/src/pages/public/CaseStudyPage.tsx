import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Layers,
  Clock,
  User,
  AlertTriangle,
} from 'lucide-react';
import { PROJECTS_DATA } from '../../data/projectsData';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';

export const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="section">
        <div className="container" style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
          <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
            Case Study Not Found
          </h1>
          <p style={{ marginBottom: 'var(--space-6)', color: 'var(--color-text-secondary)' }}>
            The case study you are looking for does not exist or has been moved.
          </p>
          <Link to="/projects" className="btn btn-primary">
            <ArrowLeft size={16} />
            Back to All Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ paddingTop: 'var(--space-6)' }}>
      <div className="container">
        {/* Back Navigation */}
        <Link
          to="/projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            fontSize: 'var(--text-xs)',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-6)',
            textDecoration: 'none',
            transition: 'color var(--duration-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
        >
          <ArrowLeft size={14} />
          <span>Back to Projects Showcase</span>
        </Link>

        {/* Case Study Header Banner */}
        <Card
          variant="elevated"
          style={{
            padding: 'var(--space-10) var(--space-8)',
            background:
              'linear-gradient(135deg, rgba(22, 35, 59, 0.95) 0%, rgba(14, 22, 39, 0.98) 100%)',
            border: '1px solid var(--color-border)',
            marginBottom: 'var(--space-12)',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: 'var(--space-4)' }}>
            <Badge variant="brand" size="sm">
              {project.category}
            </Badge>
            <Badge variant="subtle" size="sm">
              Status: {project.status}
            </Badge>
          </div>

          <h1
            style={{
              fontSize: 'var(--text-4xl)',
              marginBottom: 'var(--space-4)',
              letterSpacing: 'var(--tracking-tight)',
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-text-secondary)',
              maxWidth: '74ch',
              marginBottom: 'var(--space-8)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            {project.oneLiner}
          </p>

          {/* Quick Facts Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 'var(--space-4)',
              paddingTop: 'var(--space-6)',
              borderTop: '1px solid var(--color-border-subtle)',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: 'var(--text-2xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-wider)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  marginBottom: '0.2rem',
                }}
              >
                <User size={12} />
                Role
              </span>
              <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                {project.role}
              </strong>
            </div>

            <div>
              <span
                style={{
                  fontSize: 'var(--text-2xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-wider)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  marginBottom: '0.2rem',
                }}
              >
                <Clock size={12} />
                Timeline
              </span>
              <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                {project.timeline}
              </strong>
            </div>

            <div>
              <span
                style={{
                  fontSize: 'var(--text-2xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-wider)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  marginBottom: '0.2rem',
                }}
              >
                <Layers size={12} />
                Core Stack
              </span>
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-primary)',
                }}
              >
                {project.tags.slice(0, 3).join(' · ')}
              </span>
            </div>
          </div>
        </Card>

        {/* Structured Storytelling Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 320px',
            gap: 'var(--space-12)',
            alignItems: 'start',
          }}
          className="case-study-grid"
        >
          {/* Main Story Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            {/* 1. Problem & Context */}
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>
                The Problem &amp; Context
              </h2>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
                {project.problem}
              </p>
              <div
                style={{
                  marginTop: 'var(--space-4)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Target Users:
                </strong>{' '}
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginLeft: '0.35rem' }}>
                  {project.targetUsers}
                </span>
              </div>
            </div>

            {/* 2. Solution Overview */}
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>
                The Solution
              </h2>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
                {project.solution}
              </p>
            </div>

            {/* 3. Key Features Delivered */}
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
                Key Features Delivered
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: 'var(--space-4)',
                }}
              >
                {project.keyFeatures.map((feat, idx) => (
                  <Card
                    key={idx}
                    variant="raised"
                    padding="sm"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.65rem',
                    }}
                  >
                    <CheckCircle2
                      size={17}
                      style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }}
                    />
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                      {feat}
                    </span>
                  </Card>
                ))}
              </div>
            </div>

            {/* 4. Architecture & Decisions */}
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
                Engineering Decisions &amp; Architecture
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {project.technicalDecisions.map((decision, idx) => (
                  <Card
                    key={idx}
                    variant="default"
                    style={{
                      borderLeft: '3px solid var(--color-primary)',
                      padding: 'var(--space-5)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 'var(--space-2)',
                        gap: '0.5rem',
                      }}
                    >
                      <strong style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>
                        {decision.area}
                      </strong>
                      <Badge variant="brand" size="sm">
                        {decision.choice}
                      </Badge>
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 0 }}>
                      {decision.rationale}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* 5. Difficult Challenge Solved */}
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>
                Difficult Challenge Solved
              </h2>
              <Card
                variant="default"
                style={{
                  background: 'rgba(251, 191, 36, 0.05)',
                  border: '1px solid var(--color-warning-border)',
                  padding: 'var(--space-5)',
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'flex-start',
                }}
              >
                <AlertTriangle size={18} style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', marginBottom: 0, lineHeight: 1.6 }}>
                  {project.challengesSolved}
                </p>
              </Card>
            </div>

            {/* 6. Measurable Results */}
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>
                Results &amp; Impact
              </h2>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
                {project.results}
              </p>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div style={{ position: 'sticky', top: 'calc(var(--header-height) + 1.5rem)' }}>
            <Card
              variant="elevated"
              style={{
                padding: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-6)',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--tracking-wider)',
                    color: 'var(--color-text-muted)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  Technologies Used
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 'var(--text-2xs)',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-text-secondary)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--color-border-subtle)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {project.liveUrl && (
                <div style={{ paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border-subtle)' }}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ width: '100%', fontSize: 'var(--text-xs)' }}
                  >
                    <span>View Live Deployment</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}

              {/* Related Service Action */}
              <div
                style={{
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid var(--color-border-subtle)',
                }}
              >
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-muted)',
                    display: 'block',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Need something similar?
                </span>
                <Link
                  to={`/start-project?service=${encodeURIComponent(project.relatedServiceFormValue)}`}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <Sparkles size={15} />
                  <span>Request Similar Project</span>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .case-study-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
