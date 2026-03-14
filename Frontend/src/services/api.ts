import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5015/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ExperienceData {
  id: number;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  techStack: string[];
}

export interface SkillData {
  id: number;
  name: string;
  category: string;
  iconName: string;
  proficiency?: string;
  tier?: string;
  yearsOfExperience?: number;
  usageContext?: string;
}

export interface EducationData {
  id: number;
  degree: string;
  institution: string;
  period: string;
  location: string;
  description?: string;
  focus?: string;
  relevantModules?: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ProjectData {
  id: number;
  title: string;
  organization: string;
  description: string;
  features: string[];
  techStack: string[];
  imageUrl?: string;
  projectUrl?: string;
  isInternalProject: boolean;
  architectureDescription?: string;
  architectureImpact?: string;
}

export const getExperience = async (
  lang?: string,
): Promise<ExperienceData[]> => {
  const response = await api.get<ExperienceData[]>("/resume/experience", {
    params: { lang },
  });
  return response.data;
};

export const getProjects = async (lang?: string): Promise<ProjectData[]> => {
  const response = await api.get<ProjectData[]>("/resume/projects", {
    params: { lang },
  });
  return response.data;
};

export const getSkills = async (lang?: string): Promise<SkillData[]> => {
  const response = await api.get<SkillData[]>("/resume/skills", {
    params: { lang },
  });
  return response.data;
};

export const getEducation = async (lang?: string): Promise<EducationData[]> => {
  const response = await api.get<EducationData[]>("/resume/education", {
    params: { lang },
  });
  return response.data;
};

export const sendMessage = async (data: ContactMessage): Promise<void> => {
  await api.post("/contact", data);
};

export const downloadResume = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/resume/download`);
    if (!response.ok) throw new Error("Download failed");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Jamil_Ur_Rehman_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
    throw error;
  }
};
