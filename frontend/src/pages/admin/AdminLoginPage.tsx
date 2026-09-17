import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, AlertCircle, ArrowLeft, Shield } from 'lucide-react';
import { apiClient } from '../../services/apiClient';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    apiClient.getAdminSession().then((res) => {
      if (res.success && res.data?.user) {
        navigate('/admin/dashboard');
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await apiClient.adminLogin({ email, password });
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setErrorMessage(res.error?.message || 'Invalid administrative credentials.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="section"
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
      }}
    >
      <div className="container-form" style={{ maxWidth: '440px' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-6)',
          }}
        >
          <ArrowLeft size={14} /> Back to Public Site
        </Link>

        <div className="card card-elevated" style={{ padding: 'var(--space-8)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(110, 231, 242, 0.1)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                margin: '0 auto var(--space-4) auto',
              }}
            >
              <Shield size={24} />
            </div>
            <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: '0.25rem' }}>
              Admin Sign In
            </h1>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              Private request review and project management
            </p>
          </div>

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
                gap: '0.5rem',
                fontSize: 'var(--text-xs)',
                padding: 'var(--space-3)',
              }}
            >
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="adm-email">
                Admin Email
              </label>
              <input
                id="adm-email"
                type="email"
                placeholder="nikhil42865@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="adm-pass">
                Password
              </label>
              <input
                id="adm-pass"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 'var(--space-4)' }}
            >
              {isLoading ? (
                'Authenticating...'
              ) : (
                <>
                  <Lock size={16} /> Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-6)', marginBottom: 0 }}>
            Session is protected with secure HTTP-only cookie authentication.
          </p>
        </div>
      </div>
    </div>
  );
};
