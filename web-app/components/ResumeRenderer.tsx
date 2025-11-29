import React from 'react';
import { ResumeData } from '../types/resume';

interface ResumeRendererProps {
  data: ResumeData | null;
}

const ResumeRenderer: React.FC<ResumeRendererProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>Resume preview will appear here...</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-black p-10 shadow-lg w-[8.5in] min-h-[11in] mx-auto text-[10.5pt] font-serif leading-normal">
      {/* Header/Summary */}
      {data.summary && (
        <section className="mb-6 border-b-2 border-gray-800 pb-4">
          <h1 className="text-3xl font-bold text-center mb-3 tracking-wide uppercase">
            {/* Placeholder Name if not in JSON, or just "Resume" */}
            Resume
          </h1>
          <p className="text-center text-gray-800 leading-relaxed px-4">
            {data.summary.summary_text}
          </p>
        </section>
      )}

      {/* Education */}
      {data.education && (
        <section className="mb-5">
          <h2 className="text-sm font-bold border-b border-gray-400 mb-3 uppercase tracking-wider text-gray-700">
            Education
          </h2>
          <div className="space-y-2">
             {data.education.masters_coursework && (
                 <div className="flex">
                    <span className="font-bold mr-2">Relevant Coursework:</span>
                    <span className="text-gray-800">{data.education.masters_coursework}</span>
                 </div>
             )}
             {Object.entries(data.education).map(([key, value]) => {
                 if (key !== 'masters_coursework' && typeof value === 'string') {
                     return <p key={key} className="text-gray-800">{value}</p>
                 }
                 return null;
             })}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.skills_category_list && (
        <section className="mb-5">
          <h2 className="text-sm font-bold border-b border-gray-400 mb-3 uppercase tracking-wider text-gray-700">
            Technical Skills
          </h2>
          <div className="space-y-1.5">
            {data.skills.skills_category_list.map((skillGroup, index) => (
              <div key={index} className="flex text-sm">
                <span className="font-bold w-48 shrink-0 text-gray-900">{skillGroup.category}:</span>
                <span className="text-gray-800">{skillGroup.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience && (
        <section className="mb-5">
          <h2 className="text-sm font-bold border-b border-gray-400 mb-3 uppercase tracking-wider text-gray-700">
            Experience
          </h2>
          
          {/* Experience 1 */}
          {data.experience.experience_1_title_company_location && (
            <div className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-gray-900 text-[11pt]">{data.experience.experience_1_title_company_location}</span>
                <span className="font-medium text-gray-600 italic text-sm">{data.experience.experience_1_duration}</span>
              </div>
              <ul className="list-disc list-outside ml-5 space-y-1 text-gray-800">
                {data.experience.experience_1_bullets?.map((bullet, i) => (
                  <li key={i} className="pl-1">{bullet}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Experience 2 */}
          {data.experience.experience_2_title_company_location && (
            <div className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-gray-900 text-[11pt]">{data.experience.experience_2_title_company_location}</span>
                <span className="font-medium text-gray-600 italic text-sm">{data.experience.experience_2_duration}</span>
              </div>
              <ul className="list-disc list-outside ml-5 space-y-1 text-gray-800">
                {data.experience.experience_2_bullets?.map((bullet, i) => (
                  <li key={i} className="pl-1">{bullet}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Projects */}
      {data.projects && (
        <section className="mb-5">
          <h2 className="text-sm font-bold border-b border-gray-400 mb-3 uppercase tracking-wider text-gray-700">
            Projects
          </h2>
          
          {/* Project 1 */}
          {data.projects.project_1_title && (
            <div className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-gray-900 text-[11pt]">{data.projects.project_1_title}</span>
                <span className="font-medium text-gray-600 italic text-sm">{data.projects.project_1_duration}</span>
              </div>
              <ul className="list-disc list-outside ml-5 space-y-1 text-gray-800">
                {data.projects.project_1_bullets?.map((bullet, i) => (
                  <li key={i} className="pl-1">{bullet}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Project 2 */}
          {data.projects.project_2_title && (
            <div className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-gray-900 text-[11pt]">{data.projects.project_2_title}</span>
                <span className="font-medium text-gray-600 italic text-sm">{data.projects.project_2_duration}</span>
              </div>
              <ul className="list-disc list-outside ml-5 space-y-1 text-gray-800">
                {data.projects.project_2_bullets?.map((bullet, i) => (
                  <li key={i} className="pl-1">{bullet}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Achievements */}
      {data.achievements && data.achievements.achievements_bullets && (
        <section className="mb-5">
          <h2 className="text-sm font-bold border-b border-gray-400 mb-3 uppercase tracking-wider text-gray-700">
            Achievements
          </h2>
          <ul className="list-disc list-outside ml-5 space-y-1 text-gray-800">
            {data.achievements.achievements_bullets.map((bullet, i) => (
              <li key={i} className="pl-1">{bullet}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ResumeRenderer;
