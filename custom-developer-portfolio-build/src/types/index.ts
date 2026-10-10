export interface NavItem {
  label: string;
  href: string;
}

export type SkillCategory = 'Frontend' | 'Programming' | 'Tools' | 'AI';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  description: string;
  iconName?: string;
  highlight?: boolean;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'Web App' | 'Concept' | 'AI / Tool' | 'Fullstack';
  tags: string[];
  image: string;
  githubUrl: string;
  /** Omit when a project has no deployed version — the Live Demo button is hidden. */
  liveDemoUrl?: string;
  featured?: boolean;
  highlights: string[];
  techDetails: {
    frontend?: string;
    backendOrAI?: string;
    styling?: string;
    architecture?: string;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
  idealFor: string;
}

export interface LearningItem {
  id: string;
  title: string;
  category: string;
  status: 'In Progress' | 'Active Exploration' | 'Core Focus';
  description: string;
  topics: string[];
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  note?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  kind: 'Course Completion' | 'Masterclass' | 'Participation';
  credentialId?: string;
  description: string;
  /** Preview image shown on the card and in the lightbox. */
  image: string;
  /** Original file offered for download. */
  file: string;
  /** Whether this certificate is listed on the CV and resume. */
  inCv: boolean;
}
