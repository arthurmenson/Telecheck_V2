import apiClient from '@/lib/api-client';

export const RpmService = {
  enroll: (patientId: string, deviceType?: string) =>
    apiClient.post('/rpm/enroll', { patientId, deviceType }),
  consent: (patientId: string, at?: string) =>
    apiClient.post('/rpm/consent', { patientId, at }),
  setup: (patientId: string, at?: string) =>
    apiClient.post('/rpm/setup', { patientId, at }),
  addDataDay: (patientId: string, date: string) =>
    apiClient.post('/rpm/data-day', { patientId, date }),
  addTime: (patientId: string, date: string, minutes: number, role: 'staff'|'physician') =>
    apiClient.post('/rpm/time-log', { patientId, date, minutes, role }),
  validate: (patientId: string, month: string) =>
    apiClient.get(`/rpm/validate?patientId=${encodeURIComponent(patientId)}&month=${encodeURIComponent(month)}`),
  state: (patientId: string, month: string) =>
    apiClient.get(`/rpm/state?patientId=${encodeURIComponent(patientId)}&month=${encodeURIComponent(month)}`),
};

export const CcmService = {
  enroll: (patientId: string) => apiClient.post('/ccm/enroll', { patientId }),
  consent: (patientId: string, at?: string) => apiClient.post('/ccm/consent', { patientId, at }),
  addCondition: (patientId: string, condition: string) => apiClient.post('/ccm/condition', { patientId, condition }),
  addTime: (patientId: string, date: string, minutes: number, role: 'staff'|'physician') =>
    apiClient.post('/ccm/time-log', { patientId, date, minutes, role }),
  validate: (patientId: string, month: string) =>
    apiClient.get(`/ccm/validate?patientId=${encodeURIComponent(patientId)}&month=${encodeURIComponent(month)}`),
  state: (patientId: string, month: string) =>
    apiClient.get(`/ccm/state?patientId=${encodeURIComponent(patientId)}&month=${encodeURIComponent(month)}`),
};

export const BillingService = {
  generate: (patientId: string, month: string) => apiClient.post('/billing/generate', { patientId, month }),
};


