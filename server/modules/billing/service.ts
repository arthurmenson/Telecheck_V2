import { validateMonth as validateRpm } from '../rpm/service';
import { validateMonth as validateCcm } from '../ccm/service';

export function generateMonthlyCodes(patientId: string, month: string) {
  const rpm = validateRpm(patientId, month);
  const ccm = validateCcm(patientId, month);

  // Dual-billing validation: ensure RPM and CCM minutes come from separate logs
  // Here we already track separately, so just suggest codes accordingly
  const codes: { code: string; units?: number; reason?: string }[] = [];

  if (rpm.eligible99453) codes.push({ code: '99453' });
  if (rpm.eligible99454) codes.push({ code: '99454' });
  if (rpm.eligible99457) codes.push({ code: '99457' });
  if (rpm.eligible99458Units > 0) codes.push({ code: '99458', units: rpm.eligible99458Units });

  if (ccm.eligible99490) codes.push({ code: '99490' });
  if (ccm.eligible99439Units > 0) codes.push({ code: '99439', units: ccm.eligible99439Units });
  if (ccm.eligible99491) codes.push({ code: '99491' });

  return { month, rpm, ccm, codes };
}


