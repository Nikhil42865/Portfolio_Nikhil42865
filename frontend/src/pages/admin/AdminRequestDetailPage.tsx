import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  FileText,
  ExternalLink,
  MessageSquare,
  Plus,
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';

export const AdminRequestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [newNote, setNewNote] = useState<string>('');
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);
  const navigate = useNavigate();

  const statuses = [
    'New',
    'Reviewing',
    'Need More Information',
    'Quote Sent',
    'Accepted',
    'In Progress',
    'Completed',
    'Declined',
    'Spam',
  ];

  const loadDetail = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await apiClient.getProjectRequestById(id);
      if (res.success && res.data) {
        setRequest(res.data);
      } else {
        navigate('/admin/dashboard');
      }
    } catch {
      navigate('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetail();
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!id) return;
    setStatusMessage('Updating status...');
    try {
      const res = await apiClient.updateRequestStatus(id, newStatus);
      if (res.success && res.data) {
        setRequest(res.data);
        setStatusMessage(`Status updated to "${newStatus}"`);
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch {
      setStatusMessage('Failed to update status.');
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newNote.trim()) return;

    setIsAddingNote(true);
    try {
      const res = await apiClient.addRequestNote(id, newNote);
      if (res.success && res.data) {
        setRequest(res.data);
        setNewNote('');
      }
    } catch {
      // ignore
    } finally {
      setIsAddingNote(false);
    }
  };

  if (loading) {
    return (
      <div className="section">
        <div className="container" style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
            Loading request details...
          </p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="section">
        <div className="container">
          <p>Request not found.</p>
          <Link to="/admin/dashboard" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const clientPhoneClean = request.contact.phone ? request.contact.phone.replace(/[^0-9]/g, '') : '';
  const whatsappUrl = clientPhoneClean
    ? `https://wa.me/${clientPhoneClean}?text=${encodeURIComponent(
        `Hi ${request.contact.name}, this is Nikhil Kumar regarding your project request [${request.referenceNumber}].`
      )}`
    : null;

  return (
    <div className="section" style={{ minHeight: '80vh' }}>
      <div className="container">
        {/* Back navigation */}
        <Link
          to="/admin/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-6)',
          }}
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>

        {/* Header Bar with Status Control */}
        <div
          className="card card-elevated"
          style={{
            padding: 'var(--space-6)',
            marginBottom: 'var(--space-8)',
            background: 'var(--color-surface)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: 'var(--text-lg)',
                  color: 'var(--color-primary)',
                }}
              >
                {request.referenceNumber}
              </span>
              <span className="tag" style={{ fontSize: '0.7rem' }}>
                {request.serviceType}
              </span>
            </div>
            <h1 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)' }}>
              {request.title}
            </h1>
          </div>

          {/* Status Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <label style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              Current Status:
            </label>
            <select
              value={request.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="select"
              style={{
                padding: '0.45rem 1rem',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--color-primary)',
                width: 'auto',
              }}
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {statusMessage && (
          <div
            className="card"
            style={{
              padding: 'var(--space-3) var(--space-4)',
              backgroundColor: 'rgba(52, 211, 153, 0.1)',
              borderColor: 'rgba(52, 211, 153, 0.3)',
              color: 'var(--color-success)',
              fontSize: 'var(--text-xs)',
              marginBottom: 'var(--space-6)',
            }}
          >
            {statusMessage}
          </div>
        )}

        {/* 2-Column Detail Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 340px',
            gap: 'var(--space-8)',
            alignItems: 'start',
          }}
          className="admin-detail-grid"
        >
          {/* Main Column: Requirements & Notes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Project Requirements Card */}
            <div className="card" style={{ padding: 'var(--space-6)', background: 'var(--color-surface)' }}>
              <h2 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)', color: 'var(--color-primary)' }}>
                Detailed Project Requirements
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block' }}>
                    What to Build / Change:
                  </span>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', marginTop: '0.25rem' }}>
                    {request.description}
                  </p>
                </div>

                <div>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block' }}>
                    Desired Outcome &amp; Success Criteria:
                  </span>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', marginTop: '0.25rem' }}>
                    {request.desiredOutcome}
                  </p>
                </div>

                {request.existingSystem && (
                  <div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block' }}>
                      Existing System / Assets:
                    </span>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                      {request.existingSystem}
                    </p>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border-subtle)' }}>
                  <div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block' }}>
                      Designs Ready?
                    </span>
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                      {request.hasDesign || 'Not specified'}
                    </strong>
                  </div>

                  <div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block' }}>
                      Desired Deadline:
                    </span>
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                      {request.desiredDeadline || 'Flexible'}
                    </strong>
                  </div>
                </div>

                {request.referenceUrl && (
                  <div style={{ paddingTop: 'var(--space-2)' }}>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block' }}>
                      Reference URL:
                    </span>
                    <a
                      href={request.referenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 'var(--text-sm)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      {request.referenceUrl} <ExternalLink size={13} />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Submitted Attachments */}
            {request.attachments && request.attachments.length > 0 && (
              <div className="card" style={{ padding: 'var(--space-6)', background: 'var(--color-surface)' }}>
                <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)', color: 'var(--color-primary)' }}>
                  Client Attachments ({request.attachments.length})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {request.attachments.map((att: any) => (
                    <div
                      key={att.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'var(--space-3) var(--space-4)',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border-subtle)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={16} style={{ color: 'var(--color-primary)' }} />
                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                          {att.originalName}
                        </span>
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                          ({(att.size / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                      </div>

                      <a
                        href={att.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.25rem 0.65rem', fontSize: 'var(--text-xs)' }}
                      >
                        <ExternalLink size={12} /> Open
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Internal Notes Timeline */}
            <div className="card" style={{ padding: 'var(--space-6)', background: 'var(--color-surface)' }}>
              <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)', color: 'var(--color-primary)' }}>
                Private Internal Notes ({request.notes?.length || 0})
              </h3>

              <form onSubmit={handleAddNote} style={{ marginBottom: 'var(--space-6)' }}>
                <textarea
                  rows={3}
                  placeholder="Add a private note regarding this client or quote..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="textarea"
                  style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}
                />
                <button
                  type="submit"
                  disabled={isAddingNote || !newNote.trim()}
                  className="btn btn-primary btn-sm"
                >
                  <Plus size={14} /> Add Note
                </button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {request.notes && request.notes.length > 0 ? (
                  request.notes.map((n: any) => (
                    <div
                      key={n.id}
                      style={{
                        padding: 'var(--space-3) var(--space-4)',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: 'var(--radius-md)',
                        borderLeft: '3px solid var(--color-primary)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-primary)' }}>
                          {n.author}
                        </strong>
                        <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                          {new Date(n.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 0 }}>
                        {n.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    No private notes added yet.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar: Client Contact Info & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Client Profile Card */}
            <div className="card" style={{ padding: 'var(--space-6)', background: 'var(--color-surface)' }}>
              <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)', color: 'var(--color-text-primary)' }}>
                Client Contact Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
                <div>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block' }}>
                    Client Name
                  </span>
                  <strong style={{ color: 'var(--color-text-primary)' }}>{request.contact.name}</strong>
                </div>

                <div>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block' }}>
                    Email Address
                  </span>
                  <a href={`mailto:${request.contact.email}`} style={{ color: 'var(--color-primary)' }}>
                    {request.contact.email}
                  </a>
                </div>

                {request.contact.phone && (
                  <div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block' }}>
                      Phone / WhatsApp
                    </span>
                    <span style={{ color: 'var(--color-text-primary)' }}>{request.contact.phone}</span>
                  </div>
                )}

                {request.contact.company && (
                  <div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block' }}>
                      Company
                    </span>
                    <span style={{ color: 'var(--color-text-primary)' }}>{request.contact.company}</span>
                  </div>
                )}

                <div>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block' }}>
                    Preferred Contact Method
                  </span>
                  <span className="tag" style={{ textTransform: 'uppercase', marginTop: '0.25rem' }}>
                    {request.contact.preferredMethod}
                  </span>
                </div>

                {/* Direct Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'var(--space-2)' }}>
                  <a
                    href={`mailto:${request.contact.email}?subject=${encodeURIComponent(
                      `Regarding your project request [${request.referenceNumber}]`
                    )}`}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%' }}
                  >
                    <Mail size={14} /> Send Email
                  </a>

                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%' }}
                    >
                      <MessageSquare size={14} style={{ color: '#25D366' }} /> WhatsApp Client
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Request Meta Card */}
            <div className="card" style={{ padding: 'var(--space-6)', background: 'var(--color-surface)', fontSize: 'var(--text-xs)' }}>
              <h4 style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 'var(--space-3)' }}>
                System Metadata
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                <div><strong>Project Size:</strong> {request.projectSize}</div>
                <div><strong>Budget Range:</strong> {request.budgetRange}</div>
                <div><strong>Submitted:</strong> {new Date(request.createdAt).toLocaleString()}</div>
                <div><strong>Last Updated:</strong> {new Date(request.updatedAt).toLocaleString()}</div>
                <div><strong>Contact Consent:</strong> Verified ({new Date(request.consent.acceptedAt).toLocaleDateString()})</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
