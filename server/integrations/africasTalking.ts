// Africa's Talking integration (lightweight stub; replace with official SDK if desired)
// Env:
// - AT_USERNAME
// - AT_API_KEY
// Note: For production, use africastalking SDK and handle retries and delivery reports.

export interface SendSMSResult {
  to: string;
  message: string;
  status: 'Queued' | 'Sent' | 'Failed';
  providerMessageId?: string;
}

export const africasTalking = {
  async sendSMS(to: string, message: string): Promise<SendSMSResult> {
    // Placeholder: simulate success; wire official SDK in production
    // eslint-disable-next-line no-console
    console.log(`[Africa's Talking][SMS] -> ${to}: ${message}`);
    return { to, message, status: 'Queued', providerMessageId: `msg_${Date.now()}` };
  },
};


