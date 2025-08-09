export default async function analyticsProcessor(job: any) {
  return { ok: true, type: 'analytics', jobId: job.id };
}


