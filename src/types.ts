export interface Client {
  id: string;
  name: string;
  age: number;
  status: 'initial' | 'assessment' | 'planning' | 'transition' | 'completed';
  needs: string[];
  objectives: string[];
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  familyContacts: {
    id: string;
    name: string;
    relationship: 'spouse' | 'daughter' | 'son' | 'granddaughter' | 'grandson' | 'other';
    phone: string;
    email: string;
  }[];
  notes: {
    id: string;
    date: string;
    content: string;
    author: string;
  }[];
  representative: string;
  nextMeeting?: Date;
}

export type UserRole = 
  | 'Pathways Representative'
  | 'Assisted Living Administrator'
  | 'Property Manager'
  | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  enabled: boolean;
  lastSignIn?: Date;
  createdAt: Date;
}

export type CompanyType = 
  | 'Assisted Living'
  | 'Nursing Home'
  | 'Home Care'
  | 'Senior Community'
  | 'Medical Facility'
  | 'Other';

export interface Company {
  id: string;
  name: string;
  type: CompanyType;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    website?: string;
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contact {
  id: string;
  name: string;
  title: string;
  company?: string;
  phone: string;
  email: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  type: 'meeting' | 'followup' | 'assessment' | 'documentation';
  assignedTo: string;
  clientId?: string;
  clientName?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
  read: boolean;
  link?: string;
}

export interface WorkflowStage {
  id: string;
  label: string;
  tasks: {
    id: string;
    label: string;
    completed: boolean;
  }[];
  hasIssue?: boolean;
}

export interface ClientWorkflow {
  clientId: string;
  currentStage: string;
  stages: {
    [key: string]: WorkflowStage;
  };
}