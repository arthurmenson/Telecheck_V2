export default async function filesProcessor(job: any) {
  return { ok: true, type: 'files', jobId: job.id };
}


