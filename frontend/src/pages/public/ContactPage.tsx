import React, { useState } from 'react';
import {
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website_hp: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const whatsappUrl = `https://wa.me/916202591561?text=${encodeURIComponent(
    'Hi Nikhil, I would like to get in touch.'
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setErrorMessage('');
    setSuccessMessage('');

    // Quick client-side validation
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please provide your name (at least 2 characters).';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errors.subject = 'Subject must be at least 3 characters.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiClient.submitContactMessage(formData);
      if (res.success) {
        setSuccessMessage(
          'Thank you! Your message has been sent successfully. Nikhil will reply via email within 24–48 hours.'
        );
        setFormData({ name: '', email: '', subject: '', message: '', website_hp: '' });
      } else {
        setErrorMessage(res.error?.message || 'Failed to send message. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        {/* Page Header */}
        <SectionHeader
          align="left"
          eyebrow="Direct Channels"
          title="Let's Start a Conversation"
          description="Have a question, looking to collaborate, or want to discuss a project? Send a note below or reach out directly on WhatsApp or Email."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 340px',
            gap: 'var(--space-10)',
            alignItems: 'start',
          }}
          className="contact-layout-grid"
        >
          {/* Contact Form Card */}
          <Card variant="elevated" style={{ padding: 'var(--space-8)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)', letterSpacing: 'var(--tracking-tight)' }}>
              Send a Direct Message
            </h2>

            {successMessage && (
              <Card
                variant="default"
                style={{
                  background: 'var(--color-success-bg)',
                  borderColor: 'var(--color-success-border)',
                  color: 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: 'var(--space-4)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                  {successMessage}
                </span>
              </Card>
            )}

            {errorMessage && (
              <Card
                variant="default"
                style={{
                  background: 'var(--color-error-bg)',
                  borderColor: 'var(--color-error-border)',
                  color: 'var(--color-error)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: 'var(--space-4)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                  {errorMessage}
                </span>
              </Card>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Invisible Honeypot */}
              <input
                type="text"
                name="website_hp"
                value={formData.website_hp}
                onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                style={{ display: 'none' }}
                aria-hidden="true"
              />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 'var(--space-4)',
                }}
              >
                <Input
                  label="Your Name"
                  id="contact-name"
                  placeholder="e.g. Sarah Jenkins"
                  requiredIndicator
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  error={fieldErrors.name}
                />

                <Input
                  label="Email Address"
                  id="contact-email"
                  type="email"
                  placeholder="e.g. sarah@example.com"
                  requiredIndicator
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={fieldErrors.email}
                />
              </div>

              <Input
                label="Subject"
                id="contact-subject"
                placeholder="e.g. Full-Stack React Project Inquiry"
                requiredIndicator
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                error={fieldErrors.subject}
              />

              <Textarea
                label="Message"
                id="contact-message"
                placeholder="Describe what you're looking to build, timelines, or any questions..."
                requiredIndicator
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                error={fieldErrors.message}
                helperText="Include key goals, existing codebase links (if any), or scope notes."
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'var(--space-6)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  Replies delivered to your email inbox.
                </span>

                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                  iconLeft={<Send size={15} />}
                >
                  Send Message
                </Button>
              </div>
            </form>
          </Card>

          {/* Direct Sidebar Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* WhatsApp Card */}
            <Card
              variant="raised"
              style={{
                padding: 'var(--space-6)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: 'var(--space-3)' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(37, 211, 102, 0.1)',
                    border: '1px solid rgba(37, 211, 102, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MessageSquare size={18} style={{ color: '#25D366' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                    WhatsApp Chat
                  </h3>
                  <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-muted)' }}>
                    Fastest channel for questions
                  </span>
                </div>
              </div>

              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                Direct mobile messaging for brief questions, quick scope estimates, or time-sensitive projects.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', borderColor: 'rgba(37, 211, 102, 0.3)' }}
              >
                <MessageSquare size={14} style={{ color: '#25D366' }} />
                <span>+91 6202591561</span>
              </a>
            </Card>

            {/* Email Card */}
            <Card
              variant="raised"
              style={{
                padding: 'var(--space-6)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: 'var(--space-3)' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Mail size={18} style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                    Direct Email
                  </h3>
                  <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-muted)' }}>
                    nikhil42865@gmail.com
                  </span>
                </div>
              </div>

              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                Send RFP documents, project specifications, or NDA requests directly.
              </p>

              <a
                href="mailto:nikhil42865@gmail.com"
                className="btn btn-outline btn-sm"
                style={{ width: '100%' }}
              >
                <Mail size={14} />
                <span>Email Nikhil</span>
              </a>
            </Card>

            {/* Commitment Badge Card */}
            <Card
              variant="default"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                padding: 'var(--space-5)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={15} style={{ color: 'var(--color-primary)' }} />
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                    Typical Response: <strong style={{ color: 'var(--color-text-primary)' }}>&lt; 24 hours</strong>
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={15} style={{ color: 'var(--color-success)' }} />
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                    NDA &amp; Confidentiality Respected
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
