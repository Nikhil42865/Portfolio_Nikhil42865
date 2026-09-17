import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { PROJECTS_DATA } from '../../data/projectsData';

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
          <p style={{ marginBottom: 'var(--space-6)' }}>
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
    <div className="section" style={{ paddingTop: 'var(--space-8)' }}>
      <div className="container">
        {/* Back Link */}
        <Link
          to="/projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-6)',
          }}
        >
          <ArrowLeft size={16} />
          Back to Projects Showcase
        </Link>

        {/* Case Study Header Banner */}
        <div
          className="card card-elevated"
          style={{
            padding: 'var(--space-10) var(--space-8)',
            background: 'linear-gradient(135deg, #18233D 0%, #0B1020 100%)',
            border: '1px solid var(--color-border)',
            marginBottom: 'var(--space-12)',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: 'var(--space-4)' }}>
            <span className="tag">{project.category}</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-primary)',
                background: 'rgba(110, 231, 242, 0.08)',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-border)',
              }}
            >
              Status: {project.status}
            </span>
          </div>

          <h1 style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>
            {project.title}
          </h1>

          <p
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-text-secondary)',
              maxWidth: '80ch',
              marginBottom: 'var(--space-8)',
            }}
          >
            {project.oneLiner}
          </p>

          {/* Quick Facts Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 'var(--space-4)',
              paddingTop: 'var(--space-6)',
              borderTop: '1px solid var(--color-border-subtle)',
            }}
          >
            <div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block' }}>
                Role
              </span>
              <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                {project.role}
              </strong>
            </div>

            <div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block' }}>
                Timeline
              </span>
              <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                {project.timeline}
              </strong>
            </div>

            <div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block' }}>
                Core Stack
              </span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)' }}>
                {project.tags.slice(0, 3).join(' · ')}
              </span>
            </div>
          </div>
        </div>

        {/* Structured Storytelling Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 300px',
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
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.7 }}>{project.problem}</p>
              <div
                style={{
                  marginTop: 'var(--space-4)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                  Target Users:
                </strong>{' '}
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  {project.targetUsers}
                </span>
              </div>
            </div>

            {/* 2. Solution Overview */}
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>
                The Solution
              </h2>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.7 }}>{project.solution}</p>
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
                  <div
                    key={idx}
                    className="card"
                    style={{
                      background: 'var(--color-surface)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.65rem',
                      padding: 'var(--space-4)',
                    }}
                  >
                    <CheckCircle2 size={18} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Architecture & Engineering Decisions */}
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
                Engineering Decisions &amp; Architecture
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {project.technicalDecisions.map((decision, idx) => (
                  <div
                    key={idx}
                    className="card"
                    style={{
                      background: 'var(--color-surface)',
                      borderLeft: '3px solid var(--color-primary)',
                      padding: 'var(--space-5)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                      <strong style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>
                        {decision.area}
                      </strong>
                      <span className="tag" style={{ fontSize: '0.7rem' }}>
                        {decision.choice}
                      </span>
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 0 }}>
                      {decision.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Difficult Challenge Solved */}
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>
                Difficult Challenge Solved
              </h2>
              <div
                className="card"
                style={{
                  background: 'rgba(251, 191, 36, 0.05)',
                  border: '1px solid rgba(251, 191, 36, 0.2)',
                  padding: 'var(--space-5)',
                }}
              >
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', marginBottom: 0 }}>
                  {project.challengesSolved}
                </p>
              </div>
            </div>

            {/* 6. Measurable Results */}
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>
                Results &amp; Impact
              </h2>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.7 }}>{project.results}</p>
            </div>
          </div>

          {/* Sticky Sidebar Column */}
          <div style={{ position: 'sticky', top: 'calc(var(--header-height) + 2rem)' }}>
            <div
              className="card card-elevated"
              style={{
                background: 'var(--color-surface)',
                padding: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-6)',
              }}
            >
              <div>
                <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-3)' }}>
                  Technologies Used
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-text-secondary)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '0.25rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Service Action */}
              <div
                style={{
                  paddingTop: 'var(--space-6)',
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
                  <Sparkles size={16} />
                  Request This Service &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .case-study-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
