import React, { useState } from 'react';
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
  Clock,
  ShieldCheck,
  MessageSquare,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { PROJECTS_DATA } from '../../data/projectsData';
import { siteConfig } from '../../config/siteConfig';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';

export const HomePage: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'api' | 'ai' | 'infra'>('api');

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'website-development':
        return <Layers size={22} style={{ color: 'var(--color-primary)' }} />;
      case 'react-development':
        return <Code size={22} style={{ color: 'var(--color-primary)' }} />;
      case 'backend-api-development':
        return <Server size={22} style={{ color: 'var(--color-primary)' }} />;
      case 'ai-integration':
        return <Cpu size={22} style={{ color: 'var(--color-primary)' }} />;
      default:
        return <Wrench size={22} style={{ color: 'var(--color-primary)' }} />;
    }
  };

  const whatsappUrl = siteConfig.getWhatsappUrl('Hi Nikhil, I have a project requirement to discuss.');

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* =====================================================================
          1. HERO SECTION
          ===================================================================== */}
      <section
        style={{
          paddingTop: 'calc(var(--space-16) + 1rem)',
          paddingBottom: 'var(--space-16)',
          position: 'relative',
        }}
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '460px',
            background:
              'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.12) 0%, rgba(45, 212, 191, 0.04) 45%, transparent 70%)',
            filter: 'blur(70px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
            {/* Live Availability Eyebrow */}
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <Badge variant="brand" dot pulseDot>
                Available for Engineering Projects
              </Badge>
            </div>

            {/* Main Headline */}
            <h1
              className="animate-fade-in-up"
              style={{
                marginBottom: 'var(--space-5)',
                fontSize: 'var(--text-5xl)',
                letterSpacing: 'var(--tracking-tight)',
              }}
            >
              I build dependable web apps,{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent-teal))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                resilient APIs
              </span>
              , and practical AI products.
            </h1>

            {/* Supporting Copy */}
            <p
              className="animate-fade-in-up delay-100"
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-8)',
                marginInline: 'auto',
                maxWidth: '68ch',
              }}
            >
              From focused feature enhancements and responsive redesigns to end-to-end full-stack
              software. Built with strict TypeScript, clean architecture, and reliable delivery.
            </p>

            {/* Primary Action Buttons */}
            <div
              className="animate-fade-in-up delay-150"
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
                <Sparkles size={17} />
                Start a Project
              </Link>
              <Link to="/projects" className="btn btn-secondary btn-lg">
                View Case Studies
                <ArrowRight size={17} />
              </Link>
            </div>

            {/* Interactive Architecture Preview (Product Visualization) */}
            <div
              className="animate-fade-in-up delay-200"
              style={{
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                background: 'linear-gradient(180deg, rgba(14, 22, 39, 0.9) 0%, rgba(8, 12, 22, 0.95) 100%)',
                boxShadow: 'var(--shadow-elevated)',
                overflow: 'hidden',
                textAlign: 'left',
                marginBottom: 'var(--space-10)',
              }}
            >
              {/* Terminal Titlebar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1.25rem',
                  borderBottom: '1px solid var(--color-border-subtle)',
                  background: 'rgba(255, 255, 255, 0.02)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FB7185' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FBBF24' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#34D399' }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-muted)',
                      marginLeft: '0.5rem',
                    }}
                  >
                    nikhil-core-stack
                  </span>
                </div>

                {/* Tab Switcher */}
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {[
                    { id: 'api', label: 'api.routes.ts' },
                    { id: 'ai', label: 'ai.pipeline.ts' },
                    { id: 'infra', label: 'system.metrics' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveCodeTab(tab.id as any)}
                      style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-2xs)',
                        border: '1px solid',
                        borderColor:
                          activeCodeTab === tab.id
                            ? 'var(--color-border)'
                            : 'transparent',
                        background:
                          activeCodeTab === tab.id
                            ? 'rgba(56, 189, 248, 0.1)'
                            : 'transparent',
                        color:
                          activeCodeTab === tab.id
                            ? 'var(--color-primary)'
                            : 'var(--color-text-muted)',
                        cursor: 'pointer',
                        transition: 'all var(--duration-fast)',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Snippet Display */}
              <div
                style={{
                  padding: '1.25rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  lineHeight: '1.7',
                  overflowX: 'auto',
                }}
              >
                {activeCodeTab === 'api' && (
                  <div>
                    <span style={{ color: '#818CF8' }}>export const</span>{' '}
                    <span style={{ color: '#38BDF8' }}>submitProjectRequest</span> ={' '}
                    <span style={{ color: '#818CF8' }}>async</span> (req: Request, res: Response) =&gt; &#123;<br />
                    &nbsp;&nbsp;<span style={{ color: '#64748B' }}>// Strict Zod schema validation &amp; honeypot spam filtering</span><br />
                    &nbsp;&nbsp;<span style={{ color: '#818CF8' }}>const</span> payload = projectSchema.parse(req.body);<br />
                    &nbsp;&nbsp;<span style={{ color: '#818CF8' }}>const</span> ref = <span style={{ color: '#2DD4BF' }}>generateUniqueReferenceId</span>();<br />
                    &nbsp;&nbsp;<span style={{ color: '#818CF8' }}>await</span> <span style={{ color: '#38BDF8' }}>NotificationService</span>.dispatchReceipt(&#123; ref, ...payload &#125;);<br />
                    &nbsp;&nbsp;<span style={{ color: '#818CF8' }}>return</span> res.status(<span style={{ color: '#FBBF24' }}>201</span>).json(&#123; success: <span style={{ color: '#34D399' }}>true</span>, ref &#125;);<br />
                    &#125;;
                  </div>
                )}

                {activeCodeTab === 'ai' && (
                  <div>
                    <span style={{ color: '#818CF8' }}>export class</span>{' '}
                    <span style={{ color: '#38BDF8' }}>AIPipelineService</span> &#123;<br />
                    &nbsp;&nbsp;<span style={{ color: '#818CF8' }}>static async</span> analyzeResume(text: string): Promise&lt;AnalysisOutput&gt; &#123;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#64748B' }}>// Structured JSON response generation with temperature=0.1</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#818CF8' }}>const</span> response = <span style={{ color: '#818CF8' }}>await</span> aiClient.models.generateContent(&#123;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;model: <span style={{ color: '#34D399' }}>&quot;gemini-2.5-flash&quot;</span>,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contents: [&#123; text: prompt, mimeType: <span style={{ color: '#34D399' }}>&quot;application/json&quot;</span> &#125;]<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&#125;);<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#818CF8' }}>return</span> JSON.parse(response.text);<br />
                    &nbsp;&nbsp;&#125;<br />
                    &#125;
                  </div>
                )}

                {activeCodeTab === 'infra' && (
                  <div>
                    <span style={{ color: '#64748B' }}>[HEALTHCHECK]</span> <span style={{ color: '#34D399' }}>200 OK</span> · Response Time: <span style={{ color: '#38BDF8' }}>48ms</span> · Memory: <span style={{ color: '#FBBF24' }}>62MB</span><br />
                    <span style={{ color: '#64748B' }}>[DATABASE]</span> MongoDB Connection Pool: <span style={{ color: '#34D399' }}>Active (10/10)</span> · Replica Index: Primary<br />
                    <span style={{ color: '#64748B' }}>[SECURITY]</span> Helmet CSP active · CORS Origin-Enforced · Rate-Limit: 100 req/15m<br />
                    <span style={{ color: '#64748B' }}>[DELIVERY]</span> Render Free Tier: Optimized · IPv4 Global Routing: Enforced<br />
                  </div>
                )}
              </div>
            </div>

            {/* Core Competencies Strip */}
            <div
              style={{
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
              {[
                'React 19 & TypeScript',
                'Node.js RESTful APIs',
                'MongoDB Data Architecture',
                'LLM & Structured Output APIs',
                'WCAG AA Responsive UI',
              ].map((skill) => (
                <span
                  key={skill}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                  }}
                >
                  <CheckCircle2 size={13} style={{ color: 'var(--color-primary)' }} />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. CORE CAPABILITIES / SERVICES SECTION
          ===================================================================== */}
      <section className="section" style={{ backgroundColor: 'rgba(14, 22, 39, 0.45)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Core Capabilities"
            title="What I Deliver For You"
            description="Clear deliverables, predictable timelines, and clean engineering tailored to your requirements."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {SERVICES_DATA.map((srv) => (
              <Card
                key={srv.id}
                variant="default"
                className="hover-lift"
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
                      backgroundColor: 'rgba(56, 189, 248, 0.08)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    {getServiceIcon(srv.id)}
                  </div>

                  <h3
                    style={{
                      fontSize: 'var(--text-xl)',
                      marginBottom: 'var(--space-2)',
                      letterSpacing: 'var(--tracking-tight)',
                    }}
                  >
                    {srv.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    {srv.tagline}
                  </p>

                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <span
                      style={{
                        fontSize: 'var(--text-2xs)',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: 'var(--tracking-wider)',
                        display: 'block',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      Typical Deliverables:
                    </span>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.45rem',
                      }}
                    >
                      {srv.deliverables.slice(0, 3).map((item, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            style={{
                              width: '4px',
                              height: '4px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--color-primary)',
                              flexShrink: 0,
                            }}
                          />
                          <span>{item}</span>
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
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-primary)',
                      fontWeight: 600,
                    }}
                  >
                    {srv.pricingStarting}
                  </span>

                  <Link
                    to={`/start-project?service=${encodeURIComponent(srv.title)}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      textDecoration: 'none',
                    }}
                  >
                    <span>Request This</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Link to="/services" className="btn btn-secondary">
              View Detailed Scope, Timelines &amp; FAQs
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. FEATURED WORKS / ENGINEERING CASE STUDIES
          ===================================================================== */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Selected Works"
            title="Featured Engineering Projects"
            description="Deep-dive into production systems: challenge breakdowns, technical architectures, and measured outcomes."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 'var(--space-8)',
              marginBottom: 'var(--space-10)',
            }}
          >
            {PROJECTS_DATA.slice(0, 3).map((proj) => (
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

                  <h3
                    style={{
                      fontSize: 'var(--text-xl)',
                      marginBottom: 'var(--space-2)',
                      letterSpacing: 'var(--tracking-tight)',
                    }}
                  >
                    {proj.title}
                  </h3>

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
                    {proj.tags.slice(0, 4).map((tag) => (
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
                    <span>Read Full Case Study</span>
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
                      <span>Live</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/projects" className="btn btn-secondary">
              Explore All Case Studies &amp; Repositories
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. HOW I WORK (TRANSPARENT PROCESS TIMELINE)
          ===================================================================== */}
      <section className="section" style={{ backgroundColor: 'rgba(14, 22, 39, 0.45)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Delivery Process"
            title="How We Collaborate"
            description="Clear communication, agreed milestones, and zero technical surprises."
          />

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
                title: 'Review & Assessment',
                desc: 'You submit your requirements or bug description. Within 24-48 hours, I provide an initial breakdown, questions, and preliminary quote.',
              },
              {
                step: '02',
                title: 'Scope & Agreement',
                desc: 'We finalize deliverable specs, timeline, and pricing. Work only starts after terms and milestone expectations are fully aligned.',
              },
              {
                step: '03',
                title: 'Iterative Development',
                desc: 'I develop the solution with clean TypeScript, automated tests, and regular updates via your preferred channel (WhatsApp or Email).',
              },
              {
                step: '04',
                title: 'Testing & Handover',
                desc: 'Final staging review, bug-fixing pass, responsive verification, and complete source code / deployment handover.',
              },
            ].map((item) => (
              <Card
                key={item.step}
                variant="raised"
                style={{
                  padding: 'var(--space-6)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 800,
                    color: 'rgba(56, 189, 248, 0.2)',
                    marginBottom: 'var(--space-3)',
                    lineHeight: 1,
                  }}
                >
                  {item.step}
                </div>
                <h3
                  style={{
                    fontSize: 'var(--text-lg)',
                    marginBottom: 'var(--space-2)',
                    letterSpacing: 'var(--tracking-tight)',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 'var(--leading-normal)',
                  }}
                >
                  {item.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. BOTTOM CONVERSION STRIP
          ===================================================================== */}
      <section className="section">
        <div className="container">
          <Card
            variant="elevated"
            style={{
              padding: 'var(--space-12) var(--space-8)',
              background:
                'linear-gradient(135deg, rgba(22, 35, 59, 0.9) 0%, rgba(14, 22, 39, 0.95) 100%)',
              border: '1px solid var(--color-border)',
              textAlign: 'center',
              maxWidth: '920px',
              margin: '0 auto',
            }}
          >
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <Badge variant="brand" size="sm">
                Ready to Build?
              </Badge>
            </div>

            <h2
              style={{
                fontSize: 'var(--text-3xl)',
                marginBottom: 'var(--space-3)',
                letterSpacing: 'var(--tracking-tight)',
              }}
            >
              Have a Project or Urgent Bug Fix in Mind?
            </h2>

            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-secondary)',
                maxWidth: '56ch',
                margin: '0 auto var(--space-8)',
              }}
            >
              Submit your project details via the structured intake form or connect directly on
              WhatsApp for a quick initial assessment.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}
            >
              <Link to="/start-project" className="btn btn-primary btn-lg">
                <Sparkles size={17} />
                Start Your Project Request
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                <MessageSquare size={17} style={{ color: '#25D366' }} />
                Quick Chat on WhatsApp
              </a>
            </div>

            <div
              style={{
                marginTop: 'var(--space-8)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-muted)',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={13} style={{ color: 'var(--color-primary)' }} />
                Reply in 24–48h
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={13} style={{ color: 'var(--color-primary)' }} />
                NDA-Ready &amp; Confidential
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={13} style={{ color: 'var(--color-primary)' }} />
                Transparent Milestones
              </span>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};
