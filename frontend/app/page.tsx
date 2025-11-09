"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Code, ArrowRight, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(106, 0, 235, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(12, 7, 18, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(92, 0, 204, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={styles.container}>
      <canvas
        ref={canvasRef}
        style={styles.canvas}
      />

      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <div style={styles.navInner}>
            <div style={styles.logo} onClick={() => router.push('/')}>
              <span style={styles.logoText}>
                Sentra<span style={styles.logoGradient}>Sec</span>
              </span>
            </div>

            <button 
              onClick={() => router.push('/dashboard')}
              style={styles.ctaButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.mainContent}>
          <div style={styles.hero}>
            <div style={styles.badge}>
              <Sparkles style={styles.badgeIcon} />
              <span style={styles.badgeText}>AI-Powered Security Platform</span>
            </div>
            
            <h1 style={styles.title}>
              <span style={styles.titleLine}>Elevate Your</span>
              <span style={styles.titleGradient}>Cyber Defense</span>
            </h1>
            
            <p style={styles.subtitle}>
              Advanced threat detection powered by Gemini AI. Analyze phishing attempts, 
              code vulnerabilities, and configuration risks with military-grade precision.
            </p>

            <div style={styles.buttonGroup}>
              <button 
                onClick={() => router.push('/dashboard')}
                style={styles.primaryButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 0 50px rgba(106, 0, 235, 0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(92, 0, 204, 0.5)';
                }}
              >
                Start Scanning
                <ArrowRight style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
              </button>
              
              <button 
                onClick={() => router.push('/about')}
                style={styles.secondaryButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#6A00EB';
                  e.currentTarget.style.background = 'rgba(42, 37, 47, 0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(92, 0, 204, 0.5)';
                  e.currentTarget.style.background = '#2A252F';
                }}
              >
                Learn More
              </button>
            </div>
          </div>

          <div style={styles.featuresGrid}>
            {[
              { 
                icon: Shield, 
                title: 'Phishing Detection', 
                desc: 'AI-powered analysis of suspicious URLs and text',
                gradient: 'linear-gradient(135deg, #5C00CC, #6A00EB)'
              },
              { 
                icon: Code, 
                title: 'Code Scanner', 
                desc: 'Deep vulnerability analysis across all languages',
                gradient: 'linear-gradient(135deg, #6A00EB, #5C00CC)'
              },
              { 
                icon: Lock, 
                title: 'Config Analyzer', 
                desc: 'Security risk assessment for configurations',
                gradient: 'linear-gradient(135deg, #5C00CC, #6A00EB)'
              }
            ].map((feature, i) => (
              <div
                key={i}
                style={styles.featureCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#6A00EB';
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2A252F';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{...styles.featureIcon, background: feature.gradient}}>
                  <feature.icon style={{ width: '24px', height: '24px' }} />
                </div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDesc}>{feature.desc}</p>
              </div>
            ))}
          </div>

          <div style={styles.statsContainer}>
            <div style={styles.statsInner}>
              <div style={styles.statsCard}>
                <p style={styles.statsLabel}>Trusted by Security Teams</p>
                <p style={styles.statsValue}>99.8% Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: '#0C0712',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
  },
  canvas: {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    opacity: 0.4,
  },
  nav: {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 50,
    background: 'rgba(12, 7, 18, 0.8)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid #2A252F',
  },
  navContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 3rem',
  },
  navInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '80px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
  },
  logoText: {
    fontSize: '24px',
    fontFamily: '"Dela Gothic One", cursive',
    fontWeight: 'bold',
  },
  logoGradient: {
    background: 'linear-gradient(135deg, #5C00CC, #6A00EB)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  ctaButton: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #5C00CC, #6A00EB)',
    borderRadius: '9999px',
    fontFamily: 'Arimo, sans-serif',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 20px rgba(92, 0, 204, 0.5)',
    color: 'white',
  },
  main: {
    position: 'relative',
    zIndex: 10,
    paddingTop: '128px',
    paddingBottom: '80px',
    padding: '128px 3rem 80px',
  },
  mainContent: {
    maxWidth: '1280px',
    margin: '0 auto',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '80px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 20px',
    background: '#2A252F',
    border: '1px solid rgba(92, 0, 204, 0.3)',
    borderRadius: '9999px',
    marginBottom: '32px',
    animation: 'float 6s ease-in-out infinite',
  },
  badgeIcon: {
    width: '16px',
    height: '16px',
    color: '#6A00EB',
  },
  badgeText: {
    fontSize: '14px',
    fontFamily: 'Arimo, sans-serif',
    color: '#A8A5AB',
  },
  title: {
    fontSize: '80px',
    fontFamily: '"Dela Gothic One", cursive',
    lineHeight: '1.2',
    marginBottom: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleLine: {
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
    color: '#A8A5AB',
    fontFamily: 'Arimo, sans-serif',
    maxWidth: '768px',
    margin: '0 auto 48px',
    lineHeight: '1.6',
  },
  buttonGroup: {
    display: 'flex',
    gap: '24px',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '20px 40px',
    background: 'linear-gradient(135deg, #5C00CC, #6A00EB)',
    borderRadius: '16px',
    fontSize: '18px',
    fontFamily: 'Arimo, sans-serif',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 20px rgba(92, 0, 204, 0.5)',
    color: 'white',
  },
  secondaryButton: {
    padding: '20px 40px',
    background: '#2A252F',
    border: '2px solid rgba(92, 0, 204, 0.5)',
    borderRadius: '16px',
    fontFamily: 'Arimo, sans-serif',
    fontWeight: 'bold',
    fontSize: '18px',
    transition: 'all 0.3s ease',
    color: 'white',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
    maxWidth: '1024px',
    margin: '0 auto 80px',
  },
  featureCard: {
    padding: '24px',
    background: 'linear-gradient(135deg, rgba(32, 26, 38, 0.8), rgba(42, 37, 47, 0.8))',
    borderRadius: '16px',
    border: '1px solid #2A252F',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  featureIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    boxShadow: '0 0 20px rgba(92, 0, 204, 0.5)',
  },
  featureTitle: {
    fontSize: '24px',
    fontFamily: '"Dela Gothic One", cursive',
    marginBottom: '8px',
    color: 'white',
  },
  featureDesc: {
    color: '#A8A5AB',
    fontFamily: 'Arimo, sans-serif',
  },
  statsContainer: {
    textAlign: 'center',
  },
  statsInner: {
    display: 'inline-block',
    padding: '4px',
    background: 'linear-gradient(135deg, #5C00CC, #6A00EB)',
    borderRadius: '24px',
  },
  statsCard: {
    background: '#0C0712',
    padding: '32px 48px',
    borderRadius: '24px',
  },
  statsLabel: {
    fontSize: '14px',
    fontFamily: 'Arimo, sans-serif',
    color: '#A8A5AB',
    marginBottom: '8px',
  },
  statsValue: {
    fontSize: '48px',
    fontFamily: '"Dela Gothic One", cursive',
    background: 'linear-gradient(135deg, #5C00CC, #6A00EB)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
};