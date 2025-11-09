"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Code, Settings, Search, Activity, CheckCircle, AlertTriangle, Shield, User, XCircle, ChevronRight } from 'lucide-react';
// MODIFICATION: Make sure this path is correct. If you don't have this file, let me know.
// Assuming you have this component from our previous chat.
import ScanResultDisplay from '../../components/ScanResultDisplay'; 

const mockJobs = [
  { id: '1', type: 'text', status: 'safe', confidence: 95, timestamp: '2 hours ago' },
  { id: '2', type: 'code', status: 'suspicious', confidence: 73, timestamp: '5 hours ago' }
];

const toolIdToBackendName = {
  text: 'phishing',
  code: 'vuln',
  config: 'config',
  classify: 'classify',
};

export default function Dashboard() {
  const router = useRouter();
  const [activeScan, setActiveScan] = useState<string | null>(null);
  const [scanInput, setScanInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null); 

  const tools = [
    { 
      id: 'text', 
      icon: FileText, 
      title: 'Phishing Detector', 
      desc: 'Scan text and URLs for phishing attempts',
      gradient: 'linear-gradient(135deg, #5C00CC, #6A00EB)'
    },
    { 
      id: 'code', 
      icon: Code, 
      title: 'Code Scanner', 
      desc: 'Detect vulnerabilities in your codebase',
      gradient: 'linear-gradient(135deg, #6A00EB, #5C00CC)'
    },
    { 
      id: 'config', 
      icon: Settings, 
      title: 'Config Analyzer', 
      desc: 'Analyze configuration security risks',
      gradient: 'linear-gradient(135deg, #5C00CC, #6A00EB)'
    },
    { 
      id: 'classify', 
      icon: Search, 
      title: 'Risk Classifier', 
      desc: 'AI-powered risk level classification',
      gradient: 'linear-gradient(135deg, #6A00EB, #5C00CC)'
    }
  ];

  const handleScan = async () => {
    if (!activeScan || !scanInput) return;

    setIsScanning(true);
    setScanResult(null); 

    const toolName = toolIdToBackendName[activeScan as keyof typeof toolIdToBackendName];

    try {
      //
      // --- MODIFICATION: THIS IS THE FIX ---
      // Replace "YOUR_HF_SPACE_URL.hf.space" with your actual Hugging Face URL
      // and make sure it includes the "/debug/run_tool" path.
      //
      const response = await fetch('https://kurianjose-secentra-ai-backend.hf.space/debug/run_tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool: toolName,
          content: scanInput,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: `Server error: ${response.statusText}` }));
        throw new Error(errorData.error || `Error: ${response.statusText}`);
      }

      const result = await response.json();
      
      console.log('Scan Result:', result);
      setScanResult(result); 

    } catch (error: any) {
      console.error('Scan failed:', error);
      setScanResult({ error: error.message }); 
    } finally {
      setIsScanning(false);
    }
  };

  const getPlaceholder = (scanType: string) => {
    switch(scanType) {
      case 'text': return 'Paste text or URLs to scan for phishing...';
      case 'code': return 'Paste your code here for vulnerability analysis...';
      case 'config': return 'Paste configuration files (JSON, YAML, etc.)...';
      case 'classify': return 'Enter content to classify risk level...';
      default: return 'Enter content to analyze...';
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.bgGlow1} />
      <div style={styles.bgGlow2} />

      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <div style={styles.logo} onClick={() => router.push('/')}>
            <div style={styles.logoIconWrapper}>
              <div style={styles.logoIconGlow} />
            </div>
            <span style={styles.logoText}>
              Sentra<span style={styles.logoGradient}>Sec</span>
            </span>
          </div>
          <div style={styles.userIcon}>
            <div style={styles.userIconGlow} />
            <div style={styles.userIconInner}>
              <User style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
          </div>
        </div>
      </nav>

      <div style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>Security Dashboard</h1>
          <p style={styles.subtitle}>Choose a tool to start analyzing your assets</p>
        </div>

        <div style={styles.toolsGrid}>
          {tools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => {
                setActiveScan(tool.id);
                setScanResult(null); 
                setScanInput(''); 
              }}
              style={styles.toolCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#6A00EB';
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 0 50px rgba(106, 0, 235, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(92, 0, 204, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={styles.toolCardBg} />
              
              <div style={styles.toolCardContent}>
                <div style={styles.toolCardTop}>
                  <div style={{...styles.toolIcon, background: tool.gradient}}>
                    <tool.icon style={{ width: '32px', height: '32px', color: 'white' }} />
                  </div>
                  <ChevronRight style={styles.toolChevron} />
                </div>
                <h3 style={styles.toolTitle}>{tool.title}</h3>
                <p style={styles.toolDesc}>{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.recentScans}>
          <h2 style={styles.recentTitle}>
            <Activity style={{ width: '28px', height: '28px', color: '#6A00EB' }} />
            Recent Scans
          </h2>
          
          <div style={styles.scansList}>
            {mockJobs.map((job) => (
              <div 
                key={job.id} 
                style={styles.scanCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#5C00CC';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(92, 0, 204, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2A252F';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={styles.scanCardContent}>
                  <div style={styles.scanCardLeft}>
                    <div style={job.status === 'safe' ? styles.scanIconSafe : styles.scanIconWarning}>
                      {job.status === 'safe' ? (
                        <CheckCircle style={{ width: '28px', height: '28px', color: '#4ade80' }} />
                      ) : (
                        <AlertTriangle style={{ width: '28px', height: '28px', color: '#facc15' }} />
                      )}
                    </div>
                    <div>
                      <p style={styles.scanType}>{job.type} Scan</p>
                      <p style={styles.scanTime}>{job.timestamp}</p>
                    </div>
                  </div>
                  <div style={job.status === 'safe' ? styles.confidenceBadgeSafe : styles.confidenceBadgeWarning}>
                    {job.confidence}% Confidence
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeScan && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {tools.find(t => t.id === activeScan)?.title}
              </h2>
              <button 
                onClick={() => setActiveScan(null)}
                style={styles.closeButton}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(92, 0, 204, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#2A252F'}
              >
                <XCircle style={{ width: '24px', height: '24px', color: '#A8A5AB' }} />
              </button>
            </div>
            
            <div style={styles.modalBody}>
              <textarea
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                placeholder={getPlaceholder(activeScan)}
                style={styles.textarea}
                disabled={isScanning} 
              />
              
              <button
                onClick={handleScan}
                disabled={!scanInput || isScanning}
                style={{
                  ...styles.scanButton,
                  opacity: !scanInput || isScanning ? 0.5 : 1,
                  cursor: !scanInput || isScanning ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!(!scanInput || isScanning)) {
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(106, 0, 235, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {isScanning ? (
                  <>
                    <div style={styles.spinner} />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Shield style={{ width: '24px', height: '24px' }} />
                    Start Scan
                  </>
                )}
              </button>

              <ScanResultDisplay scanResult={scanResult} />
              
            </div>
          </div>
        </div>
      )}
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
    animation: 'float-3d 20s ease-in-out infinite',
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
    animation: 'float-3d 20s ease-in-out infinite',
    animationDelay: '-10s',
    pointerEvents: 'none',
  },
  nav: {
    position: 'relative',
    zIndex: 50,
    borderBottom: '1px solid #2A252F',
    backdropFilter: 'blur(20px)',
    background: 'rgba(12, 7, 18, 0.8)',
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
  userIcon: {
    position: 'relative',
    cursor: 'pointer',
  },
  userIconGlow: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, #5C00CC, #6A00EB)',
    filter: 'blur(12px)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    borderRadius: '50%',
  },
  userIconInner: {
    position: 'relative',
    width: '44px',
    height: '44px',
    background: 'linear-gradient(135deg, #5C00CC, #6A00EB)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    position: 'relative',
    zIndex: 10,
    paddingTop: '80px',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '80px 24px 40px',
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
  toolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '64px',
  },
  toolCard: {
    position: 'relative',
    padding: '32px',
    background: 'rgba(42, 37, 47, 0.5)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(92, 0, 204, 0.2)',
    borderRadius: '24px',
    cursor: 'pointer',
    transition: 'all 0.5s ease',
  },
  toolCardBg: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(92, 0, 204, 0.1), transparent)',
    borderRadius: '24px',
    opacity: 0,
    transition: 'opacity 0.5s ease',
  },
  toolCardContent: {
    position: 'relative',
    zIndex: 10,
  },
  toolCardTop: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  toolIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease',
  },
  toolChevron: {
    width: '28px',
    height: '28px',
    color: '#A8A5AB',
    transition: 'all 0.3s ease',
  },
  toolTitle: {
    fontSize: '24px',
    fontFamily: '"Dela Gothic One", cursive',
    color: 'white',
    marginBottom: '12px',
  },
  toolDesc: {
    fontFamily: 'Arimo, sans-serif',
    color: '#A8A5AB',
  },
  recentScans: {
    background: 'rgba(42, 37, 47, 0.5)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(92, 0, 204, 0.2)',
    borderRadius: '24px',
    padding: '32px',
  },
  recentTitle: {
    fontSize: '24px',
    fontFamily: '"Dela Gothic One", cursive',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
  },
  scansList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  scanCard: {
    padding: '24px',
    background: '#201A26',
    border: '1px solid #2A252F',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  scanCardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scanCardLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  scanIconSafe: {
    width: '48px',
    height: '48px',
    background: 'rgba(74, 222, 128, 0.2)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanIconWarning: {
    width: '48px',
    height: '48px',
    background: 'rgba(250, 204, 21, 0.2)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanType: {
    fontFamily: 'Arimo, sans-serif',
    fontWeight: 'bold',
    color: 'white',
    fontSize: '18px',
    textTransform: 'capitalize',
  },
  scanTime: {
    fontFamily: 'Arimo, sans-serif',
    fontSize: '14px',
    color: '#A8A5AB',
  },
  confidenceBadgeSafe: {
    padding: '8px 20px',
    borderRadius: '12px',
    fontFamily: 'Arimo, sans-serif',
    fontWeight: '600',
    background: 'rgba(74, 222, 128, 0.2)',
    color: '#4ade80',
  },
  confidenceBadgeWarning: {
    padding: '8px 20px',
    borderRadius: '12px',
    fontFamily: 'Arimo, sans-serif',
    fontWeight: '600',
    background: 'rgba(250, 204, 21, 0.2)',
    color: '#facc15',
  },
  modal: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    padding: '16px',
    animation: 'fade-in 0.3s ease-out',
  },
  modalContent: {
    position: 'relative',
    background: '#201A26',
    border: '1px solid rgba(92, 0, 204, 0.3)',
    borderRadius: '24px',
    boxShadow: '0 0 60px rgba(106, 0, 235, 0.3)',
    maxWidth: '768px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex', 
    flexDirection: 'column',
  },
  modalHeader: {
    padding: '32px',
    borderBottom: '1px solid #2A252F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  modalTitle: {
    fontSize: '32px',
    fontFamily: '"Dela Gothic One", cursive',
    color: 'white',
  },
  closeButton: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: '#2A252F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.3s ease',
    border: 'none',
    cursor: 'pointer',
  },
  modalBody: {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    overflowY: 'auto',
  },
  textarea: {
    width: '100%',
    height: '320px',
    padding: '20px',
    background: '#0C0712',
    border: '2px solid #2A252F',
    borderRadius: '16px',
    color: 'white',
    fontFamily: 'monospace',
    fontSize: '14px',
    resize: 'none',
    transition: 'border-color 0.3s ease',
  },
  scanButton: {
    width: '100%',
    padding: '20px',
    background: 'linear-gradient(135deg, #5C00CC, #6A00EB)',
    borderRadius: '16px',
    fontFamily: 'Arimo, sans-serif',
    fontWeight: 'bold',
    fontSize: '18px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    color: 'white',
    border: 'none',
  },
  spinner: {
    width: '24px',
    height: '24px',
    border: '3px solid white',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  modalNote: {
    fontSize: '14px',
    fontFamily: 'Arimo, sans-serif',
    color: '#A8A5AB',
    textAlign: 'center',
  },
};