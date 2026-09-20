export interface ProjectLink {
  label: string;
  url: string;
  type?: 'demo' | 'github' | 'prototype' | 'figma' | 'other';
}

export interface CaseStudySection {
  id: string;
  title: string;
  content: string;
  guidingQuestions?: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  summary: string;
  role: string;
  timeline: string;
  status: string;
  tags: string[];
  links: ProjectLink[];
  sections: CaseStudySection[];
}

export interface JourneyItem {
  id: string;
  type: 'education' | 'experience';
  period: string;
  roleOrDegree: string;
  organization: string;
  location?: string;
  shortSummary: string;
  details: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
  location?: string;
  availabilityNote?: string;
}

export interface PortfolioContent {
  personal: {
    name: string;
    role: string;
    heroSubtitle: string;
    location: string;
    tagline: string;
  };
  about: {
    title: string;
    bioParagraphs: string[];
    focusAreas: string[];
    quickFacts: { label: string; value: string }[];
  };
  projects: Project[];
  journey: JourneyItem[];
  skills: SkillCategory[];
  contact: ContactInfo;
}
