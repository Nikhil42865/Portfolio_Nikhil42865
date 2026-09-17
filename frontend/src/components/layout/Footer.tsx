import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, MessageSquare, Mail, Shield, Lock } from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { siteConfig } from '../../config/siteConfig';

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
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--space-10)',
            marginBottom: 'var(--space-12)',
          }}
        >
          {/* Brand Col */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                marginBottom: 'var(--space-4)',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, #18233D, #121A2E)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
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
                  fontSize: '1.1rem',
                  color: 'var(--color-text-primary)',
                }}
              >
                Nikhil Kumar
              </span>
            </div>

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
              I build polished web applications, reliable APIs, and practical AI-powered products.
              Turning requirements into reliable software.
            </p>

            {/* Availability Indicator */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(52, 211, 153, 0.1)',
                border: '1px solid rgba(52, 211, 153, 0.25)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-success)',
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-success)',
                  display: 'inline-block',
                  boxShadow: '0 0 8px var(--color-success)',
                }}
              />
              Available for new projects
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 'var(--space-4)',
              }}
            >
              Platform
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <Link to="/" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  Selected Projects
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  About & Skills
                </Link>
              </li>
              <li>
                <Link to="/start-project" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)', fontWeight: 600 }}>
                  Start a Project &rarr;
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 'var(--space-4)',
              }}
            >
              Core Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <Link
                    to={`/services#${srv.id}`}
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}
                  >
                    {srv.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels */}
          <div>
            <h4
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 'var(--space-4)',
              }}
            >
              Connect Directly
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <MessageSquare size={16} style={{ color: '#25D366' }} />
                WhatsApp Message
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <Mail size={16} style={{ color: 'var(--color-primary)' }} />
                {siteConfig.contact.email}
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <Github size={16} />
                GitHub Profile
              </a>
              <a
                href={siteConfig.social.linkedin.startsWith('http') ? siteConfig.social.linkedin : `https://${siteConfig.social.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <Linkedin size={16} style={{ color: '#0077B5' }} />
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
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
            &copy; {new Date().getFullYear()} Nikhil Kumar. Built with React & TypeScript. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link
              to="/privacy"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: 'var(--color-text-muted)',
              }}
            >
              <Shield size={13} />
              Privacy Policy
            </Link>

            <Link
              to="/admin/login"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: 'var(--color-text-muted)',
                opacity: 0.7,
              }}
            >
              <Lock size={12} />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
