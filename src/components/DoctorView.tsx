import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Stethoscope, 
  User, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Clipboard,
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

const DoctorView = () => {
  const { user, patients, notifications, clearNotification } = useAuth();
  const [activeTab, setActiveTab] = useState<'queue' | 'consultations'>('queue');

  // Filter patients assigned to THIS doctor
  const myPatients = patients.filter(p => p.doctorId === user?.id);
  const myNotifications = notifications.filter(n => n.recipientId === user?.id);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="bg-hospital-black rounded-[4rem] p-12 text-white relative overflow-hidden group shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Stethoscope className="text-white w-7 h-7" />
              </div>
              <h2 className="text-4xl font-black tracking-tighter uppercase italic">Doctor Terminal</h2>
            </div>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Kituo cha Madaktari • {user?.name}</p>
          </div>

          <div className="flex gap-4">
             <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-[2rem] backdrop-blur-sm">
                <p className="text-[10px] text-white/40 font-black uppercase mb-1">Total Consultations Today</p>
                <div className="flex items-center gap-2">
                   <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                   <p className="text-xl font-black tracking-tighter">0 Wagonjwa Leo</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-10">
           {/* Draggable/Animated Notifications for Doctor */}
           <div className="space-y-6">
              <div className="flex items-center justify-between px-6">
                 <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] flex items-center gap-3">
                    <Bell className="w-4 h-4 text-rose-500 animate-swing" /> Direct Notifications
                 </h3>
                 {myNotifications.length > 0 && (
                    <span className="bg-rose-500 text-white text-[9px] font-black px-3 py-1 rounded-full animate-pulse">
                       {myNotifications.length} New
                    </span>
                 )}
              </div>
              
              <AnimatePresence>
                 {myNotifications.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-50 rounded-[3rem] p-12 text-center border border-dashed border-slate-200">
                       <ShieldCheck className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                       <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest">No active alerts. Dr. Hub is silent.</p>
                    </motion.div>
                 ) : (
                    <div className="space-y-4">
                       {myNotifications.map((notif) => (
                          <motion.div 
                             key={notif.id}
                             initial={{ x: -20, opacity: 0 }}
                             animate={{ x: 0, opacity: 1 }}
                             exit={{ x: 20, opacity: 0 }}
                             className="bg-white border-l-8 border-rose-500 rounded-[2.5rem] p-8 shadow-xl flex items-center justify-between group"
                          >
                             <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center shrink-0">
                                   <AlertCircle className="w-7 h-7 text-rose-500" />
                                </div>
                                <div>
                                   <p className="text-sm font-black text-hospital-black tracking-tight leading-tight">{notif.message}</p>
                                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-2">
                                      <Clock className="w-3 h-3" /> {new Date(notif.timestamp).toLocaleTimeString()} • Reception Portal Alert
                                   </p>
                                </div>
                             </div>
                             <button 
                                onClick={() => clearNotification(notif.id)}
                                className="w-12 h-12 bg-slate-50 hover:bg-rose-50 rounded-2xl flex items-center justify-center text-slate-300 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"
                             >
                                <X className="w-5 h-5" />
                             </button>
                          </motion.div>
                       ))}
                    </div>
                 )}
              </AnimatePresence>
           </div>

           {/* Patients assigned to me */}
           <div className="bg-white rounded-[4rem] p-12 shadow-2xl border border-slate-50 overflow-hidden relative">
              <div className="flex items-center justify-between mb-12">
                 <div>
                    <h3 className="text-2xl font-black text-hospital-black tracking-tight">Assigned Patients Queue</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Direct Feed from Reception & Triages</p>
                 </div>
                 <div className="bg-indigo-50 border border-indigo-100 px-6 py-3 rounded-2xl flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">Live Sync Ready</span>
                 </div>
              </div>

              <div className="space-y-6">
                 {myPatients.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-100">
                       <User className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                       <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest">Hujakabidhiwa Mgonjwa kwa sasa.</p>
                    </div>
                 ) : (
                    myPatients.map((p, i) => (
                       <motion.div 
                          key={p.id}
                          layoutId={p.id}
                          className="flex items-center justify-between p-8 bg-slate-50 rounded-[3rem] hover:bg-white hover:shadow-2xl transition-all cursor-pointer group"
                       >
                          <div className="flex items-center gap-8">
                             <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-2xl font-black text-slate-200 shadow-sm">
                                {i + 1}
                             </div>
                             <div>
                                <h4 className="text-xl font-black text-hospital-black tracking-tight italic">{p.fullName}</h4>
                                <div className="flex items-center gap-4 mt-2">
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                      <Clipboard className="w-3.5 h-3.5 text-indigo-500" /> File: {p.fileNumber}
                                   </p>
                                   <div className={cn(
                                      "px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                      p.paymentType === 'Cash' 
                                       ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                                       : "bg-primary-blue/5 text-primary-blue border-primary-blue/10"
                                   )}>
                                      {p.paymentType}
                                   </div>
                                </div>
                             </div>
                          </div>

                          <div className="flex items-center gap-10">
                             <div className="hidden md:flex flex-col items-end">
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Waiting for</p>
                                <p className="text-lg font-black text-hospital-black tabular-nums">04m 22s</p>
                             </div>
                             <button className="bg-hospital-black text-white px-10 h-16 rounded-[2rem] font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
                                Call Patient <ArrowRight className="w-4 h-4" />
                             </button>
                          </div>
                       </motion.div>
                    ))
                 )}
              </div>
           </div>
        </div>

        {/* Doctor Summary Sidebar */}
        <div className="lg:col-span-4 space-y-10">
           <div className="bg-hospital-black rounded-[4rem] p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10">
                 <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-10 backdrop-blur-xl border border-white/10 shadow-2xl">
                    <User className="w-10 h-10 text-indigo-400" />
                 </div>
                 <h4 className="text-2xl font-black tracking-tighter leading-snug">{user?.name}</h4>
                 <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mt-2">{user?.role} • Medical Practitioner</p>
                 
                 <div className="mt-12 space-y-6">
                    <div className="flex items-center justify-between p-6 bg-white/5 rounded-[2rem] border border-white/5">
                       <div className="flex items-center gap-4">
                          <Calendar className="w-5 h-5 text-indigo-400" />
                          <span className="text-[10px] font-black uppercase text-white/60">Schedule</span>
                       </div>
                       <span className="text-[10px] font-black uppercase text-white tracking-widest">Morning Shift</span>
                    </div>
                 </div>

                 <button className="w-full mt-10 py-5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-500/20">
                    Update My Status
                 </button>
              </div>
           </div>

           <div className="hospital-card p-10 border border-rose-100 bg-rose-50 shadow-rose-50">
              <h4 className="text-xl font-black text-hospital-black tracking-tight mb-8 flex items-center gap-3">
                 <AlertCircle className="text-rose-500 w-6 h-6" /> System Alerts
              </h4>
              <div className="space-y-6">
                 <div className="p-6 bg-white rounded-3xl border border-rose-200">
                    <p className="text-xs font-bold text-slate-600 italic">"Ensure all consultation notes are synched by EO Shift."</p>
                    <p className="text-[9px] font-black text-rose-400 uppercase mt-2 tracking-widest">— ADMINISTRATION</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorView;
