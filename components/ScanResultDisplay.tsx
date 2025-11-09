import React from 'react';
import { AlertTriangle, CheckCircle, Info, ShieldAlert, BadgeHelp } from 'lucide-react';

// Define types for the expected results
interface PhishingResult {
  risk_level: 'low' | 'medium' | 'high';
  score: number;
  indicators: string[];
  summary: string;
}

interface Issue {
  line: number | null;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  description: string;
  suggestion: string;
}

interface VulnConfigResult {
  issues: Issue[];
  summary: string;
}

interface ClassifyResult {
  classification: 'safe' | 'suspicious' | 'high-risk';
  confidence: number;
  explanation: string;
}

// Helper to get severity colors and icons
const getSeverityProps = (severity: string) => {
  switch (severity) {
    case 'critical':
      return { color: '#ef4444', icon: <ShieldAlert size={18} /> };
    case 'high':
    case 'high-risk':
      return { color: '#f97316', icon: <AlertTriangle size={18} /> };
    case 'medium':
    case 'suspicious':
      return { color: '#eab308', icon: <Info size={18} /> };
    case 'low':
      return { color: '#3b82f6', icon: <BadgeHelp size={18} /> };
    case 'safe':
    default:
      return { color: '#22c55e', icon: <CheckCircle size={18} /> };
  }
};

// --- Result-Specific Renderers ---

const RenderPhishing: React.FC<{ data: PhishingResult }> = ({ data }) => {
  const severityProps = getSeverityProps(data.risk_level);
  return (
    <div>
      <div style={{...styles.summaryBox, borderColor: severityProps.color}}>
        <div style={{...styles.summaryHeader, color: severityProps.color}}>
          {severityProps.icon}
          <span style={{textTransform: 'capitalize'}}>{data.risk_level}</span>
          <span style={styles.confidence}>({(data.score * 100).toFixed(0)}% Score)</span>
        </div>
        <p style={styles.summaryText}>{data.summary}</p>
      </div>
      <h4 style={styles.subheading}>Indicators Found:</h4>
      <ul style={styles.list}>
        {data.indicators.map((indicator, i) => (
          <li key={i} style={styles.listItem}>{indicator}</li>
        ))}
      </ul>
    </div>
  );
};

const RenderVulnConfig: React.FC<{ data: VulnConfigResult }> = ({ data }) => {
  if (data.issues.length === 0) {
    return (
      <div style={{...styles.summaryBox, borderColor: '#22c55e'}}>
        <div style={{...styles.summaryHeader, color: '#22c55e'}}>
          <CheckCircle size={18} />
          <span>No Issues Found</span>
        </div>
        <p style={styles.summaryText}>{data.summary || 'Scan completed, no vulnerabilities detected.'}</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{...styles.summaryBox, borderColor: '#eab308'}}>
        <div style={{...styles.summaryHeader, color: '#eab308'}}>
          <AlertTriangle size={18} />
          <span>{data.issues.length} Issues Found</span>
        </div>
        <p style={styles.summaryText}>{data.summary}</p>
      </div>
      <h4 style={styles.subheading}>Detected Issues:</h4>
      <div style={styles.issueList}>
        {data.issues.map((issue, i) => {
          const severityProps = getSeverityProps(issue.severity);
          return (
            <div key={i} style={{...styles.issueCard, borderLeftColor: severityProps.color}}>
              <div style={{...styles.issueHeader, color: severityProps.color}}>
                {severityProps.icon}
                <span style={{textTransform: 'capitalize'}}>{issue.severity}</span>
                <span style={styles.issueType}>({issue.type})</span>
                {issue.line && <span style={styles.issueLine}>Line: {issue.line}</span>}
              </div>
              <p style={styles.issueText}><strong style={styles.issueLabel}>Description:</strong> {issue.description}</p>
              <p style={styles.issueText}><strong style={styles.issueLabel}>Suggestion:</strong> {issue.suggestion}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RenderClassifier: React.FC<{ data: ClassifyResult }> = ({ data }) => {
  const severityProps = getSeverityProps(data.classification);
  return (
    <div style={{...styles.summaryBox, borderColor: severityProps.color}}>
      <div style={{...styles.summaryHeader, color: severityProps.color}}>
        {severityProps.icon}
        <span style={{textTransform: 'capitalize'}}>{data.classification}</span>
        <span style={styles.confidence}>({(data.confidence * 100).toFixed(0)}% Confidence)</span>
      </div>
      <p style={styles.summaryText}>{data.explanation}</p>
    </div>
  );
};

const RenderError: React.FC<{ error: string }> = ({ error }) => (
  <div style={{...styles.summaryBox, borderColor: '#ef4444'}}>
    <div style={{...styles.summaryHeader, color: '#ef4444'}}>
      <AlertTriangle size={18} />
      <span>Scan Failed</span>
    </div>
    <p style={styles.summaryText}>{error}</p>
  </div>
);

// --- Main Component ---

interface ScanResultDisplayProps {
  scanResult: {
    success?: boolean;
    result?: any;
    error?: string;
  } | null;
}

const ScanResultDisplay: React.FC<ScanResultDisplayProps> = ({ scanResult }) => {
  if (!scanResult) {
    return null; // Don't render anything if there's no result
  }

  // Handle top-level error (e.g., network failure)
  if (scanResult.error) {
    return <RenderError error={scanResult.error} />;
  }

  // Handle error from backend (e.g., {success: false, error: "..."})
  if (scanResult.success === false && scanResult.result?.error) {
    return <RenderError error={scanResult.result.error} />;
  }
  
  // Handle raw output fallback
  if (scanResult.result?.raw_output) {
     return (
       <div>
         <h4 style={styles.subheading}>Raw Output (Parsing Failed):</h4>
         <pre style={styles.rawJson}>{JSON.stringify(scanResult.result, null, 2)}</pre>
       </div>
     );
  }

  const { result } = scanResult;

  // Render based on result type
  if (result && 'risk_level' in result) {
    return <RenderPhishing data={result} />;
  }
  if (result && 'issues' in result) {
    return <RenderVulnConfig data={result} />;
  }
  if (result && 'classification' in result) {
    return <RenderClassifier data={result} />;
  }

  // Fallback for unknown successful response
  return (
    <div>
      <h4 style={styles.subheading}>Raw Response:</h4>
      <pre style={styles.rawJson}>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};

// --- Styles ---

const styles: { [key: string]: React.CSSProperties } = {
  summaryBox: {
    background: '#2A252F',
    border: '1px solid #444',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '16px',
  },
  summaryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '18px',
    fontFamily: '"Dela Gothic One", cursive',
    marginBottom: '8px',
  },
  confidence: {
    fontSize: '14px',
    fontFamily: 'Arimo, sans-serif',
    color: '#A8A5AB',
    fontWeight: 'normal',
  },
  summaryText: {
    fontSize: '14px',
    fontFamily: 'Arimo, sans-serif',
    color: '#A8A5AB',
  },
  subheading: {
    fontFamily: '"Dela Gothic One", cursive',
    fontSize: '16px',
    color: 'white',
    marginBottom: '12px',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '20px',
  },
  listItem: {
    fontSize: '14px',
    fontFamily: 'Arimo, sans-serif',
    color: '#A8A5AB',
    marginBottom: '8px',
  },
  issueList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  issueCard: {
    background: '#2A252F',
    borderRadius: '8px',
    borderLeft: '4px solid #fff',
    padding: '12px 16px',
  },
  issueHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontFamily: 'Arimo, sans-serif',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  issueType: {
    fontFamily: 'monospace',
    fontSize: '14px',
    background: '#0C0712',
    padding: '2px 6px',
    borderRadius: '4px',
    color: '#A8A5AB',
  },
  issueLine: {
    fontFamily: 'monospace',
    fontSize: '14px',
    color: '#A8A5AB',
    marginLeft: 'auto',
  },
  issueText: {
    fontSize: '14px',
    fontFamily: 'Arimo, sans-serif',
    color: '#A8A5AB',
    marginBottom: '4px',
  },
  issueLabel: {
    color: 'white',
    fontWeight: '600',
  },
  rawJson: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    color: 'white',
    fontSize: '12px',
    background: '#0C0712',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #2A252F'
  }
};

export default ScanResultDisplay;