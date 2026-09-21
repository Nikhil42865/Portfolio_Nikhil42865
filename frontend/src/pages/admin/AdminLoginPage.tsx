import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, AlertCircle, ArrowLeft, Shield, CheckCircle2 } from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { Card, Button, Input, Badge } from '../../components/ui';

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
        minHeight: '75vh',
        padding: 'var(--space-12) 0',
      }}
    >
      <div className="container-form" style={{ maxWidth: '460px', width: '100%' }}>
        <Link
          to="/"
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
          <ArrowLeft size={14} /> Back to Public Site
        </Link>

        <Card
          variant="elevated"
          padding="lg"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(56, 189, 248, 0.07) 0%, #0E1627 75%)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.05)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top subtle cyan accent strip */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #38BDF8, #2DD4BF)',
            }}
          />

          <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                boxShadow: '0 0 20px rgba(56, 189, 248, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                margin: '0 auto var(--space-4) auto',
              }}
            >
              <Shield size={26} />
            </div>

            <Badge variant="brand" size="sm" style={{ marginBottom: 'var(--space-2)' }}>
              Restricted Access Portal
            </Badge>

            <h1
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: 'var(--space-1)',
              }}
            >
              Admin Sign In
            </h1>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
              Lead management, scope estimations, and internal project records.
            </p>
          </div>

          {errorMessage && (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-error)',
                padding: 'var(--space-3) var(--space-4)',
                marginBottom: 'var(--space-6)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                fontSize: 'var(--text-xs)',
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Input
              id="adm-email"
              label="Admin Account Email"
              type="email"
              placeholder="nikhil42865@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />

            <Input
              id="adm-pass"
              label="Secure Password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              style={{ width: '100%', marginTop: 'var(--space-2)' }}
            >
              <Lock size={16} /> Authenticate to Dashboard
            </Button>
          </form>

          <div
            style={{
              marginTop: 'var(--space-6)',
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              textAlign: 'center',
            }}
          >
            <CheckCircle2 size={13} style={{ color: 'var(--color-success)' }} />
            Protected by HTTP-only secure cookie session &amp; rate limiting.
          </div>
        </Card>
      </div>
    </div>
  );
};
