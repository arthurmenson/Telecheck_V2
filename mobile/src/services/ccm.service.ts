import { API_URL } from './api';

async function http<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json.data as T;
}

export const CcmService = {
  enroll: (patientId: string) => http('/ccm/enroll', { method: 'POST', body: JSON.stringify({ patientId }) }),
  consent: (patientId: string, at?: string) => http('/ccm/consent', { method: 'POST', body: JSON.stringify({ patientId, at }) }),
  addCondition: (patientId: string, condition: string) => http('/ccm/condition', { method: 'POST', body: JSON.stringify({ patientId, condition }) }),
  addTime: (patientId: string, date: string, minutes: number, role: 'staff'|'physician') => http('/ccm/time-log', { method: 'POST', body: JSON.stringify({ patientId, date, minutes, role }) }),
  validate: (patientId: string, month: string) => http(`/ccm/validate?patientId=${encodeURIComponent(patientId)}&month=${encodeURIComponent(month)}`),
  state: (patientId: string, month: string) => http(`/ccm/state?patientId=${encodeURIComponent(patientId)}&month=${encodeURIComponent(month)}`),
};


