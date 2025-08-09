export type MonthKey = string; // e.g., '2025-08'

export interface RpmEnrollment {
  patientId: string;
  consentAt?: string;
  setupCompletedAt?: string;
  deviceType?: string;
}

export interface RpmMonthData {
  patientId: string;
  month: MonthKey;
  dataDays: Set<string>; // YYYY-MM-DD unique days
  timeByRoleMinutes: Record<'staff' | 'physician', number>;
}

class RpmInMemoryRepo {
  private enrollments: Map<string, RpmEnrollment> = new Map();
  private months: Map<string, RpmMonthData> = new Map(); // key: patientId|month

  upsertEnrollment(enr: RpmEnrollment) {
    const existing = this.enrollments.get(enr.patientId) || { patientId: enr.patientId };
    const merged: RpmEnrollment = { ...existing, ...enr };
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
      m = { patientId, month, dataDays: new Set(), timeByRoleMinutes: { staff: 0, physician: 0 } };
      this.months.set(k, m);
    }
    return m;
  }

  addDataDay(patientId: string, date: string) {
    const month = date.slice(0, 7);
    const m = this.ensureMonth(patientId, month);
    m.dataDays.add(date);
    return m;
  }

  addTime(patientId: string, date: string, minutes: number, role: 'staff' | 'physician') {
    const month = date.slice(0, 7);
    const m = this.ensureMonth(patientId, month);
    m.timeByRoleMinutes[role] += minutes;
    return m;
  }
}

export const rpmRepo = new RpmInMemoryRepo();


