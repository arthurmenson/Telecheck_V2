import nodemailer from 'nodemailer';

export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: Number(process.env.SMTP_PORT || 1025),
  secure: false,
});

export async function sendMail(to: string, subject: string, html: string) {
  const from = process.env.SMTP_FROM || 'no-reply@telecheck.local';
  return mailer.sendMail({ from, to, subject, html });
}


