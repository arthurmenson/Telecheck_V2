export type MonthKey = string; // YYYY-MM

export interface CcmEnrollment {
  patientId: string;
  consentAt?: string;
  conditions: Set<string>;
}

export interface CcmMonthData {
  patientId: string;
  month: MonthKey;
  timeByRoleMinutes: Record<'staff' | 'physician', number>;
}

class CcmInMemoryRepo {
  private enrollments: Map<string, CcmEnrollment> = new Map();
  private months: Map<string, CcmMonthData> = new Map();

  upsertEnrollment(enr: Partial<CcmEnrollment> & { patientId: string }) {
    const existing = this.enrollments.get(enr.patientId) || { patientId: enr.patientId, conditions: new Set<string>() };
    const merged: CcmEnrollment = {
      patientId: enr.patientId,
      consentAt: enr.consentAt ?? existing.consentAt,
      conditions: enr.conditions ? new Set([...existing.conditions, ...enr.conditions]) : existing.conditions,
    };
    this.enrollments.set(enr.patientId, merged);
    return merged;
  }

  getEnrollment(patientId: string) {
    return this.enrollments.get(patientId);
  }

  private key(patientId: string, month: MonthKey) {
    return `${patientId}|${month}`;
  }

  getMonth(patientId: string, month: MonthKey) {
    return this.months.get(this.key(patientId, month));
  }

  ensureMonth(patientId: string, month: MonthKey) {
    const k = this.key(patientId, month);
    let m = this.months.get(k);
    if (!m) {
      m = { patientId, month, timeByRoleMinutes: { staff: 0, physician: 0 } };
      this.months.set(k, m);
    }
    return m;
  }

  addTime(patientId: string, date: string, minutes: number, role: 'staff' | 'physician') {
    const month = date.slice(0, 7);
    const m = this.ensureMonth(patientId, month);
    m.timeByRoleMinutes[role] += minutes;
    return m;
  }
}

export const ccmRepo = new CcmInMemoryRepo();


