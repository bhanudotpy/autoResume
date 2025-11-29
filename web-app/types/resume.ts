export interface ResumeData {
  summary?: {
    summary_text: string;
  };
  experience?: {
    experience_1_title_company_location?: string;
    experience_1_duration?: string;
    experience_1_bullets?: string[];
    experience_2_title_company_location?: string;
    experience_2_duration?: string;
    experience_2_bullets?: string[];
    [key: string]: any; // Allow for dynamic fields if needed
  };
  projects?: {
    project_1_title?: string;
    project_1_duration?: string;
    project_1_bullets?: string[];
    project_2_title?: string;
    project_2_duration?: string;
    project_2_bullets?: string[];
    [key: string]: any;
  };
  education?: {
    masters_coursework?: string;
    [key: string]: any;
  };
  skills?: {
    skills_category_list?: {
      category: string;
      items: string[];
    }[];
  };
  achievements?: {
    achievements_bullets?: string[];
  };
}
