export default async function notificationsProcessor(job: any) {
  return { ok: true, type: 'notifications', jobId: job.id };
}


