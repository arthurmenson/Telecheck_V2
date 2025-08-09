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

export const RpmService = {
  enroll: (patientId: string, deviceType?: string) =>
    http('/rpm/enroll', { method: 'POST', body: JSON.stringify({ patientId, deviceType }) }),
  consent: (patientId: string, at?: string) =>
    http('/rpm/consent', { method: 'POST', body: JSON.stringify({ patientId, at }) }),
  setup: (patientId: string, at?: string) =>
    http('/rpm/setup', { method: 'POST', body: JSON.stringify({ patientId, at }) }),
  addDataDay: (patientId: string, date: string) =>
    http('/rpm/data-day', { method: 'POST', body: JSON.stringify({ patientId, date }) }),
  addTime: (patientId: string, date: string, minutes: number, role: 'staff'|'physician') =>
    http('/rpm/time-log', { method: 'POST', body: JSON.stringify({ patientId, date, minutes, role }) }),
  validate: (patientId: string, month: string) =>
    http(`/rpm/validate?patientId=${encodeURIComponent(patientId)}&month=${encodeURIComponent(month)}`),
  state: (patientId: string, month: string) =>
    http(`/rpm/state?patientId=${encodeURIComponent(patientId)}&month=${encodeURIComponent(month)}`),
};


