import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/projectsData';

export const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Full Stack', 'AI/ML'];

  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    const matchesCategory =
      activeCategory === 'All' || proj.category.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      searchQuery.trim() === '' ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.oneLiner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="section">
      <div className="container">
        {/* Page Header */}
        <div style={{ maxWidth: '800px', marginBottom: 'var(--space-10)' }}>
          <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
            Project Showcase
          </span>
          <h1 style={{ marginBottom: 'var(--space-4)' }}>Selected Works &amp; Engineering Case Studies</h1>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)' }}>
            Explore full-stack platforms, machine learning diagnostics, and API architectures built with clean
            design, strict TypeScript, and high reliability.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-10)',
            padding: 'var(--space-4)',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid',
                  borderColor:
                    activeCategory === cat ? 'var(--color-primary)' : 'var(--color-border-subtle)',
                  backgroundColor:
                    activeCategory === cat ? 'rgba(110, 231, 242, 0.12)' : 'transparent',
                  color:
                    activeCategory === cat ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all var(--duration-fast) var(--ease-standard)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '320px',
            }}
          >
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
              }}
            />
            <input
              type="text"
              placeholder="Search by title, tag, stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input"
              style={{
                paddingLeft: '2.4rem',
                paddingTop: '0.55rem',
                paddingBottom: '0.55rem',
                fontSize: 'var(--text-sm)',
              }}
              aria-label="Search projects"
            />
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div
            className="card"
            style={{
              textAlign: 'center',
              padding: 'var(--space-16) var(--space-4)',
              color: 'var(--color-text-muted)',
            }}
          >
            <p style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
              No projects found matching your search.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: 'var(--space-2)' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {filteredProjects.map((proj) => (
              <div
                key={proj.slug}
                className="card hover-lift"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 0,
                  overflow: 'hidden',
                  background: 'var(--color-surface)',
                }}
              >
                {/* Visual Header */}
                <div
                  style={{
                    height: '210px',
                    background: 'linear-gradient(135deg, #18233D 0%, #0B1020 100%)',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    padding: 'var(--space-6)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="tag tag-subtle">{proj.category}</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-primary)',
                      }}
                    >
                      {proj.status}
                    </span>
                  </div>

                  <div>
                    <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)' }}>
                      {proj.title}
                    </h2>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      Role: {proj.role} · {proj.timeline}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div
                  style={{
                    padding: 'var(--space-6)',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                      {proj.oneLiner}
                    </p>

                    {/* Tech Stack */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.35rem',
                        marginBottom: 'var(--space-6)',
                      }}
                    >
                      {proj.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: '0.72rem',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--color-text-muted)',
                            background: 'rgba(255, 255, 255, 0.04)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: 'var(--radius-sm)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      paddingTop: 'var(--space-4)',
                      borderTop: '1px solid var(--color-border-subtle)',
                    }}
                  >
                    <Link
                      to={`/projects/${proj.slug}`}
                      className="btn btn-secondary"
                      style={{ width: '100%' }}
                    >
                      Read In-Depth Case Study &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Callout */}
        <div
          style={{
            marginTop: 'var(--space-16)',
            textAlign: 'center',
            padding: 'var(--space-10)',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          <h3 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
            Need a similar application or technical architecture?
          </h3>
          <p style={{ marginInline: 'auto', marginBottom: 'var(--space-6)' }}>
            I can build custom full-stack solutions with modern frontends, performant APIs, and practical AI integrations.
          </p>
          <Link to="/start-project" className="btn btn-primary">
            <Sparkles size={16} />
            Start Your Project Requirement &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
