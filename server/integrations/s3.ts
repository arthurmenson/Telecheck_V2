import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
  region: process.env.S3_REGION || 'us-east-1',
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
  credentials: process.env.S3_ACCESS_KEY && process.env.S3_SECRET_KEY ? {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  } : undefined,
});

export async function putObject(key: string, body: Buffer | Uint8Array | Blob | string, contentType?: string) {
  const bucket = process.env.S3_BUCKET!;
  await s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType }));
  return { bucket, key };
}

export function getObject(key: string) {
  const bucket = process.env.S3_BUCKET!;
  return s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
}


