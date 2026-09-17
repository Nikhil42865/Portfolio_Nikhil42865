import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="section">
      <div className="container-narrow">
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-6)',
          }}
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="card card-elevated" style={{ padding: 'var(--space-8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: 'var(--space-4)' }}>
            <Shield size={24} style={{ color: 'var(--color-primary)' }} />
            <h1 style={{ fontSize: 'var(--text-3xl)' }}>Privacy Notice &amp; Data Policy</h1>
          </div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
            Last updated: September 2026
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
            <div>
              <h2 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
                1. Purpose of Data Collection
              </h2>
              <p>
                When you submit a project request or contact inquiry through this platform, your information
                is collected solely for the purpose of reviewing your software requirements, preparing a preliminary scope,
                and communicating directly regarding your inquiry.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
                2. Information Collected
              </h2>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <li>Your name and contact details (email address, optional phone/WhatsApp number).</li>
                <li>Project details (service type, scope, budget estimate, requirements, desired outcomes).</li>
                <li>Any reference documents or screenshots you choose to upload.</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
                3. Privacy Guarantees
              </h2>
              <p>
                Your information is <strong>never sold, rented, or shared</strong> with third-party advertisers or marketers.
                Submissions are stored securely and accessible only to Nikhil Kumar for project management.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
                4. Data Retention &amp; Deletion
              </h2>
              <p>
                Submitted requirements are retained while evaluating the project and for active client correspondence.
                You can request the permanent removal of your contact information and submitted files at any time by emailing{' '}
                <a href={`mailto:${siteConfig.contact.email}`} style={{ color: 'var(--color-primary)' }}>
                  {siteConfig.contact.email}
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
