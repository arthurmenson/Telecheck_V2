export default async function aiProcessor(job: any) {
  return { ok: true, type: 'ai', jobId: job.id };
}


