import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RpmService } from '@/services/rpm-ccm.service';
import { useAuth } from '@/contexts/AuthContext';

export function RPM() {
  const { user } = useAuth();
  const patientId = user?.id || 'user-1';
  const [month, setMonth] = useState(new Date().toISOString().slice(0,7));
  const [deviceType, setDeviceType] = useState('BP');
  const [state, setState] = useState<any>(null);
  const [validation, setValidation] = useState<any>(null);

  async function refresh() {
    const s = await RpmService.state(patientId, month);
    setState(s.data);
    const v = await RpmService.validate(patientId, month);
    setValidation(v.data);
  }

  useEffect(() => { refresh(); }, [patientId, month]);

  const days = useMemo(() => {
    const [y,m] = month.split('-').map((v)=>parseInt(v));
    const last = new Date(y, m, 0).getDate();
    return Array.from({length:last}, (_,i)=>`${month}-${String(i+1).padStart(2,'0')}`);
  }, [month]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Remote Patient Monitoring</h1>
      <Card>
        <CardHeader>
          <CardTitle>Onboarding & Consent</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3 items-end">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Month (YYYY-MM)</div>
              <Input className="w-40" value={month} onChange={(e)=>setMonth(e.target.value)} />
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Device</div>
              <Input className="w-40" value={deviceType} onChange={(e)=>setDeviceType(e.target.value)} />
            </div>
            <Button onClick={async()=>{ await RpmService.enroll(patientId, deviceType); await RpmService.consent(patientId); await RpmService.setup(patientId); await refresh(); }}>Enroll + Consent + Setup</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Device Days</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {days.map(d => {
              const has = state?.dataDays?.includes(d);
              return (
                <button key={d} onClick={async()=>{ await RpmService.addDataDay(patientId, d); await refresh(); }} className={`text-xs px-2 py-2 rounded border ${has ? 'bg-green-100 border-green-200' : 'bg-background'}`}>{d.slice(-2)}</button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Time Tracking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm">Staff Minutes: {state?.timeByRoleMinutes?.staff || 0} • Physician Minutes: {state?.timeByRoleMinutes?.physician || 0}</div>
          <div className="flex gap-2">
            <Button onClick={async()=>{ await RpmService.addTime(patientId, `${month}-05`, 10, 'staff'); await refresh(); }}>+10 Staff</Button>
            <Button onClick={async()=>{ await RpmService.addTime(patientId, `${month}-06`, 10, 'physician'); await refresh(); }}>+10 Physician</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Validation</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs whitespace-pre-wrap">{validation ? JSON.stringify(validation, null, 2) : 'No data'}</pre>
        </CardContent>
      </Card>
    </div>
  );
}


