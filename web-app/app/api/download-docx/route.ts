import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';

const execPromise = util.promisify(exec);
const writeFilePromise = util.promisify(fs.writeFile);
const readFilePromise = util.promisify(fs.readFile);
const unlinkPromise = util.promisify(fs.unlink);

export async function POST(req: NextRequest) {
  try {
    const { resumeJson } = await req.json();

    if (!resumeJson) {
      return NextResponse.json({ error: 'Missing resume JSON' }, { status: 400 });
    }

    // Define paths
    // Assuming code.py and Resume_template.docx are in the project root (parent of web-app)
    // We need to resolve paths relative to the project root
    const projectRoot = path.resolve(process.cwd(), '..'); 
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const tempInputPath = path.join(projectRoot, `temp_input_${timestamp}.json`);
    const outputFilename = `Bhanu_${timestamp}.docx`;
    const outputPath = path.join(projectRoot, outputFilename);
    const templatePath = path.join(projectRoot, 'Resume_template.docx');
    const scriptPath = path.join(projectRoot, 'code.py');

    // 1. Write JSON to temp file
    await writeFilePromise(tempInputPath, JSON.stringify(resumeJson, null, 2));

    // 2. Run python script
    // Command: python code.py <template> <output> <input>
    const command = `python3 "${scriptPath}" "${templatePath}" "${outputPath}" "${tempInputPath}"`;
    console.log('Executing command:', command);

    try {
        const { stdout, stderr } = await execPromise(command);
        console.log('Python stdout:', stdout);
        if (stderr) console.error('Python stderr:', stderr);
    } catch (error: any) {
        console.error('Execution error:', error);
        // Clean up temp input even if it fails
        try { await unlinkPromise(tempInputPath); } catch {}
        return NextResponse.json({ error: 'Failed to generate DOCX', details: error.message }, { status: 500 });
    }

    // 3. Read the generated file
    if (!fs.existsSync(outputPath)) {
         try { await unlinkPromise(tempInputPath); } catch {}
         return NextResponse.json({ error: 'Output file was not created' }, { status: 500 });
    }

    const fileBuffer = await readFilePromise(outputPath);

    // 4. Clean up temp files
    try {
        await unlinkPromise(tempInputPath);
        await unlinkPromise(outputPath); // We delete the file after reading it into memory
    } catch (e) {
        console.error('Error cleaning up files:', e);
    }

    // 5. Return file response
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${outputFilename}"`,
      },
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
