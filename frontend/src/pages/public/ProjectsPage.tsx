import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, ArrowRight, X } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/projectsData';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { EmptyState } from '../../components/ui/EmptyState';

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
        <SectionHeader
          align="left"
          eyebrow="Engineering Showcase"
          title="Selected Works &amp; Architecture Case Studies"
          description="Explore production platforms, AI/ML pipelines, and resilient APIs built with clean design, strict TypeScript, and real business impact."
        />

        {/* Filter & Search Bar */}
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? PROJECTS_DATA.length
                  : PROJECTS_DATA.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;

              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.45rem 0.95rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--color-primary)' : 'transparent',
                    backgroundColor: isActive ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all var(--duration-fast)',
                  }}
                >
                  <span>{cat}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-2xs)',
                      padding: '0.1rem 0.4rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: isActive ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                      color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '300px',
            }}
          >
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              placeholder="Search stack, keyword, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input"
              style={{
                paddingLeft: '2.35rem',
                paddingRight: searchQuery ? '2rem' : '1rem',
                fontSize: 'var(--text-xs)',
                height: '38px',
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label="Clear Search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid or Empty State */}
        {filteredProjects.length === 0 ? (
          <EmptyState
            title="No projects found"
            description={`No case studies match your search "${searchQuery}" in category "${activeCategory}".`}
            action={
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="btn btn-secondary btn-sm"
              >
                Reset Filters
              </button>
            }
          />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {filteredProjects.map((proj) => (
              <Card
                key={proj.slug}
                variant="default"
                className="hover-lift"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'var(--color-surface)',
                  padding: 'var(--space-6)',
                }}
              >
                <div>
                  {/* Category & Status Bar */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    <Badge variant="brand" size="sm">
                      {proj.category}
                    </Badge>
                    <Badge variant="subtle" size="sm">
                      {proj.status}
                    </Badge>
                  </div>

                  <h2
                    style={{
                      fontSize: 'var(--text-xl)',
                      marginBottom: 'var(--space-2)',
                      letterSpacing: 'var(--tracking-tight)',
                    }}
                  >
                    {proj.title}
                  </h2>

                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                      marginBottom: 'var(--space-5)',
                      lineHeight: 'var(--leading-normal)',
                    }}
                  >
                    {proj.oneLiner}
                  </p>

                  {/* Highlights Pill Strip */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: 'var(--space-6)' }}>
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-2xs)',
                          color: 'var(--color-text-muted)',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid var(--color-border-subtle)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    paddingTop: 'var(--space-4)',
                    borderTop: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Link
                    to={`/projects/${proj.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      color: 'var(--color-primary)',
                      textDecoration: 'none',
                    }}
                  >
                    <span>Read Architecture Case Study</span>
                    <ArrowRight size={14} />
                  </Link>

                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-muted)',
                        textDecoration: 'none',
                      }}
                    >
                      <span>Live App</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
