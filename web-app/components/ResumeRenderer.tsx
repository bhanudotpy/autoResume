import React, { useState, useEffect, useRef } from 'react';
import { ResumeData } from '../types/resume';

interface ResumeRendererProps {
  data: ResumeData | null;
  onDataChange?: (newData: ResumeData) => void;
  isEditable?: boolean;
}

// Helper to deep clone and update
const updateResumeData = (data: ResumeData, path: string[], value: any): ResumeData => {
  const newData = JSON.parse(JSON.stringify(data));
  let current = newData;
  for (let i = 0; i < path.length - 1; i++) {
    if (current[path[i]] === undefined) {
      current[path[i]] = {};
    }
    current = current[path[i]];
  }
  current[path[path.length - 1]] = value;
  return newData;
};

const EditableField: React.FC<{
  value: string;
  onChange: (val: string) => void;
  className?: string;
  tagName?: 'h1' | 'h2' | 'h3' | 'div' | 'span' | 'p';
  isEditable?: boolean;
}> = ({ value, onChange, className, tagName = 'div', isEditable = true }) => {
  const [localValue, setLocalValue] = useState(value);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setLocalValue(value);
    if (ref.current && ref.current.innerText !== value) {
       // Only update if strictly different to avoid cursor jumping if we were to sync on every keystroke
       // But here we sync on blur, so this is just for external updates
       ref.current.innerText = value;
    }
  }, [value]);

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const newValue = e.currentTarget.innerText;
    if (newValue !== value) {
      onChange(newValue);
    }
  };

  const Tag = tagName as any;

  if (!isEditable) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      className={`${className} outline-none focus:bg-blue-50 focus:ring-1 focus:ring-blue-300 transition-colors rounded px-0.5`}
      onBlur={handleBlur}
      dangerouslySetInnerHTML={{ __html: localValue }}
    />
  );
};

const ResumeRenderer: React.FC<ResumeRendererProps> = ({ data, onDataChange, isEditable = true }) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>Resume preview will appear here...</p>
      </div>
    );
  }

  const handleUpdate = (path: string[], value: any) => {
    if (onDataChange) {
      const newData = updateResumeData(data, path, value);
      onDataChange(newData);
    }
  };

  return (
    <div className="resume-container bg-white text-black p-[0.5in] w-[8.5in] min-h-[11in] mx-auto">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Calibri:wght@400;700&display=swap');
        
        .resume-container {
          font-family: "Calibri", "Arial", sans-serif;
          font-size: 10pt;
          line-height: 1.1;
          color: #000;
        }

        .resume-container a {
          color: #000;
          text-decoration: none;
        }

        .resume-container a:hover {
          text-decoration: underline;
        }

        .resume-container .header {
          text-align: center;
          margin-bottom: 0.5em;
        }

        .resume-container .header h1 {
          font-size: 18pt;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 0.2em;
        }

        .resume-container .contact-info {
          font-size: 10pt;
          margin-bottom: 0.5em;
          text-align: center;
        }

        .resume-container .contact-info span {
          margin: 0 0.35em;
        }

        .resume-container .section {
          margin-bottom: 0.4em;
        }

        .resume-container .section-title {
          font-size: 11pt;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 0.05em;
        }

        .resume-container .section-line {
          border-bottom: 1px solid #000;
          margin-bottom: 0.25em;
        }

        .resume-container .summary-text {
          line-height: 1.1;
          text-align: justify;
        }

        .resume-container .education-item {
          margin-bottom: 0.25em;
          line-height: 1.1;
        }

        .resume-container .education-item:last-child {
          margin-bottom: 0;
        }

        .resume-container .edu-header {
          font-weight: bold;
        }

        .resume-container .right-align {
          float: right;
          font-weight: bold;
        }

        .resume-container .clear {
          clear: both;
        }

        .resume-container .skill-list {
          margin-left: 0;
          margin-top: 0.1em;
          list-style-type: none;
          padding-left: 0;
        }

        .resume-container .skill-list li {
          margin-bottom: 0.15em;
          line-height: 1.1;
        }

        .resume-container .experience-item {
          margin-bottom: 0.25em;
        }

        .resume-container .experience-item:last-child {
          margin-bottom: 0;
        }

        .resume-container .exp-header {
          font-weight: bold;
          margin-bottom: 0.1em;
          line-height: 1.1;
        }

        .resume-container .exp-list {
          margin-left: 1.25em;
          margin-top: 0.1em;
          list-style-type: disc;
        }

        .resume-container .exp-list li {
          margin-bottom: 0.1em;
          line-height: 1.1;
        }

        .resume-container .project-item {
          margin-bottom: 0.25em;
        }

        .resume-container .project-item:last-child {
          margin-bottom: 0;
        }

        .resume-container .project-title {
          font-weight: bold;
        }

        .resume-container .achievement-list {
          margin-left: 1.25em;
          margin-top: 0.2em;
          list-style-type: disc;
        }

        .resume-container .achievement-list li {
          margin-bottom: 0.15em;
          line-height: 1.1;
        }
      `}</style>

      {/* Header */}
      <div className="header">
        <h1>Resume</h1>
        {/* Placeholder contact info since it's not in the JSON structure provided */}
        <div className="contact-info">
          <span>City, State</span> | 
          <span>email@example.com</span> | 
          <span>(123) 456-7890</span> | 
          <span>linkedin.com/in/yourprofile</span>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="section">
          <div className="section-title">Summary</div>
          <div className="section-line"></div>
          <div className="summary-text">
            <EditableField 
              value={data.summary.summary_text} 
              onChange={(val) => handleUpdate(['summary', 'summary_text'], val)}
              isEditable={isEditable}
            />
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && (
        <div className="section">
          <div className="section-title">Education</div>
          <div className="section-line"></div>

          <div className="education-item">
             {Object.entries(data.education).map(([key, value]) => {
                 if (key !== 'masters_coursework' && typeof value === 'string') {
                     return (
                       <EditableField
                         key={key}
                         className="edu-header"
                         value={value}
                         onChange={(val) => handleUpdate(['education', key], val)}
                         isEditable={isEditable}
                       />
                     );
                 }
                 return null;
             })}
            
            {data.education.masters_coursework && (
              <ul className="skill-list">
                <li>
                  <strong>Coursework:</strong> 
                  <EditableField
                    tagName="span"
                    value={data.education.masters_coursework}
                    onChange={(val) => handleUpdate(['education', 'masters_coursework'], val)}
                    isEditable={isEditable}
                  />
                </li>
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.skills_category_list && (
        <div className="section">
          <div className="section-title">Skills</div>
          <div className="section-line"></div>

          <ul className="skill-list">
            {data.skills.skills_category_list.map((skillGroup, index) => (
              <li key={index}>
                <strong>
                  <EditableField
                    tagName="span"
                    value={skillGroup.category}
                    onChange={(val) => handleUpdate(['skills', 'skills_category_list', index.toString(), 'category'], val)}
                    isEditable={isEditable}
                  />:
                </strong> 
                <EditableField
                    tagName="span"
                    value={skillGroup.items.join(', ')}
                    onChange={(val) => handleUpdate(['skills', 'skills_category_list', index.toString(), 'items'], val.split(',').map(s => s.trim()))}
                    isEditable={isEditable}
                  />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Experience */}
      {data.experience && (
        <div className="section">
          <div className="section-title">Experience</div>
          <div className="section-line"></div>

          {/* Experience 1 */}
          {data.experience.experience_1_title_company_location && (
            <div className="experience-item">
              <div className="exp-header">
                <EditableField
                  tagName="span"
                  value={data.experience.experience_1_title_company_location}
                  onChange={(val) => handleUpdate(['experience', 'experience_1_title_company_location'], val)}
                  isEditable={isEditable}
                />
                <span className="right-align">
                  <EditableField
                    tagName="span"
                    value={data.experience.experience_1_duration || ''}
                    onChange={(val) => handleUpdate(['experience', 'experience_1_duration'], val)}
                    isEditable={isEditable}
                  />
                </span>
              </div>
              <div className="clear"></div>
              <ul className="exp-list">
                {data.experience.experience_1_bullets?.map((bullet, i) => (
                  <li key={i}>
                    <EditableField
                      tagName="span"
                      value={bullet}
                      onChange={(val) => {
                        const newBullets = [...(data.experience?.experience_1_bullets || [])];
                        newBullets[i] = val;
                        handleUpdate(['experience', 'experience_1_bullets'], newBullets);
                      }}
                      isEditable={isEditable}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Experience 2 */}
          {data.experience.experience_2_title_company_location && (
            <div className="experience-item">
              <div className="exp-header">
                <EditableField
                  tagName="span"
                  value={data.experience.experience_2_title_company_location}
                  onChange={(val) => handleUpdate(['experience', 'experience_2_title_company_location'], val)}
                  isEditable={isEditable}
                />
                <span className="right-align">
                  <EditableField
                    tagName="span"
                    value={data.experience.experience_2_duration || ''}
                    onChange={(val) => handleUpdate(['experience', 'experience_2_duration'], val)}
                    isEditable={isEditable}
                  />
                </span>
              </div>
              <div className="clear"></div>
              <ul className="exp-list">
                {data.experience.experience_2_bullets?.map((bullet, i) => (
                  <li key={i}>
                    <EditableField
                      tagName="span"
                      value={bullet}
                      onChange={(val) => {
                        const newBullets = [...(data.experience?.experience_2_bullets || [])];
                        newBullets[i] = val;
                        handleUpdate(['experience', 'experience_2_bullets'], newBullets);
                      }}
                      isEditable={isEditable}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Projects */}
      {data.projects && (
        <div className="section">
          <div className="section-title">Projects</div>
          <div className="section-line"></div>

          {/* Project 1 */}
          {data.projects.project_1_title && (
            <div className="project-item">
              <div>
                <span className="project-title">
                  <EditableField
                    tagName="span"
                    value={data.projects.project_1_title || ''}
                    onChange={(val) => handleUpdate(['projects', 'project_1_title'], val)}
                    isEditable={isEditable}
                  />
                </span>
                <span className="right-align">
                  <EditableField
                    tagName="span"
                    value={data.projects.project_1_duration || ''}
                    onChange={(val) => handleUpdate(['projects', 'project_1_duration'], val)}
                    isEditable={isEditable}
                  />
                </span>
              </div>
              <div className="clear"></div>
              <ul className="exp-list">
                {data.projects.project_1_bullets?.map((bullet, i) => (
                  <li key={i}>
                    <EditableField
                      tagName="span"
                      value={bullet}
                      onChange={(val) => {
                        const newBullets = [...(data.projects?.project_1_bullets || [])];
                        newBullets[i] = val;
                        handleUpdate(['projects', 'project_1_bullets'], newBullets);
                      }}
                      isEditable={isEditable}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Project 2 */}
          {data.projects.project_2_title && (
            <div className="project-item">
              <div>
                <span className="project-title">
                  <EditableField
                    tagName="span"
                    value={data.projects.project_2_title || ''}
                    onChange={(val) => handleUpdate(['projects', 'project_2_title'], val)}
                    isEditable={isEditable}
                  />
                </span>
                <span className="right-align">
                  <EditableField
                    tagName="span"
                    value={data.projects.project_2_duration || ''}
                    onChange={(val) => handleUpdate(['projects', 'project_2_duration'], val)}
                    isEditable={isEditable}
                  />
                </span>
              </div>
              <div className="clear"></div>
              <ul className="exp-list">
                {data.projects.project_2_bullets?.map((bullet, i) => (
                  <li key={i}>
                    <EditableField
                      tagName="span"
                      value={bullet}
                      onChange={(val) => {
                        const newBullets = [...(data.projects?.project_2_bullets || [])];
                        newBullets[i] = val;
                        handleUpdate(['projects', 'project_2_bullets'], newBullets);
                      }}
                      isEditable={isEditable}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Achievements */}
      {data.achievements && data.achievements.achievements_bullets && (
        <div className="section">
          <div className="section-title">Achievements</div>
          <div className="section-line"></div>

          <ul className="achievement-list">
            {data.achievements.achievements_bullets.map((bullet, i) => (
              <li key={i}>
                <EditableField
                  tagName="span"
                  value={bullet}
                  onChange={(val) => {
                    const newBullets = [...(data.achievements?.achievements_bullets || [])];
                    newBullets[i] = val;
                    handleUpdate(['achievements', 'achievements_bullets'], newBullets);
                  }}
                  isEditable={isEditable}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeRenderer;
