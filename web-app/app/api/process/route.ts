import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

// System Prompts (In a real app, these might be loaded from files)
const JD_RULEBOOK_PROMPT = `
You are an expert ATS (Applicant Tracking System) specialist and technical recruiter. 
Analyze the provided job description and generate a comprehensive, actionable rulebook for AI-powered new grad resume optimization.
Output the rulebook in markdown format.
`;

const RESUME_OPTIMIZER_PROMPT = `
You are an expert ATS resume optimizer. Transform the user's resume following the provided JD Analysis Rulebook.
Return ONLY valid JSON. You MUST preserve the EXACT structure and heading names from the user's input.
`;

export async function POST(req: NextRequest) {
  try {
    const { action, payload } = await req.json();
    console.log('API Request Action:', action);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    if (action === 'generate_rulebook') {
      const { jd_text } = payload;
      const prompt = `${JD_RULEBOOK_PROMPT}\n\nJOB DESCRIPTION:\n${jd_text}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return NextResponse.json({ result: response.text() });
    }

    if (action === 'optimize_resume') {
      const { rulebook_text, resume_json } = payload;
      const prompt = `${RESUME_OPTIMIZER_PROMPT}\n\nRULEBOOK:\n${rulebook_text}\n\nCURRENT RESUME JSON:\n${JSON.stringify(resume_json)}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      console.log('Gemini Raw Output (Optimize):', text);
      
      // Improved JSON extraction
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
          text = jsonMatch[0];
      } else {
          console.error('No JSON found in response');
          throw new Error('No JSON found in response');
      }

      try {
        const parsedJson = JSON.parse(text);
        return NextResponse.json({ result: parsedJson });
      } catch (e) {
        console.error('JSON Parse Error:', e);
        console.error('Failed Text:', text);
        throw e;
      }
    }

    if (action === 'chat_refine') {
      const { current_resume_json, user_instruction, rulebook_text } = payload;
      const prompt = `
      You are helping a user refine their resume.
      
      CONTEXT:
      - Rulebook: ${rulebook_text}
      - Current Resume JSON: ${JSON.stringify(current_resume_json)}
      
      USER INSTRUCTION: "${user_instruction}"
      
      TASK:
      Update the resume JSON based on the user's instruction.
      Return ONLY the updated valid JSON. Do not include any explanation.
      `;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      console.log('Gemini Raw Output (Chat):', text);

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
          text = jsonMatch[0];
      } else {
          console.error('No JSON found in Chat response');
          throw new Error('No JSON found in Chat response');
      }

      try {
        const parsedJson = JSON.parse(text);
        return NextResponse.json({ result: parsedJson });
      } catch (e) {
        console.error('Chat JSON Parse Error:', e);
        console.error('Failed Chat Text:', text);
        throw e;
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
