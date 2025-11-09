"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Zap, Users, ArrowLeft, Github, Linkedin, Mail } from 'lucide-react';

export default function AboutPage() {
  const router = useRouter();

  const features = [
    {
      icon: Shield,
      title: 'Advanced Threat Detection',
      desc: 'Leveraging Gemini AI to identify phishing, malware, and vulnerabilities with unprecedented accuracy.'
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      desc: 'Military-grade encryption and security protocols to protect your sensitive data and analysis results.'
    },
    {
      icon: Zap,
      title: 'Real-Time Analysis',
      desc: 'Instant scanning and classification with confidence scores, providing actionable insights immediately.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      desc: 'Share findings, collaborate on security assessments, and maintain comprehensive audit trails.'
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.bgGlow1} />
      <div style={styles.bgGlow2} />

      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <div style={styles.logo} onClick={() => router.push('/')}>
            <div style={styles.logoIconWrapper}>
              <div style={styles.logoIconGlow} />
              <div style={styles.logoIcon}>
                <Shield style={{ width: '28px', height: '28px', color: 'white' }} />
              </div>
            </div>
            <span style={styles.logoText}>
              Sentra<span style={styles.logoGradient}>Sec</span>
            </span>
          </div>
          <button 
            onClick={() => router.push('/')}
            style={styles.backButton}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#6A00EB'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(92, 0, 204, 0.3)'}
          >
            <ArrowLeft style={{ width: '16px', height: '16px' }} />
            Back to Home
          </button>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.hero}>
          <h1 style={styles.title}>
            <span style={styles.titleWhite}>About</span>
            <span style={styles.titleGradient}>SentraSec AI</span>
          </h1>
          <p style={styles.subtitle}>
            A cutting-edge cybersecurity platform powered by Google's Gemini AI, 
            designed to protect organizations from evolving digital threats.
          </p>
        </div>

        <div style={styles.featuresGrid}>
          {features.map((feature, i) => (
            <div
              key={i}
              style={styles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#6A00EB';
                e.currentTarget.style.boxShadow = '0 0 50px rgba(106, 0, 235, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(92, 0, 204, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={styles.featureIcon}>
                <feature.icon style={{ width: '32px', height: '32px', color: 'white' }} />
              </div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>

        <div style={styles.missionCard}>
          <h2 style={styles.missionTitle}>Our Mission</h2>
          <p style={styles.missionText}>
            We believe that cybersecurity should be accessible, intelligent, and proactive. 
            SentraSec AI combines the power of artificial intelligence with proven security 
            methodologies to provide comprehensive protection against modern cyber threats. 
            Our platform analyzes millions of data points in real-time, delivering actionable 
            insights that help organizations stay one step ahead of attackers.
          </p>
        </div>

        <div style={styles.contact}>
          <h2 style={styles.contactTitle}>Get in Touch</h2>
          <div style={styles.socialLinks}>
            {[
              { icon: Github, label: 'GitHub' },
              { icon: Linkedin, label: 'LinkedIn' },
              { icon: Mail, label: 'Email' }
            ].map((social, i) => (
              <button
                key={i}
                style={styles.socialButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#6A00EB';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(106, 0, 235, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(92, 0, 204, 0.3)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <social.icon style={styles.socialIcon} />
              </button>
            ))}
          </div>
          <p style={styles.copyright}>
            © 2025 SentraSec AI. All rights reserved.
          </p>
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
    top: '160px',
    left: '80px',
    width: '600px',
    height: '600px',
    background: '#5C00CC',
    opacity: 0.1,
    filter: 'blur(180px)',
    borderRadius: '50%',
    animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    pointerEvents: 'none',
  },
  bgGlow2: {
    position: 'absolute',
    bottom: '160px',
    right: '80px',
    width: '600px',
    height: '600px',
    background: '#6A00EB',
    opacity: 0.1,
    filter: 'blur(180px)',
    borderRadius: '50%',
    animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    animationDelay: '1s',
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
  hero: {
    textAlign: 'center',
    marginBottom: '80px',
  },
  title: {
    fontSize: '72px',
    fontFamily: '"Dela Gothic One", cursive',
    marginBottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleWhite: {
    color: 'white',
    marginBottom: '8px',
  },
  titleGradient: {
    background: 'linear-gradient(135deg, #5C00CC, #6A00EB)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: '24px',
    fontFamily: 'Arimo, sans-serif',
    color: '#A8A5AB',
    maxWidth: '768px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
    marginBottom: '80px',
  },
  featureCard: {
    padding: '32px',
    background: 'rgba(42, 37, 47, 0.5)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(92, 0, 204, 0.2)',
    borderRadius: '24px',
    transition: 'all 0.5s ease',
  },
  featureIcon: {
    width: '64px',
    height: '64px',
    background: 'linear-gradient(135deg, #5C00CC, #6A00EB)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    transition: 'transform 0.3s ease',
  },
  featureTitle: {
    fontSize: '24px',
    fontFamily: '"Dela Gothic One", cursive',
    color: 'white',
    marginBottom: '16px',
  },
  featureDesc: {
    fontFamily: 'Arimo, sans-serif',
    color: '#A8A5AB',
    lineHeight: '1.6',
  },
  missionCard: {
    background: 'rgba(42, 37, 47, 0.5)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(92, 0, 204, 0.2)',
    borderRadius: '24px',
    padding: '48px',
    marginBottom: '80px',
  },
  missionTitle: {
    fontSize: '48px',
    fontFamily: '"Dela Gothic One", cursive',
    color: 'white',
    marginBottom: '24px',
    textAlign: 'center',
  },
  missionText: {
    fontFamily: 'Arimo, sans-serif',
    color: '#A8A5AB',
    fontSize: '18px',
    lineHeight: '1.8',
    textAlign: 'center',
    maxWidth: '896px',
    margin: '0 auto',
  },
  contact: {
    textAlign: 'center',
  },
  contactTitle: {
    fontSize: '48px',
    fontFamily: '"Dela Gothic One", cursive',
    color: 'white',
    marginBottom: '32px',
  },
  socialLinks: {
    display: 'flex',
    gap: '24px',
    justifyContent: 'center',
    marginBottom: '32px',
  },
  socialButton: {
    position: 'relative',
    width: '56px',
    height: '56px',
    background: '#2A252F',
    border: '1px solid rgba(92, 0, 204, 0.3)',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    width: '24px',
    height: '24px',
    color: '#A8A5AB',
    transition: 'color 0.3s ease',
  },
  copyright: {
    fontFamily: 'Arimo, sans-serif',
    color: '#A8A5AB',
  },
};