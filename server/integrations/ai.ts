// Placeholder wrappers for AI services (LLM, ASR)
export async function transcribeAudio(_input: Buffer) { return { text: 'transcript' }; }
export async function generateClinicalNote(_context: any) { return { note: 'AI-generated note' }; }


