import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, MessageSquare, Mail, Lock } from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { siteConfig } from '../../config/siteConfig';
import { Badge } from '../ui/Badge';

export const Footer: React.FC = () => {
  const whatsappUrl = siteConfig.getWhatsappUrl();

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-bg-alt)',
        borderTop: '1px solid var(--color-border-subtle)',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-8)',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-10)',
            marginBottom: 'var(--space-12)',
          }}
        >
          {/* Brand Col */}
          <div style={{ maxWidth: '340px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                marginBottom: 'var(--space-3)',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, #16233B, #0E1627)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    color: 'var(--color-primary)',
                  }}
                >
                  NK
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  color: 'var(--color-text-primary)',
                  letterSpacing: 'var(--tracking-tight)',
                }}
              >
                Nikhil Kumar
              </span>
            </div>

            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-4)',
                lineHeight: 'var(--leading-normal)',
              }}
            >
              Full-Stack &amp; AI Product Engineer building fast, dependable web applications,
              APIs, and practical AI integrations.
            </p>

            {/* Live Availability Indicator */}
            <Badge variant="success" dot pulseDot size="sm">
              Available for Q2/Q3 Projects
            </Badge>
          </div>

          {/* Core Services Links */}
          <div>
            <h4
              style={{
                fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-wider)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Services
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                padding: 0,
                margin: 0,
              }}
            >
              {SERVICES_DATA.slice(0, 5).map((srv) => (
                <li key={srv.id}>
                  <Link
                    to={`/services#${srv.id}`}
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                      textDecoration: 'none',
                      transition: 'color var(--duration-fast) var(--ease-standard)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                  >
                    {srv.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4
              style={{
                fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-wider)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Navigation
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                padding: 0,
                margin: 0,
              }}
            >
              {[
                { name: 'Projects Showcase', path: '/projects' },
                { name: 'About & Skills', path: '/about' },
                { name: 'Start a Project', path: '/start-project' },
                { name: 'Direct Contact', path: '/contact' },
                { name: 'Privacy Policy', path: '/privacy' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                      textDecoration: 'none',
                      transition: 'color var(--duration-fast) var(--ease-standard)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels & Social */}
          <div>
            <h4
              style={{
                fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-wider)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Get In Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition: 'color var(--duration-fast) var(--ease-standard)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#25D366')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                <MessageSquare size={16} style={{ color: '#25D366' }} />
                <span>+91 6202591561</span>
              </a>

              <a
                href="mailto:nikhil42865@gmail.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition: 'color var(--duration-fast) var(--ease-standard)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                <Mail size={16} style={{ color: 'var(--color-primary)' }} />
                <span>nikhil42865@gmail.com</span>
              </a>

              {/* Social Icon Pills */}
              <div style={{ display: 'flex', gap: '0.65rem', marginTop: 'var(--space-2)' }}>
                <a
                  href="https://github.com/nikhil42865"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-secondary)',
                    transition: 'all var(--duration-fast) var(--ease-standard)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                    e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                  }}
                >
                  <Github size={17} />
                </a>

                <a
                  href="https://linkedin.com/in/nikhil42865"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-secondary)',
                    transition: 'all var(--duration-fast) var(--ease-standard)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                    e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                  }}
                >
                  <Linkedin size={17} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div
          style={{
            paddingTop: 'var(--space-6)',
            borderTop: '1px solid var(--color-border-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} Nikhil Kumar. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <Link
              to="/privacy"
              style={{
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'color var(--duration-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              Privacy Policy
            </Link>

            <Link
              to="/admin/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'color var(--duration-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              <Lock size={12} />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
