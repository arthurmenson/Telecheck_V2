import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RpmService } from '../../services/rpm.service';

export default function RPMCalendarScreen() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0,7));
  const [state, setState] = useState<any>(null);
  const patientId = 'user-1';

  const days = useMemo(()=>{
    const [y,m] = month.split('-').map((v)=>parseInt(v));
    const last = new Date(y, m, 0).getDate();
    return Array.from({length:last}, (_,i)=>`${month}-${String(i+1).padStart(2,'0')}`);
  }, [month]);

  async function refresh() {
    const s = await RpmService.state(patientId, month);
    setState(s);
  }

  useEffect(()=>{ refresh(); },[month]);

  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:20, fontWeight:'600', marginBottom:8 }}>RPM Calendar</Text>
      <View style={{ flexDirection:'row', flexWrap:'wrap' }}>
        {days.map(d=>{
          const has = state?.dataDays?.includes(d);
          return (
            <TouchableOpacity key={d} onPress={async()=>{ await RpmService.addDataDay(patientId, d); await refresh(); }} style={{ width:'14.28%', padding:6 }}>
              <View style={{ borderWidth:1, borderColor: has ? '#16a34a' : '#ccc', backgroundColor: has ? '#dcfce7' : 'white', borderRadius:6, alignItems:'center', paddingVertical:10 }}>
                <Text>{d.slice(-2)}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}


