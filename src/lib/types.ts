export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface Job {
  jobId: string;
  userId: string;
  fileType: 'text' | 'code' | 'config';
  fileName: string;
  classification: 'safe' | 'suspicious' | 'malicious' | 'pending';
  confidence: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  findings?: Finding[];
  timestamp: number;
  createdAt: Date;
}

export interface Finding {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location?: string;
  recommendation?: string;
}

export interface Feedback {
  id?: string;
  jobId: string;
  findingId: string;
  userId: string;
  label: 'correct' | 'incorrect' | 'unsure';
  note?: string;
  timestamp: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  photoURL?: string;
  createdAt: Date;
  retainData: boolean;
}