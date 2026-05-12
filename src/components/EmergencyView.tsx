import React from 'react';
import { 
  AlertCircle, 
  Phone, 
  MapPin, 
  Clock, 
  Activity,
  Ambulance,
  LifeBuoy,
  ShieldAlert
} from 'lucide-react';
import { motion } from 'motion/react';

const EmergencyView: React.FC = () => {
  const activeEmergencies = [
    { id: 'EMG-001', type: 'Trauma', location: 'Section A - ER', status: 'In Progress', time: '5m ago' },
    { id: 'EMG-002', type: 'Cardiac', location: 'Main Entrance', status: 'Responding', time: '2m ago' },
  ];

  const quickAlerts = [
    { label: 'Code Blue', color: 'bg-blue-600' },
    { label: 'Code Red', color: 'bg-rose-600' },
    { label: 'Code Yellow', color: 'bg-amber-500' },
    { label: 'Ambulance Inbound', color: 'bg-emerald-600' },
  ];

  return (
    <div className="space-y-12">
      <div className="bg-rose-600 rounded-[4rem] p-12 text-white relative overflow-hidden group shadow-2xl shadow-rose-200">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div>
            <h2 className="text-4xl font-black tracking-tighter">Emergency Hub</h2>
            <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mt-2">Critical Response & Triage Center</p>
          </div>
          <div className="flex gap-4">
             <button className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-3xl backdrop-blur-md transition-all flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">Hotline</span>
             </button>
             <button className="bg-hospital-black text-white px-8 py-4 rounded-3xl transition-all flex items-center gap-3 shadow-xl">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
                <span className="text-xs font-black uppercase tracking-widest text-rose-500">Dispatch Unit</span>
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Active Incidents */}
        <div className="lg:col-span-8 space-y-8">
           <div className="hospital-card p-10">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-2xl font-black text-hospital-black tracking-tighter">Active Incidents</h3>
                 <span className="px-4 py-2 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-xl animate-pulse">2 Live Alerts</span>
              </div>
              <div className="space-y-4">
                 {activeEmergencies.map((emg) => (
                   <div key={emg.id} className="p-6 bg-slate-50 rounded-[2.5rem] flex items-center justify-between group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-100">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-rose-600 text-white rounded-3xl flex items-center justify-center shadow-lg shadow-rose-200">
                            <AlertCircle className="w-8 h-8" />
                         </div>
                         <div>
                            <h4 className="text-lg font-black text-hospital-black tracking-tight">{emg.type} Alert</h4>
                            <div className="flex items-center gap-4 mt-1">
                               <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                  <MapPin className="w-3 h-3 text-primary-blue" /> {emg.location}
                               </span>
                               <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                               <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                  <Clock className="w-3 h-3 text-primary-blue" /> {emg.time}
                               </span>
                            </div>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className="px-5 py-2 bg-hospital-black text-white text-[9px] font-black uppercase tracking-widest rounded-2xl block mb-2">
                           {emg.status}
                         </span>
                         <button className="text-[10px] font-black text-primary-blue uppercase tracking-widest hover:underline">View Protocol</button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="hospital-card p-8 bg-hospital-black text-white">
                 <Ambulance className="w-10 h-10 text-primary-blue mb-6" />
                 <h3 className="text-xl font-black tracking-tight">Ambulance Fleet</h3>
                 <div className="mt-6 flex items-center justify-between">
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Available Units</p>
                    <span className="text-3xl font-black text-primary-blue tracking-tighter">04/06</span>
                 </div>
              </div>
              <div className="hospital-card p-8">
                 <LifeBuoy className="w-10 h-10 text-emerald-500 mb-6" />
                 <h3 className="text-xl font-black text-hospital-black tracking-tight">Blood Bank Stock</h3>
                 <div className="mt-6 flex items-center justify-between">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">O negative</p>
                    <span className="text-3xl font-black text-emerald-500 tracking-tighter">Critical</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Panic Buttons */}
        <div className="lg:col-span-4 space-y-8">
           <div className="hospital-card p-10 sticky top-32">
              <h3 className="text-2xl font-black text-hospital-black tracking-tighter mb-8">Quick Protocols</h3>
              <div className="grid grid-cols-1 gap-4">
                 {quickAlerts.map(alert => (
                   <button key={alert.label} className={`w-full py-6 rounded-[2rem] ${alert.color} text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3`}>
                      <Activity className="w-5 h-5" />
                      {alert.label}
                   </button>
                 ))}
              </div>
              <div className="mt-10 p-6 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                 <p className="text-[10px] font-bold text-slate-400 leading-relaxed text-center">
                   Triggering a panic alert will notify all nearby staff members and the security dispatch center instantly.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyView;
