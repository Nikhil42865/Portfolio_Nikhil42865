import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Code,
  Server,
  Cpu,
  Layers,
  Wrench,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { PROJECTS_DATA } from '../../data/projectsData';
import { siteConfig } from '../../config/siteConfig';

export const HomePage: React.FC = () => {
  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'website-development':
        return <Layers size={22} className="text-primary" />;
      case 'react-development':
        return <Code size={22} className="text-primary" />;
      case 'backend-api-development':
        return <Server size={22} className="text-primary" />;
      case 'ai-integration':
        return <Cpu size={22} className="text-primary" />;
      default:
        return <Wrench size={22} className="text-primary" />;
    }
  };

  const whatsappUrl = siteConfig.getWhatsappUrl('Hi Nikhil, I have a project/bug fix question.');

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          paddingTop: 'calc(var(--space-16) + 1.5rem)',
          paddingBottom: 'var(--space-16)',
          position: 'relative',
        }}
      >
        {/* Subtle Ambient Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '650px',
            height: '420px',
            background: 'radial-gradient(ellipse at center, rgba(110, 231, 242, 0.12) 0%, rgba(34, 184, 207, 0.04) 50%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
            {/* Eyebrow Badge */}
            <div
              className="animate-fade-in-down"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.95rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(110, 231, 242, 0.08)',
                border: '1px solid var(--color-border)',
                marginBottom: 'var(--space-6)',
              }}
            >
              <Sparkles size={14} style={{ color: 'var(--color-primary)' }} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                Full-Stack Developer · API Engineering · AI Integration
              </span>
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-in-up delay-100"
              style={{
                marginBottom: 'var(--space-6)',
                lineHeight: 1.15,
              }}
            >
              I build polished web applications, reliable APIs, and practical AI-powered products.
            </h1>

            {/* Supporting Copy */}
            <p
              className="animate-fade-in-up delay-150"
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-8)',
                marginInline: 'auto',
              }}
            >
              From focused bug fixes and landing pages to complete full-stack products,
              I turn requirements into reliable, production-ready software.
            </p>

            {/* Primary Action Buttons */}
            <div
              className="animate-fade-in-up delay-200"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: 'var(--space-12)',
              }}
            >
              <Link to="/start-project" className="btn btn-primary btn-lg">
                <Sparkles size={18} />
                Start a Project
              </Link>
              <Link to="/projects" className="btn btn-secondary btn-lg">
                View My Work
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Tech Trust Strip */}
            <div
              className="animate-fade-in delay-300"
              style={{
                paddingTop: 'var(--space-8)',
                borderTop: '1px solid var(--color-border-subtle)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.75rem',
                fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-muted)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--color-primary)' }} />
                React & TypeScript
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--color-primary)' }} />
                Node.js & Express APIs
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--color-primary)' }} />
                MongoDB Architecture
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--color-primary)' }} />
                AI / LLM Integration
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--color-primary)' }} />
                Responsive Delivery
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES PREVIEW SECTION */}
      <section className="section" style={{ backgroundColor: 'rgba(18, 26, 46, 0.35)' }}>
        <div className="container">
          <div style={{ marginBottom: 'var(--space-10)', textAlign: 'center' }}>
            <span className="tag" style={{ marginBottom: 'var(--space-2)' }}>
              Core Capabilities
            </span>
            <h2>What I Can Build For You</h2>
            <p style={{ marginInline: 'auto' }}>
              Clear deliverables tailored to your product stage—without technical confusion.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {SERVICES_DATA.map((srv) => (
              <div
                key={srv.id}
                className="card hover-lift"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'var(--color-surface)',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(110, 231, 242, 0.08)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    {getServiceIcon(srv.id)}
                  </div>

                  <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
                    {srv.title}
                  </h3>

                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                    {srv.tagline}
                  </p>

                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        display: 'block',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      Typical Tasks:
                    </span>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {srv.exampleTasks.map((t, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-text-secondary)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.4rem',
                          }}
                        >
                          <span style={{ color: 'var(--color-primary)', marginTop: '2px' }}>&bull;</span>
                          {t}
                        </li>
                      ))}
                    </ul>
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
                    to={`/services#${srv.id}`}
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    Learn more &rarr;
                  </Link>

                  <Link
                    to={`/start-project?service=${encodeURIComponent(srv.formServiceValue)}`}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: 'var(--text-xs)' }}
                  >
                    Start with this &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/services" className="btn btn-ghost">
              Explore detailed service breakdown &amp; deliverables &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED SELECTED PROJECTS */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-10)',
            }}
          >
            <div>
              <span className="tag" style={{ marginBottom: 'var(--space-2)' }}>
                Evidence of Work
              </span>
              <h2>Featured Case Studies</h2>
              <p>Real problems, architectural decisions, and working implementations.</p>
            </div>
            <Link to="/projects" className="btn btn-secondary btn-sm">
              View All Projects &rarr;
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {PROJECTS_DATA.map((proj) => (
              <div
                key={proj.slug}
                className="card hover-lift"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 0,
                  overflow: 'hidden',
                }}
              >
                {/* Project Media Mockup Area */}
                <div
                  style={{
                    height: '190px',
                    background: 'linear-gradient(135deg, #18233D 0%, #0B1020 100%)',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    padding: 'var(--space-6)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
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
                    <h3 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)' }}>
                      {proj.title}
                    </h3>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      {proj.role}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
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

                    {/* Tech Stack Tags */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.35rem',
                        marginBottom: 'var(--space-6)',
                      }}
                    >
                      {proj.tags.slice(0, 5).map((t) => (
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
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: 'var(--space-4)',
                      borderTop: '1px solid var(--color-border-subtle)',
                    }}
                  >
                    <Link
                      to={`/projects/${proj.slug}`}
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%' }}
                    >
                      Read Case Study &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW I WORK */}
      <section className="section" style={{ backgroundColor: 'rgba(18, 26, 46, 0.25)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <span className="tag" style={{ marginBottom: 'var(--space-2)' }}>
              Transparent Process
            </span>
            <h2>How We Work Together</h2>
            <p style={{ marginInline: 'auto' }}>
              No surprises. You will always know what is being built, when it will be delivered, and how much it costs.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {[
              {
                step: '01',
                title: 'Share Requirement',
                desc: 'Submit your project details or bug fix via the guided form. No payment required to start.',
              },
              {
                step: '02',
                title: 'Scope & Quote',
                desc: 'I review your specs, clarify questions, and propose a transparent fixed timeline and quote.',
              },
              {
                step: '03',
                title: 'Build & Update',
                desc: 'I build the solution with regular milestones, live demo previews, and clear communication.',
              },
              {
                step: '04',
                title: 'Handover & Support',
                desc: 'Comprehensive testing, deployment to production, and full handover with documentation.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="card"
                style={{
                  background: 'var(--color-surface)',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: 'var(--text-2xl)',
                    color: 'var(--color-primary)',
                    display: 'block',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {item.step}
                </span>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 'var(--space-8)',
              padding: 'var(--space-4) var(--space-6)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(110, 231, 242, 0.05)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              textAlign: 'center',
            }}
          >
            <ShieldCheck size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
              <strong>Zero Risk:</strong> Submitting a project requirement is 100% free. Work begins only after scope, pricing, and timeline are mutually agreed.
            </span>
          </div>
        </div>
      </section>

      {/* 5. WHY WORK WITH ME */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
              <span className="tag" style={{ marginBottom: 'var(--space-2)' }}>
                Direct Accountability
              </span>
              <h2>Why Clients Work With Me</h2>
              <p style={{ marginInline: 'auto' }}>
                You work directly with an experienced engineer—not through agency account managers or layers of communication.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'var(--space-6)',
              }}
            >
              {[
                {
                  title: 'Full-Stack Ownership',
                  desc: 'From clean React frontends to hardened Express APIs and MongoDB indexing, I handle the whole architecture seamlessly.',
                },
                {
                  title: 'Clear Communication',
                  desc: 'No confusing tech jargon. I explain options clearly so you can make informed decisions for your business.',
                },
                {
                  title: 'Production Quality First',
                  desc: 'Strict TypeScript, responsive CSS, mobile testing, and defensive validation come standard on every project.',
                },
                {
                  title: 'Practical AI Experience',
                  desc: 'I integrate LLMs and machine learning where they actually deliver business utility, not just as marketing buzzwords.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: 'var(--space-5)',
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-subtle)',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(110, 231, 242, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: 'var(--color-primary)',
                    }}
                  >
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 'var(--text-base)', marginBottom: '0.25rem' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. DUAL CONVERSION SECTION */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div
            className="card card-elevated"
            style={{
              padding: 'var(--space-12) var(--space-8)',
              background: 'linear-gradient(135deg, #18233D 0%, #121A2E 100%)',
              border: '1px solid var(--color-border)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
              <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
                Let&apos;s Build
              </span>
              <h2 style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>
                Have a project—or just one stubborn bug?
              </h2>
              <p
                style={{
                  fontSize: 'var(--text-lg)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-8)',
                  marginInline: 'auto',
                }}
              >
                Whether you need an end-to-end web application or quick assistance fixing a production defect,
                I am here to help.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 'var(--space-6)',
                  textAlign: 'left',
                }}
              >
                {/* Option 1: Start a Project */}
                <div
                  style={{
                    backgroundColor: 'rgba(11, 16, 32, 0.6)',
                    padding: 'var(--space-6)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
                      Scoped Project Request
                    </h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                      Ideal for new websites, full-stack React applications, API design, or AI feature integration.
                    </p>
                  </div>
                  <Link to="/start-project" className="btn btn-primary" style={{ width: '100%' }}>
                    <Sparkles size={16} />
                    Start Project Intake &rarr;
                  </Link>
                </div>

                {/* Option 2: WhatsApp Quick Chat */}
                <div
                  style={{
                    backgroundColor: 'rgba(11, 16, 32, 0.6)',
                    padding: 'var(--space-6)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
                      Direct WhatsApp Chat
                    </h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                      Ideal for quick technical questions, urgent bug fixes, or preliminary scope discussions.
                    </p>
                  </div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ width: '100%' }}
                  >
                    <MessageSquare size={16} style={{ color: '#25D366' }} />
                    Message on WhatsApp &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
