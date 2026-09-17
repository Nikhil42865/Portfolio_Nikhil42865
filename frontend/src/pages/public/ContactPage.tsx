import React, { useState } from 'react';
import {
  Mail,
  MessageSquare,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';

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
          'Thank you! Your message has been sent successfully. Nikhil will reply within 24–48 hours.'
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
        <div style={{ maxWidth: '800px', marginBottom: 'var(--space-12)' }}>
          <span className="tag" style={{ marginBottom: 'var(--space-3)' }}>
            Direct Contact
          </span>
          <h1 style={{ marginBottom: 'var(--space-4)' }}>Let&apos;s Start a Conversation</h1>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)' }}>
            Have a general question, looking to collaborate, or want to discuss a potential project?
            Send a message below or connect directly via WhatsApp or email.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-12)',
            alignItems: 'start',
          }}
        >
          {/* Contact Form Card */}
          <div className="card card-elevated" style={{ padding: 'var(--space-8)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)' }}>
              Send a Direct Message
            </h2>

            {successMessage && (
              <div
                className="card"
                style={{
                  backgroundColor: 'var(--color-success-bg)',
                  borderColor: 'rgba(52, 211, 153, 0.3)',
                  color: 'var(--color-success)',
                  marginBottom: 'var(--space-6)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                }}
              >
                <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: 'var(--text-sm)' }}>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div
                className="card"
                style={{
                  backgroundColor: 'var(--color-error-bg)',
                  borderColor: 'var(--color-error)',
                  color: 'var(--color-error)',
                  marginBottom: 'var(--space-6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                }}
              >
                <AlertCircle size={18} />
                <span style={{ fontSize: 'var(--text-sm)' }}>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Hidden Honeypot */}
              <input
                type="text"
                name="website_hp"
                value={formData.website_hp}
                onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="form-group">
                <label className="form-label" htmlFor="msg-name">
                  Your Name *
                </label>
                <input
                  id="msg-name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`input ${fieldErrors.name ? 'input-error' : ''}`}
                />
                {fieldErrors.name && <span className="field-error-text">{fieldErrors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="msg-email">
                  Your Email Address *
                </label>
                <input
                  id="msg-email"
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`input ${fieldErrors.email ? 'input-error' : ''}`}
                />
                {fieldErrors.email && <span className="field-error-text">{fieldErrors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="msg-subj">
                  Subject *
                </label>
                <input
                  id="msg-subj"
                  type="text"
                  placeholder="e.g. Inquiry about React consulting / Technical advice"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`input ${fieldErrors.subject ? 'input-error' : ''}`}
                />
                {fieldErrors.subject && <span className="field-error-text">{fieldErrors.subject}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="msg-text">
                  Your Message *
                </label>
                <textarea
                  id="msg-text"
                  rows={5}
                  placeholder="How can I help you? Please share your question or context..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`textarea ${fieldErrors.message ? 'input-error' : ''}`}
                />
                {fieldErrors.message && <span className="field-error-text">{fieldErrors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 'var(--space-2)' }}
              >
                {isSubmitting ? (
                  'Sending Message...'
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Direct Communication Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div className="card" style={{ background: 'var(--color-surface)', padding: 'var(--space-6)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>
                Response Expectations
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: 'var(--space-3)' }}>
                <Clock size={18} style={{ color: 'var(--color-primary)' }} />
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  Typical response within <strong>24 business hours</strong>.
                </span>
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 0 }}>
                For scoped project intake with requirements and file attachments, please use the dedicated{' '}
                <a href="/start-project" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                  Start a Project
                </a>{' '}
                intake flow.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="card" style={{ background: 'var(--color-surface)', padding: 'var(--space-6)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>
                Connect Directly
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(37, 211, 102, 0.08)',
                    border: '1px solid rgba(37, 211, 102, 0.2)',
                    color: 'var(--color-text-primary)',
                    textDecoration: 'none',
                  }}
                >
                  <MessageSquare size={20} style={{ color: '#25D366' }} />
                  <div>
                    <strong style={{ fontSize: 'var(--text-sm)', display: 'block' }}>WhatsApp</strong>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      Instant messaging for quick questions
                    </span>
                  </div>
                </a>

                <a
                  href="mailto:nikhil@example.com"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(110, 231, 242, 0.06)',
                    border: '1px solid var(--color-border-subtle)',
                    color: 'var(--color-text-primary)',
                    textDecoration: 'none',
                  }}
                >
                  <Mail size={20} style={{ color: 'var(--color-primary)' }} />
                  <div>
                    <strong style={{ fontSize: 'var(--text-sm)', display: 'block' }}>Email</strong>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      nikhil@example.com
                    </span>
                  </div>
                </a>

                <a
                  href="https://github.com/Nikhil42865"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--color-border-subtle)',
                    color: 'var(--color-text-primary)',
                    textDecoration: 'none',
                  }}
                >
                  <Github size={20} />
                  <div>
                    <strong style={{ fontSize: 'var(--text-sm)', display: 'block' }}>GitHub</strong>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      Explore open source code &amp; repositories
                    </span>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/nikhilkumar-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(0, 119, 181, 0.08)',
                    border: '1px solid rgba(0, 119, 181, 0.2)',
                    color: 'var(--color-text-primary)',
                    textDecoration: 'none',
                  }}
                >
                  <Linkedin size={20} style={{ color: '#0077B5' }} />
                  <div>
                    <strong style={{ fontSize: 'var(--text-sm)', display: 'block' }}>LinkedIn</strong>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      Professional profile &amp; network
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
