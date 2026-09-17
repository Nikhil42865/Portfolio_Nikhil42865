import { Link } from 'react-router-dom';
import { Home, Sparkles } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="section" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-5xl)',
            fontWeight: 800,
            color: 'var(--color-primary)',
            display: 'block',
            marginBottom: 'var(--space-2)',
            textShadow: '0 0 30px var(--color-primary-glow)',
          }}
        >
          404
        </span>

        <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
          Page Not Found
        </h1>

        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
          The page you are looking for doesn&apos;t exist, was moved, or has an outdated link.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} /> Return to Home
          </Link>
          <Link to="/start-project" className="btn btn-secondary">
            <Sparkles size={16} /> Start a Project
          </Link>
        </div>
      </div>
    </div>
  );
};
