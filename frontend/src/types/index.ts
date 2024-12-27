
export interface Skill {
  id: number;
  name: string;
  level?: string;
}

interface Project {
  name: string;
  details: string;
}

export interface Experience {
  position: string;
  company: string;
  period: string;
  description: string;
  projects?: Project[];
}

export interface EducationType {
  degree: string;
  school: string;
  year: string;
  details: string;
}

export interface SkillCategory {
  languages: Skill[];
  frameworks: Skill[];
  database: Skill[];
  cloud: Skill[];
  tools: Skill[];
}

export interface ProjectDetails {
  id: number;
  title: string;
  description: string;
  impact: string[];
  features: string[];
  tech: string[];
  image: string;
  githubLink: string;
  liveLink: string;
  isPrivate: boolean;
}
