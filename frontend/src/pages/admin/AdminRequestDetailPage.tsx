import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  FileText,
  ExternalLink,
  MessageSquare,
  Plus,
  User,
  Building,
  CheckCircle2,
  Phone,
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { Card, Button, Badge, Textarea } from '../../components/ui';

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

  const getStatusBadgeVariant = (status: string): 'brand' | 'warning' | 'success' | 'subtle' | 'error' => {
    switch (status) {
      case 'New':
        return 'brand';
      case 'Reviewing':
      case 'Need More Information':
        return 'warning';
      case 'Quote Sent':
      case 'Accepted':
      case 'In Progress':
      case 'Completed':
        return 'success';
      case 'Spam':
      case 'Declined':
        return 'subtle';
      default:
        return 'subtle';
    }
  };

  if (loading) {
    return (
      <div className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              border: '3px solid var(--color-border)',
              borderTopColor: 'var(--color-primary)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto var(--space-4) auto',
            }}
          />
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
            Retrieving inquiry details...
          </p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="section" style={{ minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '600px', textAlign: 'center', padding: 'var(--space-12) 0' }}>
          <Card variant="default" padding="lg">
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>Request Not Found</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>
              The requested inquiry could not be located in the database.
            </p>
            <Link to="/admin/dashboard" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="md">
                Back to Dashboard
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  const clientPhoneClean = request.contact.phone ? request.contact.phone.replace(/[^0-9]/g, '') : '';
  const whatsappUrl = clientPhoneClean
    ? `https://wa.me/${clientPhoneClean}?text=${encodeURIComponent(
        `Hi ${request.contact.name}, this is Nikhil Kumar regarding your project request [${request.referenceNumber}] ("${request.title}").`
      )}`
    : null;

  return (
    <div className="section" style={{ minHeight: '85vh', padding: 'var(--space-8) 0 var(--space-16)' }}>
      <div className="container">
        {/* Back navigation */}
        <Link
          to="/admin/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            fontSize: 'var(--text-xs)',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-6)',
            textDecoration: 'none',
            transition: 'color var(--duration-fast)',
          }}
        >
          <ArrowLeft size={14} /> Back to Inquiries Pipeline
        </Link>

        {/* Header Bar with Status Selector */}
        <Card
          variant="elevated"
          padding="lg"
          style={{
            marginBottom: 'var(--space-6)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: 'var(--text-lg)',
                  color: 'var(--color-primary)',
                  backgroundColor: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                {request.referenceNumber}
              </span>
              <Badge variant="subtle" size="sm">
                {request.serviceType}
              </Badge>
              <Badge variant={getStatusBadgeVariant(request.status)} size="sm">
                {request.status}
              </Badge>
            </div>
            <h1
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              {request.title}
            </h1>
          </div>

          {/* Status Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <label style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Update Lifecycle Status:
            </label>
            <select
              value={request.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="select"
              style={{
                padding: '0.45rem 1rem',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--color-primary)',
                width: 'auto',
                height: '38px',
              }}
              aria-label="Change request status"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {statusMessage && (
          <div
            style={{
              padding: 'var(--space-3) var(--space-4)',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-success)',
              fontSize: 'var(--text-xs)',
              marginBottom: 'var(--space-6)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}
          >
            <CheckCircle2 size={15} />
            {statusMessage}
          </div>
        )}

        {/* 2-Column Detail Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 360px',
            gap: 'var(--space-6)',
            alignItems: 'start',
          }}
          className="admin-detail-grid"
        >
          {/* Main Column: Specifications, Attachments, Notes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Project Requirements Card */}
            <Card variant="default" padding="lg">
              <h2
                style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 700,
                  marginBottom: 'var(--space-5)',
                  color: 'var(--color-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Project Specifications &amp; Objectives
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                <div>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                    Requirement Details / Problem to Solve:
                  </span>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                    {request.description}
                  </p>
                </div>

                <div>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                    Desired Outcome &amp; Definition of Success:
                  </span>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.6 }}>
                    {request.desiredOutcome}
                  </p>
                </div>

                {request.existingSystem && (
                  <div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      Existing Architecture / Assets:
                    </span>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                      {request.existingSystem}
                    </p>
                  </div>
                )}

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'var(--space-4)',
                    paddingTop: 'var(--space-4)',
                    borderTop: '1px solid var(--color-border)',
                  }}
                >
                  <div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>
                      Design Assets Status:
                    </span>
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                      {request.hasDesign || 'Not specified'}
                    </strong>
                  </div>

                  <div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>
                      Target Deadline:
                    </span>
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                      {request.desiredDeadline || 'Flexible'}
                    </strong>
                  </div>
                </div>

                {request.referenceUrl && (
                  <div style={{ paddingTop: 'var(--space-3)', borderTop: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>
                      Reference URL / Repository:
                    </span>
                    <a
                      href={request.referenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-primary)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--space-1)',
                        textDecoration: 'none',
                      }}
                    >
                      {request.referenceUrl} <ExternalLink size={13} />
                    </a>
                  </div>
                )}
              </div>
            </Card>

            {/* Submitted Attachments */}
            {request.attachments && request.attachments.length > 0 && (
              <Card variant="default" padding="lg">
                <h3
                  style={{
                    fontSize: 'var(--text-base)',
                    fontWeight: 700,
                    marginBottom: 'var(--space-4)',
                    color: 'var(--color-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Client Attachments ({request.attachments.length})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {request.attachments.map((att: any) => (
                    <div
                      key={att.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'var(--space-3) var(--space-4)',
                        backgroundColor: 'var(--color-surface-elevated)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <FileText size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                        <div>
                          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', display: 'block', fontWeight: 500 }}>
                            {att.originalName}
                          </span>
                          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                            {(att.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                      </div>

                      <a
                        href={att.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                      >
                        <Button variant="secondary" size="sm" style={{ padding: '3px 8px', fontSize: 'var(--text-xs)' }}>
                          <ExternalLink size={12} /> View File
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Internal Notes Timeline */}
            <Card variant="default" padding="lg">
              <h3
                style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 700,
                  marginBottom: 'var(--space-4)',
                  color: 'var(--color-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Private Engineering Notes ({request.notes?.length || 0})
              </h3>

              <form onSubmit={handleAddNote} style={{ marginBottom: 'var(--space-6)' }}>
                <Textarea
                  rows={3}
                  placeholder="Record an internal note, quotation breakdown, or client call takeaway..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  style={{ marginBottom: 'var(--space-3)', fontSize: 'var(--text-xs)' }}
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isAddingNote}
                  disabled={!newNote.trim()}
                >
                  <Plus size={14} /> Add Private Note
                </Button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {request.notes && request.notes.length > 0 ? (
                  request.notes.map((n: any) => (
                    <div
                      key={n.id}
                      style={{
                        padding: 'var(--space-3) var(--space-4)',
                        backgroundColor: 'var(--color-surface-elevated)',
                        borderRadius: 'var(--radius-md)',
                        borderLeft: '3px solid var(--color-primary)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-primary)' }}>
                          {n.author}
                        </strong>
                        <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {new Date(n.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                        {n.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
                    No private notes added yet. Use the field above to log internal estimations.
                  </p>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar: Client Contact Info & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Client Profile Card */}
            <Card variant="raised" padding="lg">
              <h3
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 'var(--space-4)',
                  fontWeight: 700,
                }}
              >
                Client Contact Profile
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <User size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block' }}>
                      Name
                    </span>
                    <strong style={{ color: 'var(--color-text-primary)' }}>{request.contact.name}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Mail size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block' }}>
                      Email
                    </span>
                    <a href={`mailto:${request.contact.email}`} style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                      {request.contact.email}
                    </a>
                  </div>
                </div>

                {request.contact.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <Phone size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block' }}>
                        Phone / WhatsApp
                      </span>
                      <span style={{ color: 'var(--color-text-primary)' }}>{request.contact.phone}</span>
                    </div>
                  </div>
                )}

                {request.contact.company && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <Building size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block' }}>
                        Organization
                      </span>
                      <span style={{ color: 'var(--color-text-primary)' }}>{request.contact.company}</span>
                    </div>
                  </div>
                )}

                <div style={{ paddingTop: 'var(--space-2)', borderTop: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', display: 'block', marginBottom: 'var(--space-1)' }}>
                    Preferred Communication Channel:
                  </span>
                  <Badge variant="brand" size="sm">
                    {request.contact.preferredMethod?.toUpperCase()}
                  </Badge>
                </div>

                {/* Direct Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                  <a
                    href={`mailto:${request.contact.email}?subject=${encodeURIComponent(
                      `Regarding your project inquiry [${request.referenceNumber}]: ${request.title}`
                    )}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button variant="primary" size="sm" style={{ width: '100%' }}>
                      <Mail size={14} /> Send Email Response
                    </Button>
                  </a>

                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        style={{
                          width: '100%',
                          color: '#25D366',
                        }}
                      >
                        <MessageSquare size={14} /> WhatsApp Client
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </Card>

            {/* Request Meta Card */}
            <Card variant="default" padding="lg" style={{ fontSize: 'var(--text-xs)' }}>
              <h4
                style={{
                  fontSize: '10px',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 'var(--space-3)',
                  fontWeight: 700,
                }}
              >
                Inquiry Parameters
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', color: 'var(--color-text-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Project Scope:</span>
                  <strong style={{ color: 'var(--color-text-primary)' }}>{request.projectSize}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Budget Bracket:</span>
                  <strong style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>{request.budgetRange}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Created:</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{new Date(request.createdAt).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Last Updated:</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{new Date(request.updatedAt).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--color-border)' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Consent Verified:</span>
                  <Badge variant="success" size="sm">
                    Verified
                  </Badge>
                </div>
              </div>
            </Card>
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
