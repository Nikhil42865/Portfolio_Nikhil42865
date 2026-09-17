import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--header-height)',
          zIndex: 1000,
          transition: 'all var(--duration-fast) var(--ease-standard)',
          backgroundColor: isScrolled ? 'rgba(11, 16, 32, 0.85)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--color-border-subtle)' : '1px solid transparent',
        }}
      >
        <div
          className="container"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              textDecoration: 'none',
              color: 'var(--color-text-primary)',
            }}
            aria-label="Nikhil Kumar Home"
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #18233D, #121A2E)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: 'var(--color-primary)',
                  letterSpacing: '-0.05em',
                }}
              >
                NK
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  letterSpacing: '-0.01em',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.1,
                }}
              >
                Nikhil Kumar
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.02em',
                }}
              >
                Full-Stack & AI Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2rem',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: 'var(--text-sm)',
                  position: 'relative',
                  padding: '0.25rem 0',
                })}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link
              to="/start-project"
              className="btn btn-primary btn-sm desktop-cta"
              style={{
                display: 'none',
                boxShadow: '0 2px 14px rgba(110, 231, 242, 0.25)',
              }}
            >
              <Sparkles size={15} />
              Start a Project
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-toggle"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--color-border-subtle)',
                color: 'var(--color-text-primary)',
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
              }}
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          style={{
            position: 'fixed',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(11, 16, 32, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 999,
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              marginTop: 'var(--space-4)',
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  fontSize: 'var(--text-xl)',
                  fontWeight: 600,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--color-border-subtle)',
                })}
              >
                {link.name}
                <ArrowUpRight size={18} style={{ opacity: 0.5 }} />
              </NavLink>
            ))}
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link
              to="/start-project"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%', padding: '1rem' }}
            >
              <Sparkles size={18} />
              Start a Project
            </Link>
            <p style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              Quick response via Email & WhatsApp within 24h
            </p>
          </div>
        </div>
      )}

      {/* Media query styling in JSX */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-cta {
            display: inline-flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
