import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  LogOut,
  Search,
  RefreshCw,
  Eye,
  Inbox,
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';

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

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'New':
        return 'tag';
      case 'Reviewing':
        return 'tag tag-warning';
      case 'Quote Sent':
      case 'Accepted':
      case 'In Progress':
      case 'Completed':
        return 'tag tag-success';
      case 'Spam':
      case 'Declined':
        return 'tag tag-subtle';
      default:
        return 'tag';
    }
  };

  return (
    <div className="section" style={{ minHeight: '80vh' }}>
      <div className="container">
        {/* Top Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-8)',
            paddingBottom: 'var(--space-6)',
            borderBottom: '1px solid var(--color-border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(110, 231, 242, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
              }}
            >
              <Shield size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: 'var(--text-2xl)' }}>Request Management Dashboard</h1>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                Signed in as: {user?.email}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={loadRequests}
              className="btn btn-secondary btn-sm"
              title="Refresh requests"
            >
              <RefreshCw size={14} /> Refresh
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-ghost btn-sm"
              style={{ color: 'var(--color-error)' }}
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-8)',
          }}
        >
          <div className="card" style={{ padding: 'var(--space-4)', background: 'var(--color-surface)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Total Requests</span>
            <strong style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)', display: 'block' }}>
              {stats.total ?? totalCount}
            </strong>
          </div>

          <div className="card" style={{ padding: 'var(--space-4)', background: 'var(--color-surface)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)' }}>New Leads</span>
            <strong style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-primary)', display: 'block' }}>
              {stats['New'] ?? 0}
            </strong>
          </div>

          <div className="card" style={{ padding: 'var(--space-4)', background: 'var(--color-surface)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-warning)' }}>Reviewing</span>
            <strong style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-warning)', display: 'block' }}>
              {stats['Reviewing'] ?? 0}
            </strong>
          </div>

          <div className="card" style={{ padding: 'var(--space-4)', background: 'var(--color-surface)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)' }}>Quote Sent</span>
            <strong style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-success)', display: 'block' }}>
              {stats['Quote Sent'] ?? 0}
            </strong>
          </div>

          <div className="card" style={{ padding: 'var(--space-4)', background: 'var(--color-surface)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: '#38BDF8' }}>In Progress / Accepted</span>
            <strong style={{ fontSize: 'var(--text-2xl)', color: '#38BDF8', display: 'block' }}>
              {(stats['Accepted'] ?? 0) + (stats['In Progress'] ?? 0)}
            </strong>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div
          className="card"
          style={{
            padding: 'var(--space-4)',
            marginBottom: 'var(--space-6)',
            background: 'var(--color-surface)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select"
              style={{ width: 'auto', minWidth: '160px', padding: '0.45rem 0.8rem', fontSize: 'var(--text-xs)' }}
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
              style={{ width: 'auto', minWidth: '180px', padding: '0.45rem 0.8rem', fontSize: 'var(--text-xs)' }}
              aria-label="Filter by Service"
            >
              <option value="all">All Services</option>
              <option value="Website Development">Website Development</option>
              <option value="React Development">React Development</option>
              <option value="Backend/API Development">Backend/API Development</option>
              <option value="AI Integration">AI Integration</option>
              <option value="Technical Fixes">Fixes &amp; Deployment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '320px' }}>
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
                  paddingTop: '0.45rem',
                  paddingBottom: '0.45rem',
                  fontSize: 'var(--text-xs)',
                }}
              />
            </div>
            <button type="submit" className="btn btn-secondary btn-sm">
              Search
            </button>
          </form>
        </div>

        {/* Requests Table / Cards */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
              Loading project requests...
            </p>
          </div>
        ) : requests.length === 0 ? (
          <div
            className="card"
            style={{
              textAlign: 'center',
              padding: 'var(--space-12)',
              background: 'var(--color-surface)',
              color: 'var(--color-text-muted)',
            }}
          >
            <Inbox size={32} style={{ margin: '0 auto var(--space-2) auto', opacity: 0.5 }} />
            <p style={{ fontSize: 'var(--text-sm)' }}>No project requests found matching the selected filters.</p>
          </div>
        ) : (
          <div className="card card-elevated" style={{ padding: 0, overflow: 'hidden', background: 'var(--color-surface)' }}>
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
                      borderBottom: '1px solid var(--color-border-subtle)',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      color: 'var(--color-text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    <th style={{ padding: 'var(--space-4)' }}>Reference</th>
                    <th style={{ padding: 'var(--space-4)' }}>Client Name</th>
                    <th style={{ padding: 'var(--space-4)' }}>Project Title</th>
                    <th style={{ padding: 'var(--space-4)' }}>Service</th>
                    <th style={{ padding: 'var(--space-4)' }}>Budget</th>
                    <th style={{ padding: 'var(--space-4)' }}>Status</th>
                    <th style={{ padding: 'var(--space-4)' }}>Submitted</th>
                    <th style={{ padding: 'var(--space-4)', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr
                      key={req.id}
                      style={{
                        borderBottom: '1px solid var(--color-border-subtle)',
                        transition: 'background-color 0.15s ease',
                      }}
                    >
                      <td style={{ padding: 'var(--space-4)', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-primary)' }}>
                        {req.referenceNumber}
                      </td>
                      <td style={{ padding: 'var(--space-4)' }}>
                        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          {req.contact.name}
                        </div>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>
                          {req.contact.email}
                        </span>
                      </td>
                      <td style={{ padding: 'var(--space-4)', maxWidth: '240px' }}>
                        <div
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: 'var(--color-text-primary)',
                          }}
                        >
                          {req.title}
                        </div>
                      </td>
                      <td style={{ padding: 'var(--space-4)', color: 'var(--color-text-secondary)' }}>
                        {req.serviceType}
                      </td>
                      <td style={{ padding: 'var(--space-4)', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                        {req.budgetRange}
                      </td>
                      <td style={{ padding: 'var(--space-4)' }}>
                        <span className={getStatusBadgeClass(req.status)} style={{ fontSize: '0.68rem' }}>
                          {req.status}
                        </span>
                      </td>
                      <td style={{ padding: 'var(--space-4)', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                        {new Date(req.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: 'var(--space-4)', textAlign: 'right' }}>
                        <Link
                          to={`/admin/requests/${req.id}`}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.35rem 0.75rem', fontSize: 'var(--text-xs)' }}
                        >
                          <Eye size={13} /> View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
