import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  LogOut,
  Search,
  RefreshCw,
  Eye,
  Inbox,
  ExternalLink,
  Filter,
  CheckCircle2,
  Clock,
  Send,
  FileText,
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { Card, Button, Badge, EmptyState } from '../../components/ui';

export const AdminDashboardPage: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [totalCount, setTotalCount] = useState<number>(0);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

  const navigate = useNavigate();

  // Check Session
  useEffect(() => {
    apiClient.getAdminSession().then((res) => {
      if (res.success && res.data?.user) {
        setUser(res.data.user);
      } else {
        navigate('/admin/login');
      }
    });
  }, [navigate]);

  // Load Requests
  const loadRequests = async () => {
    setLoading(true);
    try {
      const res = await apiClient.getProjectRequests({
        status: statusFilter,
        serviceType: serviceFilter,
        search: searchQuery,
      });

      if (res.success && res.data) {
        setRequests(res.data);
        if (res.meta) {
          setTotalCount(res.meta.total || res.data.length);
          if (res.meta.stats) {
            setStats(res.meta.stats);
          }
        }
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, [statusFilter, serviceFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadRequests();
  };

  const handleLogout = async () => {
    await apiClient.adminLogout();
    navigate('/admin/login');
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

  // Helper to extract initials for avatar
  const getInitials = (name: string) => {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="section" style={{ minHeight: '85vh', padding: 'var(--space-8) 0 var(--space-16)' }}>
      <div className="container">
        {/* Top Header Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-8)',
            paddingBottom: 'var(--space-6)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
              }}
            >
              <Shield size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <h1
                  style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    margin: 0,
                  }}
                >
                  Project Pipeline &amp; Inquiries
                </h1>
                <Badge variant="brand" size="sm">
                  Executive
                </Badge>
              </div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                Signed in as: <strong style={{ color: 'var(--color-text-secondary)' }}>{user?.email || 'Administrator'}</strong>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Link to="/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Button variant="ghost" size="sm">
                <ExternalLink size={14} /> Public Site
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="sm"
              onClick={loadRequests}
              isLoading={loading}
              title="Refresh project list"
            >
              <RefreshCw size={14} /> Refresh
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              style={{ color: 'var(--color-error)' }}
            >
              <LogOut size={14} /> Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Summary KPI Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-8)',
          }}
        >
          <Card
            variant="default"
            padding="md"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderLeft: '3px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                Total Inquiries
              </span>
              <FileText size={16} style={{ color: 'var(--color-text-muted)' }} />
            </div>
            <strong style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
              {stats.total ?? totalCount}
            </strong>
          </Card>

          <Card
            variant="default"
            padding="md"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderLeft: '3px solid var(--color-primary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', fontWeight: 600 }}>
                New Leads
              </span>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
            </div>
            <strong style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>
              {stats['New'] ?? 0}
            </strong>
          </Card>

          <Card
            variant="default"
            padding="md"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderLeft: '3px solid var(--color-warning)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-warning)', fontWeight: 600 }}>
                Under Review
              </span>
              <Clock size={16} style={{ color: 'var(--color-warning)' }} />
            </div>
            <strong style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-warning)', fontFamily: 'var(--font-mono)' }}>
              {(stats['Reviewing'] ?? 0) + (stats['Need More Information'] ?? 0)}
            </strong>
          </Card>

          <Card
            variant="default"
            padding="md"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderLeft: '3px solid var(--color-success)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)', fontWeight: 600 }}>
                Quotes Sent
              </span>
              <Send size={16} style={{ color: 'var(--color-success)' }} />
            </div>
            <strong style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-success)', fontFamily: 'var(--font-mono)' }}>
              {stats['Quote Sent'] ?? 0}
            </strong>
          </Card>

          <Card
            variant="default"
            padding="md"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderLeft: '3px solid #38BDF8',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: '#38BDF8', fontWeight: 600 }}>
                Accepted / In Progress
              </span>
              <CheckCircle2 size={16} style={{ color: '#38BDF8' }} />
            </div>
            <strong style={{ fontSize: 'var(--text-2xl)', color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>
              {(stats['Accepted'] ?? 0) + (stats['In Progress'] ?? 0)}
            </strong>
          </Card>
        </div>

        {/* Filter & Search Bar */}
        <Card
          variant="raised"
          padding="sm"
          style={{
            marginBottom: 'var(--space-6)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-3)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', paddingLeft: 'var(--space-2)' }}>
              <Filter size={13} />
              <span>Filters:</span>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select"
              style={{
                width: 'auto',
                minWidth: '150px',
                padding: '0.4rem 0.8rem',
                fontSize: 'var(--text-xs)',
                height: '36px',
              }}
              aria-label="Filter by Status"
            >
              <option value="all">All Statuses</option>
              <option value="New">New</option>
              <option value="Reviewing">Reviewing</option>
              <option value="Need More Information">Need More Information</option>
              <option value="Quote Sent">Quote Sent</option>
              <option value="Accepted">Accepted</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Declined">Declined</option>
              <option value="Spam">Spam</option>
            </select>

            {/* Service Filter */}
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="select"
              style={{
                width: 'auto',
                minWidth: '170px',
                padding: '0.4rem 0.8rem',
                fontSize: 'var(--text-xs)',
                height: '36px',
              }}
              aria-label="Filter by Service"
            >
              <option value="all">All Service Categories</option>
              <option value="Website Development">Website Development</option>
              <option value="React Development">React Development</option>
              <option value="Backend/API Development">Backend/API Development</option>
              <option value="AI Integration">AI Integration</option>
              <option value="Technical Fixes">Fixes &amp; Deployment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: 'var(--space-2)', width: '100%', maxWidth: '340px' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <Search
                size={14}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)',
                }}
              />
              <input
                type="text"
                placeholder="Search reference, client, title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
                style={{
                  paddingLeft: '2rem',
                  paddingTop: '0.4rem',
                  paddingBottom: '0.4rem',
                  fontSize: 'var(--text-xs)',
                  height: '36px',
                }}
              />
            </div>
            <Button type="submit" variant="secondary" size="sm" style={{ height: '36px' }}>
              Search
            </Button>
          </form>
        </Card>

        {/* Requests Table / Content Area */}
        {loading ? (
          <Card variant="default" padding="lg" style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  border: '3px solid var(--color-border)',
                  borderTopColor: 'var(--color-primary)',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                Loading inquiries from database...
              </span>
            </div>
          </Card>
        ) : requests.length === 0 ? (
          <Card variant="default" padding="lg">
            <EmptyState
              icon={<Inbox size={36} />}
              title="No Inquiries Found"
              description="No project submissions match your current filter and search criteria."
              action={
                statusFilter !== 'all' || serviceFilter !== 'all' || searchQuery ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setStatusFilter('all');
                      setServiceFilter('all');
                      setSearchQuery('');
                    }}
                  >
                    Reset All Filters
                  </Button>
                ) : undefined
              }
            />
          </Card>
        ) : (
          <Card variant="elevated" padding="none" style={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  textAlign: 'left',
                  fontSize: 'var(--text-xs)',
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: '1px solid var(--color-border)',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      color: 'var(--color-text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    <th style={{ padding: 'var(--space-4) var(--space-5)' }}>Reference</th>
                    <th style={{ padding: 'var(--space-4) var(--space-5)' }}>Client</th>
                    <th style={{ padding: 'var(--space-4) var(--space-5)' }}>Project Title</th>
                    <th style={{ padding: 'var(--space-4) var(--space-5)' }}>Domain</th>
                    <th style={{ padding: 'var(--space-4) var(--space-5)' }}>Budget</th>
                    <th style={{ padding: 'var(--space-4) var(--space-5)' }}>Status</th>
                    <th style={{ padding: 'var(--space-4) var(--space-5)' }}>Date</th>
                    <th style={{ padding: 'var(--space-4) var(--space-5)', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr
                      key={req.id}
                      style={{
                        borderBottom: '1px solid var(--color-border-subtle)',
                        transition: 'background-color var(--duration-fast)',
                      }}
                      className="table-row-hover"
                    >
                      {/* Reference Number */}
                      <td style={{ padding: 'var(--space-4) var(--space-5)', whiteSpace: 'nowrap' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 600,
                            color: 'var(--color-primary)',
                            backgroundColor: 'rgba(56, 189, 248, 0.08)',
                            border: '1px solid rgba(56, 189, 248, 0.2)',
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-sm)',
                          }}
                        >
                          {req.referenceNumber}
                        </span>
                      </td>

                      {/* Client info with avatar */}
                      <td style={{ padding: 'var(--space-4) var(--space-5)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: 'var(--radius-full)',
                              backgroundColor: 'var(--color-surface-elevated)',
                              border: '1px solid var(--color-border)',
                              color: 'var(--color-primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '11px',
                              fontFamily: 'var(--font-mono)',
                              flexShrink: 0,
                            }}
                          >
                            {getInitials(req.contact.name)}
                          </div>
                          <div>
                            <strong style={{ color: 'var(--color-text-primary)', display: 'block', fontSize: 'var(--text-xs)' }}>
                              {req.contact.name}
                            </strong>
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '11px' }}>
                              {req.contact.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Project Title */}
                      <td style={{ padding: 'var(--space-4) var(--space-5)', maxWidth: '240px' }}>
                        <div
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: 'var(--color-text-primary)',
                            fontWeight: 500,
                          }}
                          title={req.title}
                        >
                          {req.title}
                        </div>
                        {req.attachments && req.attachments.length > 0 && (
                          <span style={{ fontSize: '10px', color: 'var(--color-primary)' }}>
                            📎 {req.attachments.length} file(s)
                          </span>
                        )}
                      </td>

                      {/* Service Domain */}
                      <td style={{ padding: 'var(--space-4) var(--space-5)', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>
                        {req.serviceType}
                      </td>

                      {/* Budget */}
                      <td style={{ padding: 'var(--space-4) var(--space-5)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                        {req.budgetRange}
                      </td>

                      {/* Status */}
                      <td style={{ padding: 'var(--space-4) var(--space-5)', whiteSpace: 'nowrap' }}>
                        <Badge variant={getStatusBadgeVariant(req.status)} size="sm">
                          {req.status}
                        </Badge>
                      </td>

                      {/* Date */}
                      <td style={{ padding: 'var(--space-4) var(--space-5)', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                        {new Date(req.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>

                      {/* Action */}
                      <td style={{ padding: 'var(--space-4) var(--space-5)', textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <Link to={`/admin/requests/${req.id}`} style={{ textDecoration: 'none' }}>
                          <Button variant="secondary" size="sm" style={{ padding: '4px 10px', fontSize: 'var(--text-xs)' }}>
                            <Eye size={13} /> View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      <style>{`
        .table-row-hover:hover {
          background-color: rgba(56, 189, 248, 0.03) !important;
        }
      `}</style>
    </div>
  );
};
