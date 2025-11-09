"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Shield, CheckCircle, AlertTriangle, XCircle, ArrowLeft, Download, FileText } from 'lucide-react';

export default function JobResultsPage() {
  const router = useRouter();

  const mockFindings = [
    {
      id: '1',
      type: 'SQL Injection',
      severity: 'high',
      description: 'Potential SQL injection vulnerability detected in user input handling',
      location: 'Line 45, function authenticateUser()',
      recommendation: 'Use parameterized queries or prepared statements'
    },
    {
      id: '2',
      type: 'XSS Vulnerability',
      severity: 'medium',
      description: 'Unescaped user input could lead to cross-site scripting attacks',
      location: 'Line 78, render() method',
      recommendation: 'Sanitize all user inputs before rendering'
    },
    {
      id: '3',
      type: 'Weak Password Policy',
      severity: 'low',
      description: 'Password requirements do not meet security standards',
      location: 'Line 12, validatePassword()',
      recommendation: 'Enforce minimum 12 characters with complexity requirements'
    }
  ];

  const getSeverityGradient = (severity: string) => {
    switch(severity) {
      case 'critical': return 'linear-gradient(135deg, #ef4444, #dc2626)';
      case 'high': return 'linear-gradient(135deg, #f97316, #ea580c)';
      case 'medium': return 'linear-gradient(135deg, #eab308, #ca8a04)';
      case 'low': return 'linear-gradient(135deg, #3b82f6, #2563eb)';
      default: return 'linear-gradient(135deg, #6b7280, #4b5563)';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch(severity) {
      case 'critical': return { background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171' };
      case 'high': return { background: 'rgba(249, 115, 22, 0.2)', border: '1px solid rgba(249, 115, 22, 0.3)', color: '#fb923c' };
      case 'medium': return { background: 'rgba(234, 179, 8, 0.2)', border: '1px solid rgba(234, 179, 8, 0.3)', color: '#facc15' };
      case 'low': return { background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60a5fa' };
      default: return { background: 'rgba(107, 114, 128, 0.2)', border: '1px solid rgba(107, 114, 128, 0.3)', color: '#9ca3af' };
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.bgGlow1} />
      <div style={styles.bgGlow2} />

      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <div style={styles.logo} onClick={() => router.push('/')}>
            <span style={styles.logoText}>
              Sentra<span style={styles.logoGradient}>Sec</span>
            </span>
          </div>
          <button 
            onClick={() => router.push('/dashboard')}
            style={styles.backButton}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#6A00EB'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(92, 0, 204, 0.3)'}
          >
            <ArrowLeft style={{ width: '16px', height: '16px' }} />
            Back to Dashboard
          </button>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>Scan Results</h1>
          <p style={styles.subtitle}>Job ID: #12345 • Code Scanner • Completed 2 hours ago</p>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIconWrapper}>
              <div style={styles.statIcon}>
                <CheckCircle style={{ width: '28px', height: '28px', color: 'white' }} />
              </div>
            </div>
            <div>
              <p style={styles.statLabel}>Status</p>
              <p style={styles.statValue}>Safe</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIconWrapper}>
              <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #6A00EB, #5C00CC)'}}>
                <AlertTriangle style={{ width: '28px', height: '28px', color: 'white' }} />
              </div>
            </div>
            <div>
              <p style={styles.statLabel}>Confidence</p>
              <p style={styles.statValue}>87%</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIconWrapper}>
              <div style={styles.statIcon}>
                <FileText style={{ width: '28px', height: '28px', color: 'white' }} />
              </div>
            </div>
            <div>
              <p style={styles.statLabel}>Findings</p>
              <p style={styles.statValue}>{mockFindings.length}</p>
            </div>
          </div>
        </div>

        <div style={styles.findingsCard}>
          <div style={styles.findingsHeader}>
            <h2 style={styles.findingsTitle}>Detected Issues</h2>
            <button 
              style={styles.exportButton}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 30px rgba(106, 0, 235, 0.5)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              <Download style={{ width: '20px', height: '20px' }} />
              Export Report
            </button>
          </div>

          <div style={styles.findingsList}>
            {mockFindings.map((finding) => (
              <div
                key={finding.id}
                style={styles.findingCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#5C00CC';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2A252F';
                }}
              >
                <div style={styles.findingContent}>
                  <div style={styles.findingLeft}>
                    <div style={{...styles.findingIcon, background: getSeverityGradient(finding.severity)}}>
                      <XCircle style={{ width: '24px', height: '24px', color: 'white' }} />
                    </div>
                    <div style={styles.findingDetails}>
                      <h3 style={styles.findingType}>{finding.type}</h3>
                      <p style={styles.findingDesc}>{finding.description}</p>
                      {finding.location && (
                        <p style={styles.findingLocation}>
                          <span style={styles.findingLabel}>Location:</span> {finding.location}
                        </p>
                      )}
                      {finding.recommendation && (
                        <p style={styles.findingLocation}>
                          <span style={styles.findingLabel}>Recommendation:</span> {finding.recommendation}
                        </p>
                      )}
                    </div>
                  </div>
                  <span style={{
                    ...styles.severityBadge,
                    ...getSeverityBg(finding.severity),
                    textTransform: 'capitalize',
                  }}>
                    {finding.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.actions}>
          <button 
            onClick={() => router.push('/dashboard')}
            style={styles.secondaryButton}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#6A00EB'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(92, 0, 204, 0.3)'}
          >
            Run Another Scan
          </button>
          <button 
            style={styles.primaryButton}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 30px rgba(106, 0, 235, 0.5)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
          >
            Share Results
          </button>
        </div>
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0C0712 0%, #201A26 50%, #0C0712 100%)',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
  },
  bgGlow1: {
    position: 'absolute',
    top: '80px',
    right: '80px',
    width: '500px',
    height: '500px',
    background: '#5C00CC',
    opacity: 0.1,
    filter: 'blur(150px)',
    borderRadius: '50%',
    pointerEvents: 'none',
  },
  bgGlow2: {
    position: 'absolute',
    bottom: '80px',
    left: '80px',
    width: '500px',
    height: '500px',
    background: '#6A00EB',
    opacity: 0.1,
    filter: 'blur(150px)',
    borderRadius: '50%',
    pointerEvents: 'none',
  },
  nav: {
    position: 'relative',
    zIndex: 50,
    borderBottom: '1px solid #2A252F',
  },
  navContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
  },
  logoIconWrapper: {
    position: 'relative',
  },
  logoIconGlow: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, #5C00CC, #6A00EB)',
    filter: 'blur(16px)',
    opacity: 0.5,
  },
  logoIcon: {
    position: 'relative',
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #5C00CC, #6A00EB)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: '24px',
    fontFamily: '"Dela Gothic One", cursive',
  },
  logoGradient: {
    background: 'linear-gradient(135deg, #5C00CC, #6A00EB)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: '#2A252F',
    border: '1px solid rgba(92, 0, 204, 0.3)',
    borderRadius: '12px',
    fontFamily: 'Arimo, sans-serif',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    color: 'white',
    cursor: 'pointer',
  },
  main: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1152px',
    margin: '0 auto',
    padding: '80px 24px',
  },
  header: {
    marginBottom: '48px',
  },
  title: {
    fontSize: '60px',
    fontFamily: '"Dela Gothic One", cursive',
    color: 'white',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '20px',
    fontFamily: 'Arimo, sans-serif',
    color: '#A8A5AB',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '48px',
  },
  statCard: {
    background: 'rgba(42, 37, 47, 0.5)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(92, 0, 204, 0.2)',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  statIconWrapper: {
    flexShrink: 0,
  },
  statIcon: {
    width: '56px',
    height: '56px',
    background: 'linear-gradient(135deg, #5C00CC, #6A00EB)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontFamily: 'Arimo, sans-serif',
    fontSize: '14px',
    color: '#A8A5AB',
    marginBottom: '4px',
  },
  statValue: {
    fontFamily: '"Dela Gothic One", cursive',
    fontSize: '32px',
    color: 'white',
  },
  findingsCard: {
    background: 'rgba(42, 37, 47, 0.5)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(92, 0, 204, 0.2)',
    borderRadius: '24px',
    padding: '32px',
    marginBottom: '32px',
  },
  findingsHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  findingsTitle: {
    fontSize: '36px',
    fontFamily: '"Dela Gothic One", cursive',
    color: 'white',
  },
  exportButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #5C00CC, #6A00EB)',
    borderRadius: '12px',
    fontFamily: 'Arimo, sans-serif',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  findingsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  findingCard: {
    padding: '24px',
    background: '#201A26',
    border: '1px solid #2A252F',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
  },
  findingContent: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '16px',
    flexWrap: 'wrap',
  },
  findingLeft: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    flex: 1,
  },
  findingIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  findingDetails: {
    flex: 1,
  },
  findingType: {
    fontFamily: 'Arimo, sans-serif',
    fontWeight: 'bold',
    color: 'white',
    fontSize: '18px',
    marginBottom: '4px',
  },
  findingDesc: {
    fontFamily: 'Arimo, sans-serif',
    color: '#A8A5AB',
    marginBottom: '12px',
  },
  findingLocation: {
    fontFamily: 'Arimo, sans-serif',
    fontSize: '14px',
    color: '#A8A5AB',
    marginBottom: '8px',
  },
  findingLabel: {
    color: '#6A00EB',
  },
  severityBadge: {
    padding: '8px 16px',
    borderRadius: '12px',
    fontFamily: 'Arimo, sans-serif',
    fontWeight: '600',
    fontSize: '14px',
    flexShrink: 0,
  },
  actions: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  secondaryButton: {
    flex: 1,
    minWidth: '200px',
    padding: '16px 24px',
    background: '#2A252F',
    border: '1px solid rgba(92, 0, 204, 0.3)',
    borderRadius: '12px',
    fontFamily: 'Arimo, sans-serif',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    color: 'white',
    cursor: 'pointer',
  },
  primaryButton: {
    flex: 1,
    minWidth: '200px',
    padding: '16px 24px',
    background: 'linear-gradient(135deg, #5C00CC, #6A00EB)',
    borderRadius: '12px',
    fontFamily: 'Arimo, sans-serif',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};