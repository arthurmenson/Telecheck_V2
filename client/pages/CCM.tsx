import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CcmService } from '@/services/rpm-ccm.service';
import { useAuth } from '@/contexts/AuthContext';

export function CCM() {
  const { user } = useAuth();
  const patientId = user?.id || 'user-1';
  const [month, setMonth] = useState(new Date().toISOString().slice(0,7));
  const [condition, setCondition] = useState('hypertension');
  const [state, setState] = useState<any>(null);
  const [validation, setValidation] = useState<any>(null);

  async function refresh() {
    const s = await CcmService.state(patientId, month);
    setState(s.data);
    const v = await CcmService.validate(patientId, month);
    setValidation(v.data);
  }

  useEffect(() => { refresh(); }, [patientId, month]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Chronic Care Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Enrollment & Consent</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3 items-end">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Month (YYYY-MM)</div>
              <Input className="w-40" value={month} onChange={(e)=>setMonth(e.target.value)} />
            </div>
            <Button onClick={async()=>{ await CcmService.enroll(patientId); await CcmService.consent(patientId); await refresh(); }}>Enroll + Consent</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex gap-2 items-end">
            <Input className="w-60" value={condition} onChange={(e)=>setCondition(e.target.value)} />
            <Button onClick={async()=>{ await CcmService.addCondition(patientId, condition); await refresh(); }}>Add Condition</Button>
          </div>
          <div className="text-sm">Current: {state?.conditions?.join(', ') || 'None'}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Time Tracking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm">Staff Minutes: {state?.timeByRoleMinutes?.staff || 0} • Physician Minutes: {state?.timeByRoleMinutes?.physician || 0}</div>
          <div className="flex gap-2">
            <Button onClick={async()=>{ await CcmService.addTime(patientId, `${month}-09`, 10, 'staff'); await refresh(); }}>+10 Staff</Button>
            <Button onClick={async()=>{ await CcmService.addTime(patientId, `${month}-10`, 10, 'physician'); await refresh(); }}>+10 Physician</Button>
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


