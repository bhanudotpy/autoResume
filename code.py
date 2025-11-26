# from docx import Document
# from docx.oxml import OxmlElement
# from docx.oxml.ns import qn
# from docx.shared import Inches, Pt
# import json

# # Sample JSON data
# json_data = """
# {
#   "contact": {
#     "name": "BHANU PRAKASH REDDY GUNDAM",
#     "location": "Gainesville, FL",
#     "phone": "3522816395",
#     "email": "bhanuprakashreddygundam@gmail.com",
#     "linkedin": "linkedin.com/in/gbpr/",
#     "github": "github.com/bhanudotpy"
#   },
#   "summary": "A Software Engineer with a strong foundation in scalable systems and data-driven insights. Skilled in Python, C++, and Machine Learning, with experience analyzing datasets and developing AI-powered solutions. Passionate about applying technical expertise to build high-performance web applications and innovate in Backend Technologies, contributing to product development and enhancing consumer experiences with AI APIs and Large Language Models (LLMs).",
#   "education": [
#     {
#       "institution": "University of Florida",
#       "location": "Gainesville, Florida, USA",
#       "degree": "Master of Science in Computer And Information Science",
#       "duration": "JAN 2024 - DEC 2025",
#       "cgpa": "3.81",
#       "coursework": "Advance Data structures; Data Engineering; Computer Networks; NLP Applications; UX Design and more."
#     },
#     {
#       "institution": "Bennett University",
#       "location": "Greater Noida, Uttar Pradesh, INDIA",
#       "degree": "Bachelor of Technology in Computer Science",
#       "duration": "JUL 2020 - DEC 2023",
#       "cgpa": "9.4",
#       "coursework": "Database management systems; Operating systems; High-performance computing; Web Technologies."
#     }
#   ],
#   "skills": [
#     {
#       "category": "Languages",
#       "items": [
#         "Python",
#         "C++",
#         "C#",
#         "Golang",
#         "Java",
#         "C"
#       ]
#     },
#     {
#       "category": "Backend & Databases",
#       "items": [
#         "FastAPI",
#         "Django",
#         "Node.js",
#         "Express.js",
#         "PostgreSQL",
#         "MySQL",
#         "MongoDB"
#       ]
#     },
#     {
#       "category": "Web Technologies",
#       "items": [
#         "HTML5",
#         "CSS3",
#         "JavaScript",
#         "React.js",
#         "Express.js",
#         "Node.js",
#         "jQuery",
#         "Bootstrap"
#       ]
#     },
#     {
#       "category": "Tools & Frameworks",
#       "items": [
#         "Git",
#         "GitHub",
#         "Selenium",
#         "Pandas",
#         "OpenCV",
#         "Streamlit",
#         "NumPy",
#         "scikit-learn",
#         "XGBoost",
#         "Matplotlib"
#       ]
#     },
#     {
#       "category": "CS Fundamentals",
#       "items": [
#         "Operating Systems",
#         "DBMS",
#         "Computer Networks",
#         "Software Engineering",
#         "Algorithms",
#         "Data Structures",
#         "Machine Learning",
#         "Large Language Models (LLMs)",
#         "Data Engineering"
#       ]
#     }
#   ],
#   "experience": [
#     {
#       "title": "Software Developer Intern",
#       "duration": "JUL 2023 - DEC 2023",
#       "company": "Dev Global Services",
#       "location": "Vijayawada, Andhra Pradesh, India",
#       "achievements": [
#         "Designed and deployed scalable Backend microservices using Python (FastAPI) to support real-time student data management and course enrollment workflows for 2,000+ users across multiple institutions, focusing on performance.",
#         "Integrated PostgreSQL with optimized indexing and query tuning, reducing average data retrieval time by 40% and enabling reliable, real-time search and detailed analytics for academic counsellors, ensuring security.",
#         "Builds RESTful AI APIs for form submissions and progress tracking with 99.9% uptime, supporting seamless integration with front-end web applications.",
#         "Collaborated within cross-functional Agile teams, participating in sprint planning, peer code reviews, unit/integration testing, and CI/CD pipelines, ensuring high test coverage and reliable, maintainable code delivery in a fast-paced environment."
#       ]
#     },
#     {
#       "title": "Web Development Volunteer",
#       "duration": "SEP 2024 - DEC 2024",
#       "company": "University of Florida",
#       "location": "Gainesville, FL (Under the guidance of Prof. Ashish Aggarwal)",
#       "achievements": [
#         "Built and maintained end-to-end ETL pipelines for Yantra, automating ingestion, validation, and transformation of multi-source educational datasets using Python and SQL to enhance data scalability and consistency for AI applications.",
#         "Designed and optimized PostgreSQL schemas and indexing strategies to handle large analytical workloads efficiently, reducing complex query execution time by 25% and improving overall data performance in Backend Technologies.",
#         "Performed exploratory data analysis and developed insight dashboards using Python, Pandas, and visualization libraries, uncovering engagement trends that directly informed UX and product improvement decisions, enhancing consumer experiences."
#       ]
#     }
#   ],
#   "projects": [
#     {
#       "title": "Brazilian E-Commerce Data Analysis",
#       "duration": "FEB 2025 - JUN 2025",
#       "tech_summary": "Developed using Python, Pandas, NumPy, Matplotlib, scikit-learn, XGBoost, and Streamlit.",
#       "achievements": [
#         "Designed and deployed an end-to-end data science pipeline analyzing the Brazilian E-Commerce Public Dataset by Olist (100K+ orders across 3 years), covering data cleaning, feature engineering, Machine Learning modeling, and interactive visualization.",
#         "Engineered predictive features (product volume, shipping density, delivery distance) and performed feature selection, improving interpretability and contributing to achieving R\u00b2 = 0.96 using an XGBoost regression model for freight value prediction within AI Research.",
#         "Developed an interactive Streamlit dashboard used by analysts to track seller KPIs, company-wide trends, and geographic performance, enabling 20% faster decision-making on shipping and logistics strategies for Web Applications.",
#         "Implemented scalable visualization and real-time freight estimation, demonstrating how predictive analytics can reduce logistics errors and improve operational efficiency in large-scale e-commerce platforms, enhancing performance and scalability."
#       ]
#     },
#     {
#       "title": "Art Gallery",
#       "duration": "AUG 2024 - NOV 2024",
#       "tech_summary": "Developed using Node.js, MongoDB, Python, Cloudinary, Socket.IO, REST API, JWT, Express.js.",
#       "achievements": [
#         "Developed and deployed a scalable Backend platform for an online human-art marketplace, supporting concurrent users with secure artwork uploads, real-time auctions, and sales analytics, while leveraging Cloudinary for high-quality image delivery, ensuring security.",
#         "Integrated a Python-based AI authenticity detection model via REST APIs to identify and filter AI-generated art with 93% accuracy, and implemented robust security features including JWT authentication, role-based access control, rate-limiting, and modular APIs.",
#         "Optimized user experience and engagement with Socket.IO real-time notifications and instant bidding, strengthening trust and transparency in digital creative communities, with authentic online expression, enhancing consumer experiences."
#       ]
#     }
#   ],
#   "publications_achievements": [
#     "Published a peer-reviewed research paper in IEEE Xplore titled- Compressed Deep Learning Model for Detecting COVID-19 Disease: A Genetic Algorithm based approach at SmartTechCon 2023, Singapore.",
#     "Presented a machine learning\u2013based Land Price Prediction solution at HERE Technologies' Hackathon on Land and House Price Prediction, showcasing predictive modelling and technical problem-solving in real estate analytics.",
#     "Awarded USD 4,500 scholarship during Master's at University of Florida and a 25% scholarship during undergraduate studies."
#   ]
# }
# """


# def capture_formatting(paragraph):
#     """Capture formatting from a paragraph's first run."""
#     if not paragraph.runs:
#         return None

#     first_run = paragraph.runs[0]
#     return {
#         'bold': first_run.bold,
#         'italic': first_run.italic,
#         'underline': first_run.underline,
#         'font_size': first_run.font.size,
#         'font_name': first_run.font.name,
#         'font_color': first_run.font.color.rgb if first_run.font.color.rgb else None
#     }


# def apply_formatting(run, formatting):
#     """Apply formatting to a run."""
#     if not formatting:
#         return

#     if formatting['bold'] is not None:
#         run.bold = formatting['bold']
#     if formatting['italic'] is not None:
#         run.italic = formatting['italic']
#     if formatting['underline'] is not None:
#         run.underline = formatting['underline']
#     if formatting['font_size']:
#         run.font.size = formatting['font_size']
#     if formatting['font_name']:
#         run.font.name = formatting['font_name']
#     if formatting['font_color']:
#         run.font.color.rgb = formatting['font_color']


# def replace_text_in_paragraph(paragraph, old_text, new_text):
#     """Replace text in a paragraph while preserving formatting."""
#     if old_text not in paragraph.text:
#         return False

#     # Try to replace within a single run
#     for run in paragraph.runs:
#         if old_text in run.text:
#             run.text = run.text.replace(old_text, new_text)
#             return True

#     # If placeholder spans multiple runs, rebuild paragraph
#     full_text = paragraph.text
#     if old_text in full_text:
#         first_run = paragraph.runs[0] if paragraph.runs else None

#         # Clear all runs
#         for run in paragraph.runs:
#             run.text = ''

#         # Create new run with replaced text
#         new_run = paragraph.add_run(full_text.replace(old_text, new_text))

#         # Copy formatting from first run
#         if first_run:
#             new_run.bold = first_run.bold
#             new_run.italic = first_run.italic
#             new_run.underline = first_run.underline
#             new_run.font.size = first_run.font.size
#             new_run.font.name = first_run.font.name
#             if first_run.font.color.rgb:
#                 new_run.font.color.rgb = first_run.font.color.rgb

#         return True

#     return False


# def create_bullet_paragraph(doc, paragraph_index, text, formatting=None):
#     """Create a single bullet paragraph with proper formatting."""
#     parent = doc.paragraphs[paragraph_index]._element.getparent()

#     # Create new paragraph
#     new_para = doc.add_paragraph()
#     run = new_para.add_run(text)

#     # Apply text formatting
#     apply_formatting(run, formatting)

#     # Set indentation
#     new_para.paragraph_format.left_indent = Inches(0.13)
#     new_para.paragraph_format.right_indent = Inches(0)
#     new_para.paragraph_format.first_line_indent = Inches(-0.13)

#     # Set spacing
#     new_para.paragraph_format.space_before = Pt(0)
#     new_para.paragraph_format.space_after = Pt(0)
#     new_para.paragraph_format.line_spacing = 1.0

#     # Add bullet formatting using XML
#     pPr = new_para._element.get_or_add_pPr()
#     numPr = OxmlElement('w:numPr')

#     ilvl = OxmlElement('w:ilvl')
#     ilvl.set(qn('w:val'), '0')
#     numPr.append(ilvl)

#     numId = OxmlElement('w:numId')
#     numId.set(qn('w:val'), '1')
#     numPr.append(numId)

#     pPr.append(numPr)

#     # Insert at correct position
#     parent.insert(paragraph_index + 1, new_para._element)


# def insert_bullets(doc, paragraph_index, bullets, formatting=None):
#     """Insert multiple bullet points after a paragraph."""
#     for i, bullet in enumerate(bullets):
#         create_bullet_paragraph(doc, paragraph_index + i, bullet, formatting)


# def process_section_with_bullets(doc, data_list, section_prefix):
#     """Process a section (experience/projects) with numbered placeholders and bullets."""
#     for idx, item in enumerate(data_list, start=1):
#         bullets_para_index = None
#         placeholder_formatting = None

#         # Define placeholders based on section type
#         if section_prefix == 'experience':
#             placeholders = {
#                 'title': f'[{section_prefix}_{idx}_title]',
#                 'duration': f'[{section_prefix}_{idx}_duration]',
#                 'company': f'[{section_prefix}_{idx}_company]',
#                 'location': f'[{section_prefix}_{idx}_location]',
#                 'bullets': f'[{section_prefix}_{idx}_bullets]'
#             }
#             replacements = {
#                 'title': item['title'],
#                 'duration': item['duration'],
#                 'company': item['company'],
#                 'location': item['location']
#             }
#         else:  # projects
#             placeholders = {
#                 'title': f'[{section_prefix}_{idx}_title]',
#                 'duration': f'[{section_prefix}_{idx}_duration]',
#                 'tech_summary': f'[{section_prefix}_{idx}_tech_summary]',
#                 'bullets': f'[{section_prefix}_{idx}_bullets]'
#             }
#             replacements = {
#                 'title': item['title'],
#                 'duration': item['duration'],
#                 'tech_summary': item['tech_summary']
#             }

#         # Process paragraphs
#         for i, paragraph in enumerate(doc.paragraphs):
#             # Replace text placeholders
#             for key, placeholder in placeholders.items():
#                 if key != 'bullets':
#                     replace_text_in_paragraph(
#                         paragraph, placeholder, replacements[key])

#             # Handle bullets placeholder
#             if placeholders['bullets'] in paragraph.text:
#                 bullets_para_index = i
#                 placeholder_formatting = capture_formatting(paragraph)
#                 p_element = paragraph._element
#                 p_element.getparent().remove(p_element)

#         # Insert bullets
#         if bullets_para_index is not None:
#             insert_bullets(doc, bullets_para_index - 1,
#                            item['achievements'], placeholder_formatting)


# def process_skills(doc, skills_data):
#     """Process skills section."""
#     for i, paragraph in enumerate(doc.paragraphs):
#         if '[skills]' not in paragraph.text:
#             continue

#         # Capture formatting
#         ref_font_name = None
#         ref_font_size = None
#         ref_font_color = None
#         style = paragraph.style

#         if paragraph.runs:
#             ref_font = paragraph.runs[0].font
#             ref_font_name = ref_font.name
#             ref_font_size = ref_font.size
#             ref_font_color = ref_font.color.rgb if ref_font.color.rgb else None

#         # Clear placeholder
#         paragraph.text = ""
#         p_index = i

#         # Insert skills
#         for group in skills_data:
#             new_p = doc.paragraphs[p_index].insert_paragraph_before()
#             new_p.style = style
#             new_p.paragraph_format.space_after = 0

#             # Bold category
#             run_bold = new_p.add_run(f"{group['category']}: ")
#             run_bold.bold = True
#             if ref_font_name:
#                 run_bold.font.name = ref_font_name
#             if ref_font_size:
#                 run_bold.font.size = ref_font_size
#             if ref_font_color:
#                 run_bold.font.color.rgb = ref_font_color

#             # Regular items 
#             run_items = new_p.add_run(", ".join(group["items"]))
#             if ref_font_name:
#                 run_items.font.name = ref_font_name
#             if ref_font_size:
#                 run_items.font.size = ref_font_size
#             if ref_font_color:
#                 run_items.font.color.rgb = ref_font_color

#             p_index += 1

#         # Remove placeholder paragraph
#         paragraph._element.getparent().remove(paragraph._element)
#         break


# def generate_resume(template_path, output_path, data):
#     """Main function to generate resume from template and data."""
#     doc = Document(template_path)
#     json_data = json.loads(data)

#     # Process summary
#     if 'summary' in json_data:
#         for paragraph in doc.paragraphs:
#             replace_text_in_paragraph(
#                 paragraph, '[summary]', json_data['summary'])

#     # Process experience section
#     if 'experience' in json_data:
#         process_section_with_bullets(
#             doc, json_data['experience'], 'experience')

#     # Process projects section
#     if 'projects' in json_data:
#         process_section_with_bullets(doc, json_data['projects'], 'project')

#     # Process skills section
#     if 'skills' in json_data:
#         process_skills(doc, json_data['skills'])

#     # Save document
#     doc.save(output_path)
#     print(f"✅ Resume generated successfully: {output_path}")


# # Example usage
# if __name__ == "__main__":
#     input_file = 'template_long.docx'
#     output_file = 'resume_filled.docx'

#     generate_resume(input_file, output_file, json_data)


from docx import Document
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt
import json


def capture_formatting(paragraph):
    """Capture formatting from a paragraph's first run."""
    if not paragraph.runs:
        return None

    first_run = paragraph.runs[0]
    return {
        'bold': first_run.bold,
        'italic': first_run.italic,
        'underline': first_run.underline,
        'font_size': first_run.font.size,
        'font_name': first_run.font.name,
        'font_color': first_run.font.color.rgb if first_run.font.color.rgb else None
    }


def apply_formatting(run, formatting):
    """Apply formatting to a run."""
    if not formatting:
        return

    if formatting['bold'] is not None:
        run.bold = formatting['bold']
    if formatting['italic'] is not None:
        run.italic = formatting['italic']
    if formatting['underline'] is not None:
        run.underline = formatting['underline']
    if formatting['font_size']:
        run.font.size = formatting['font_size']
    if formatting['font_name']:
        run.font.name = formatting['font_name']
    if formatting['font_color']:
        run.font.color.rgb = formatting['font_color']


def replace_text_in_paragraph(paragraph, old_text, new_text):
    """Replace text in a paragraph while preserving formatting."""
    if old_text not in paragraph.text:
        return False

    # Try to replace within a single run
    for run in paragraph.runs:
        if old_text in run.text:
            run.text = run.text.replace(old_text, new_text)
            return True

    # If placeholder spans multiple runs, rebuild paragraph
    full_text = paragraph.text
    if old_text in full_text:
        first_run = paragraph.runs[0] if paragraph.runs else None

        # Clear all runs
        for run in paragraph.runs:
            run.text = ''

        # Create new run with replaced text
        new_run = paragraph.add_run(full_text.replace(old_text, new_text))

        # Copy formatting from first run
        if first_run:
            new_run.bold = first_run.bold
            new_run.italic = first_run.italic
            new_run.underline = first_run.underline
            new_run.font.size = first_run.font.size
            new_run.font.name = first_run.font.name
            if first_run.font.color.rgb:
                new_run.font.color.rgb = first_run.font.color.rgb

        return True

    return False


def create_bullet_paragraph(doc, paragraph_index, text, formatting=None):
    """Create a single bullet paragraph with proper formatting."""
    parent = doc.paragraphs[paragraph_index]._element.getparent()

    # Create new paragraph
    new_para = doc.add_paragraph()
    run = new_para.add_run(text)

    # Apply text formatting
    apply_formatting(run, formatting)

    # Set indentation
    new_para.paragraph_format.left_indent = Inches(0.13)
    new_para.paragraph_format.right_indent = Inches(0)
    new_para.paragraph_format.first_line_indent = Inches(-0.13)

    # Set spacing
    new_para.paragraph_format.space_before = Pt(0)
    new_para.paragraph_format.space_after = Pt(0)
    new_para.paragraph_format.line_spacing = 1.0

    # Add bullet formatting using XML
    pPr = new_para._element.get_or_add_pPr()
    numPr = OxmlElement('w:numPr')

    ilvl = OxmlElement('w:ilvl')
    ilvl.set(qn('w:val'), '0')
    numPr.append(ilvl)

    numId = OxmlElement('w:numId')
    numId.set(qn('w:val'), '1')
    numPr.append(numId)

    pPr.append(numPr)

    # Insert at correct position
    parent.insert(paragraph_index + 1, new_para._element)


def insert_bullets(doc, paragraph_index, bullets, formatting=None):
    """Insert multiple bullet points after a paragraph."""
    for i, bullet in enumerate(bullets):
        create_bullet_paragraph(doc, paragraph_index + i, bullet, formatting)


def process_simple_replacements(doc, json_data):
    """Process all simple text replacements (non-bullet fields)."""
    # Define all simple replacement mappings
    replacements = {}
    
    # Experience section
    if 'experience' in json_data:
        exp = json_data['experience']
        replacements['[experience_1_title_company_location]'] = exp.get('experience_1_title_company_location', '')
        replacements['[experience_1_duration]'] = exp.get('experience_1_duration', '')
        replacements['[experience_2_title_company_location]'] = exp.get('experience_2_title_company_location', '')
        replacements['[experience_2_duration]'] = exp.get('experience_2_duration', '')
    
    # Projects section
    if 'projects' in json_data:
        proj = json_data['projects']
        replacements['[project_1_title]'] = proj.get('project_1_title', '')
        replacements['[project_1_duration]'] = proj.get('project_1_duration', '')
        replacements['[project_2_title]'] = proj.get('project_2_title', '')
        replacements['[project_2_duration]'] = proj.get('project_2_duration', '')
    
    # Education section
    if 'education' in json_data:
        edu = json_data['education']
        replacements['[masters_coursework]'] = edu.get('masters_coursework', '')
    
    # Summary section
    if 'summary' in json_data:
        summary_data = json_data['summary']
        replacements['[summary]'] = summary_data.get('summary', '')
    
    # Perform all simple replacements
    for paragraph in doc.paragraphs:
        for placeholder, value in replacements.items():
            replace_text_in_paragraph(paragraph, placeholder, value)


def process_bullet_sections(doc, json_data):
    """Process sections with bullet points."""
    paragraphs_to_process = []
    
    # Collect all paragraphs with bullet placeholders
    for i, paragraph in enumerate(doc.paragraphs):
        if '[experience_1_bullets]' in paragraph.text:
            paragraphs_to_process.append({
                'index': i,
                'placeholder': '[experience_1_bullets]',
                'data': json_data.get('experience', {}).get('experience_1_bullets', [])
            })
        elif '[experience_2_bullets]' in paragraph.text:
            paragraphs_to_process.append({
                'index': i,
                'placeholder': '[experience_2_bullets]',
                'data': json_data.get('experience', {}).get('experience_2_bullets', [])
            })
        elif '[project_1_bullets]' in paragraph.text:
            paragraphs_to_process.append({
                'index': i,
                'placeholder': '[project_1_bullets]',
                'data': json_data.get('projects', {}).get('project_1_bullets', [])
            })
        elif '[project_2_bullets]' in paragraph.text:
            paragraphs_to_process.append({
                'index': i,
                'placeholder': '[project_2_bullets]',
                'data': json_data.get('projects', {}).get('project_2_bullets', [])
            })
        elif '[achievements_bullets]' in paragraph.text:
            paragraphs_to_process.append({
                'index': i,
                'placeholder': '[achievements_bullets]',
                'data': json_data.get('achievements', {}).get('achievements_bullets', [])
            })
    
    # Process in reverse order to maintain correct indices
    for item in reversed(paragraphs_to_process):
        paragraph = doc.paragraphs[item['index']]
        formatting = capture_formatting(paragraph)
        
        # Remove the placeholder paragraph
        p_element = paragraph._element
        p_element.getparent().remove(p_element)
        
        # Insert bullets
        insert_bullets(doc, item['index'] - 1, item['data'], formatting)


def process_skills(doc, skills_data):
    """Process skills section."""
    for i, paragraph in enumerate(doc.paragraphs):
        if '[skills_category_list]' not in paragraph.text:
            continue

        # Capture formatting
        ref_font_name = None
        ref_font_size = None
        ref_font_color = None
        style = paragraph.style

        if paragraph.runs:
            ref_font = paragraph.runs[0].font
            ref_font_name = ref_font.name
            ref_font_size = ref_font.size
            ref_font_color = ref_font.color.rgb if ref_font.color.rgb else None

        # Clear placeholder
        paragraph.text = ""
        p_index = i

        # Insert skills
        for group in skills_data:
            new_p = doc.paragraphs[p_index].insert_paragraph_before()
            new_p.style = style
            new_p.paragraph_format.space_after = 0

            # Bold category
            run_bold = new_p.add_run(f"{group['category']}: ")
            run_bold.bold = True
            if ref_font_name:
                run_bold.font.name = ref_font_name
            if ref_font_size:
                run_bold.font.size = ref_font_size
            if ref_font_color:
                run_bold.font.color.rgb = ref_font_color

            # Regular items
            run_items = new_p.add_run(", ".join(group["items"]))
            if ref_font_name:
                run_items.font.name = ref_font_name
            if ref_font_size:
                run_items.font.size = ref_font_size
            if ref_font_color:
                run_items.font.color.rgb = ref_font_color

            p_index += 1

        # Remove placeholder paragraph
        paragraph._element.getparent().remove(paragraph._element)
        break


def generate_resume(template_path, output_path, json_input_path):
    """Main function to generate resume from template and JSON data."""
    # Load JSON data from file
    with open(json_input_path, 'r', encoding='utf-8') as f:
        json_data = json.load(f)
    
    # Load document
    doc = Document(template_path)
    
    # Process simple text replacements first
    process_simple_replacements(doc, json_data)
    
    # Process bullet sections
    process_bullet_sections(doc, json_data)
    
    # Process skills section
    if 'skills' in json_data and 'skills_category_list' in json_data['skills']:
        process_skills(doc, json_data['skills']['skills_category_list'])
    
    # Save document
    doc.save(output_path)
    print(f"✅ Resume generated successfully: {output_path}")


# Example usage
if __name__ == "__main__":
    template_file = 'template_long.docx'
    output_file = 'resume_filled.docx'
    json_input_file = 'json_input.json'
    
    generate_resume(template_file, output_file, json_input_file)