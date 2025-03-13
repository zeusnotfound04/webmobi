export interface Candidate {
    id?: string;
    name: string;
    email: string;
    linkedinUrl: string;
    resumeText: string;
    skills: string[];
    experience: string;
    createdAt?: string;
  }
  
  export interface JobDescription {
    id?: string;
    title: string;
    description: string;
    requiredSkills: string[];
    createdAt?: string;
  }