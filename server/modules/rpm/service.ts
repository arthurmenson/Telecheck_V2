import { rpmRepo, MonthKey } from './repo';

export function enroll(patientId: string, deviceType?: string) {
  return rpmRepo.upsertEnrollment({ patientId, deviceType });
}

export function consent(patientId: string, atIso?: string) {
  return rpmRepo.upsertEnrollment({ patientId, consentAt: atIso || new Date().toISOString() });
}

export function completeSetup(patientId: string, atIso?: string) {
  return rpmRepo.upsertEnrollment({ patientId, setupCompletedAt: atIso || new Date().toISOString() });
}

export function logDataDay(patientId: string, dateIso: string) {
  return rpmRepo.addDataDay(patientId, dateIso.slice(0, 10));
}

export function logTime(patientId: string, dateIso: string, minutes: number, role: 'staff' | 'physician') {
  return rpmRepo.addTime(patientId, dateIso.slice(0, 10), minutes, role);
}

export function validateMonth(patientId: string, month: MonthKey) {
  const enr = rpmRepo.getEnrollment(patientId);
  const m = rpmRepo.getMonth(patientId, month);
  const result = {
    eligible99453: false,
    eligible99454: false,
    eligible99457: false,
    eligible99458Units: 0,
    reasons: [] as string[],
  };

  if (!enr?.consentAt) result.reasons.push('RPM consent missing');
  if (!enr?.setupCompletedAt) result.reasons.push('RPM setup not completed');
  else result.eligible99453 = true; // assume one-time when setup completed

  const dataDays = m?.dataDays.size || 0;
  if (dataDays >= 16) result.eligible99454 = true; else result.reasons.push('Less than 16 data days');

  const totalMgmt = (m?.timeByRoleMinutes.staff || 0) + (m?.timeByRoleMinutes.physician || 0);
  if (totalMgmt >= 20) {
    result.eligible99457 = true;
    result.eligible99458Units = Math.floor((totalMgmt - 20) / 20);
  } else {
    result.reasons.push('Less than 20 minutes RPM management');
  }

  return { month, dataDays, totalMgmt, ...result };
}

export function getState(patientId: string, month: MonthKey) {
  const m = rpmRepo.getMonth(patientId, month);
  return {
    month,
    dataDays: Array.from(m?.dataDays || []),
    timeByRoleMinutes: m?.timeByRoleMinutes || { staff: 0, physician: 0 },
  };
}


