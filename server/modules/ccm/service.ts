import { ccmRepo, MonthKey } from './repo';

export function enroll(patientId: string) {
  return ccmRepo.upsertEnrollment({ patientId });
}

export function consent(patientId: string, atIso?: string) {
  return ccmRepo.upsertEnrollment({ patientId, consentAt: atIso || new Date().toISOString() });
}

export function addCondition(patientId: string, condition: string) {
  return ccmRepo.upsertEnrollment({ patientId, conditions: new Set([condition]) });
}

export function logTime(patientId: string, dateIso: string, minutes: number, role: 'staff' | 'physician') {
  return ccmRepo.addTime(patientId, dateIso.slice(0, 10), minutes, role);
}

export function validateMonth(patientId: string, month: MonthKey) {
  const enr = ccmRepo.getEnrollment(patientId);
  const m = ccmRepo.getMonth(patientId, month);
  const result = {
    eligible99490: false,
    eligible99439Units: 0,
    eligible99491: false,
    reasons: [] as string[],
  };

  const conditionsCount = enr?.conditions?.size || 0;
  if (conditionsCount < 2) result.reasons.push('Fewer than 2 chronic conditions');
  if (!enr?.consentAt) result.reasons.push('CCM consent missing');

  const totalMgmt = (m?.timeByRoleMinutes.staff || 0) + (m?.timeByRoleMinutes.physician || 0);
  if (totalMgmt >= 20) {
    result.eligible99490 = true;
    result.eligible99439Units = Math.floor((totalMgmt - 20) / 20);
  } else {
    result.reasons.push('Less than 20 minutes CCM management');
  }

  if ((m?.timeByRoleMinutes.physician || 0) >= 30) {
    result.eligible99491 = true;
  }

  return { month, totalMgmt, conditionsCount, ...result };
}

export function getState(patientId: string, month: MonthKey) {
  const m = ccmRepo.getMonth(patientId, month);
  const enr = ccmRepo.getEnrollment(patientId);
  return {
    month,
    timeByRoleMinutes: m?.timeByRoleMinutes || { staff: 0, physician: 0 },
    conditions: Array.from(enr?.conditions || []),
  };
}


