import React from 'react';
import { 
  Activity, 
  Users, 
  Building2, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  Stethoscope,
  MessageSquare,
  Pill,
  History,
  CreditCard,
  AlertCircle,
  Bell,
  PhoneCall,
  CheckCheck,
  Settings,
  ShieldCheck,
  Key,
  Copy,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { StaffRole } from '../types';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

import { APP_CONFIG } from '../constants';

const data = [
  { name: '08:00', value: 400 },
  { name: '10:00', value: 300 },
  { name: '12:00', value: 600 },
  { name: '14:00', value: 800 },
  { name: '16:00', value: 500 },
  { name: '18:00', value: 900 },
  { name: '20:00', value: 700 },
];

const DashboardView: React.FC<{ onSectionChange: (section: string) => void }> = ({ onSectionChange }) => {
  const { user, isSuperAdmin, deptPasswords, departments } = useAuth();
  
  const canSeeMasterKeys = isSuperAdmin || 
    user?.role === StaffRole.ADMIN || 
    user?.role === StaffRole.HR || 
    user?.role === StaffRole.ICT;

  return (
    <div className="space-y-12">
      {/* Welcome Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
           <div className="flex items-center gap-3 mb-2 px-1">
              <div className="w-2.5 h-2.5 rounded-full bg-primary-blue animate-pulse" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Hospital Status: Fully Functional</p>
           </div>
           <h2 className="text-5xl font-black text-hospital-black tracking-tighter max-w-xl">
             Habari, <span className="text-slate-300">{user?.name}</span>
           </h2>
        </div>
        <div className="flex items-center gap-3">
           <div className="text-right flex flex-col items-end">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Local Time</p>
              <p className="text-2xl font-black text-hospital-black tracking-tight flex items-center gap-2">
                 10:30 <span className="text-primary-blue">AM</span>
              </p>
           </div>
           <div className="w-px h-10 bg-slate-100 mx-4" />
           <p className="text-xs font-bold text-slate-400 leading-tight">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
           </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {[
          { label: 'Total Inpatients', value: '1,284', icon: Users, trend: '+12%', color: 'blue' },
          { label: 'OPD Capacity', value: '480', icon: Stethoscope, trend: '84%', color: 'green' },
          { label: 'ER Response', value: '4m 12s', icon: Activity, trend: '-2.4s', color: 'rose' },
          { label: 'Daily Revenue', value: '4.2M TZS', icon: CreditCard, trend: '+5.4%', color: 'amber', action: () => onSectionChange('billing') },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={stat.action}
            className={cn(
              "bg-white p-8 rounded-[3rem] border border-slate-50 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative",
              stat.action && "cursor-pointer hover:border-primary-blue"
            )}
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
               <stat.icon className="w-20 h-20" />
            </div>
            <div className="flex items-center justify-between mb-8">
               <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-hospital-black group-hover:text-primary-blue transition-all duration-500 shadow-inner">
                  <stat.icon className="w-6 h-6" />
               </div>
               <span className={cn(
                 "text-[10px] font-black px-3 py-1 rounded-full",
                 stat.trend.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
               )}>
                 {stat.trend}
               </span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-hospital-black tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 bg-white p-10 rounded-[3.5rem] border border-slate-50 shadow-sm relative group overflow-hidden">
             <div className="flex items-center justify-between mb-12">
                <div>
                   <h3 className="text-2xl font-black tracking-tight">Patient Traffic Map</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Real-time occupancy flow</p>
                </div>
                <div className="flex gap-2">
                   {['All', 'OPD', 'ER'].map(label => (
                     <button key={label} className="px-5 py-2 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-hospital-black hover:text-white transition-all">{label}</button>
                   ))}
                </div>
             </div>
             
             <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={data}>
                      <defs>
                         <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={APP_CONFIG.brandBlue} stopOpacity={0.1}/>
                            <stop offset="95%" stopColor={APP_CONFIG.brandBlue} stopOpacity={0}/>
                         </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '24px', 
                          border: 'none', 
                          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                          padding: '16px'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={APP_CONFIG.brandBlue} 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                      />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Right Column: Interaction Hub */}
          <div className="bg-hospital-black p-10 rounded-[3.5rem] text-white flex flex-col justify-between relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-blue via-primary-blue/20 to-transparent" />
             
             <div className="relative z-10">
<div className="w-16 h-16 bg-white/10 rounded-[1.8rem] flex items-center justify-center mb-8 border border-white/10">
                   <Activity className="w-8 h-8 text-primary-blue" />
                </div>
                <h3 className="text-3xl font-black tracking-tight leading-none mb-4">Immediate Actions <br />& Protocols</h3>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest max-w-[200px] leading-relaxed">
                   Usimamizi wa dharura na mawasiliano ya haraka.
                </p>
             </div>

             <div className="relative z-10 space-y-4 pt-12">
                <button className="w-full py-6 bg-primary-blue text-hospital-black rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:translate-y-[-4px] transition-all shadow-2xl shadow-primary-blue/20">
                   <AlertCircle className="w-5 h-5" /> Code Red Alert
                </button>
                <button className="w-full py-6 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                   <PhoneCall className="w-5 h-5" /> ER On-Call Hub
                </button>
             </div>
          </div>
      </div>

      {/* Featured Service Flow */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
         <div className="flex-1 space-y-6">
            <div>
              <h3 className="text-4xl font-black text-hospital-black tracking-tighter leading-none mb-3">Live Hospital <br />Operations Matrix</h3>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Global Sync Status • 100% Operational</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
               {['OPD HUB', 'PHARMACY STACK', 'ER COILS', 'NICU UNIT', 'LAB FLOW', 'Wards'].map(tag => (
                 <span key={tag} className="px-4 py-2 bg-slate-50 rounded-xl text-[9px] font-black text-slate-400 border border-slate-100 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary-blue animate-pulse" />
                    {tag}
                 </span>
               ))}
            </div>
            <button 
              onClick={() => onSectionChange('departments')}
              className="bg-hospital-black text-white px-8 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center gap-4 hover:bg-primary-blue transition-all shadow-2xl shadow-slate-200 group"
            >
              Configure Units
              <Settings className="w-5 h-5 text-primary-blue group-hover:rotate-90 transition-transform duration-500" />
            </button>
         </div>
         <div className="relative w-full md:w-auto">
            <div 
              onClick={() => onSectionChange('departments')}
              className="w-72 h-72 bg-hospital-black rounded-[4rem] relative flex items-center justify-center shadow-2xl overflow-hidden group cursor-pointer"
            >
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-blue/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               <Building2 className="w-24 h-24 text-primary-blue relative z-10 group-hover:scale-110 transition-transform duration-500" />
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                 className="absolute inset-4 border border-white/5 rounded-[3rem]"
               />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full animate-[ping_4s_linear_infinite]" />
            </div>
            <motion.div 
               initial={{ x: 20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               className="absolute -top-6 -right-6 bg-white p-6 rounded-[2.5rem] shadow-2xl border border-slate-50 z-20 group hover:-translate-y-2 transition-transform cursor-pointer"
            >
               <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">System Health</p>
               <div className="flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-sm font-black text-hospital-black tracking-tight">ENCRYPTED</span>
                 <ShieldCheck className="w-4 h-4 text-primary-blue ml-2" />
               </div>
            </motion.div>
         </div>
      </div>

      {/* Hospital Units Directory */}
      <div className="space-y-8">
         <div className="flex items-center justify-between px-2">
            <div>
               <h3 className="text-2xl font-black text-hospital-black tracking-tighter">Health Units Directory</h3>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Quick access to all hospital departments</p>
            </div>
            <button onClick={() => onSectionChange('departments')} className="bg-hospital-black text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-primary-blue transition-all">
               All Departments <ChevronRight className="w-4 h-4" />
            </button>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 text-center">
            {[
               { id: 'reception', label: 'Reception', icon: MessageSquare, color: 'text-sky-500' },
               { id: 'doctor', label: 'Doctor Hub', icon: Stethoscope, color: 'text-indigo-500' },
               { id: 'billing', label: 'Accounts', icon: CreditCard, color: 'text-amber-500' },
               { id: 'hr', label: 'HR Office', icon: Activity, color: 'text-blue-500' },
               { id: 'emergency', label: 'Emergency', icon: AlertCircle, color: 'text-rose-500' },
               { id: 'pharmacy', label: 'Pharmacy', icon: Pill, color: 'text-emerald-500' },
            ].map((unit) => (
               <button 
                  key={unit.id}
                  onClick={() => onSectionChange(unit.id)}
                  className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm hover:shadow-xl hover:scale-105 transition-all group flex flex-col items-center gap-4"
               >
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-hospital-black transition-all">
                     <unit.icon className={cn("w-6 h-6 transition-colors", unit.color)} />
                  </div>
                  <span className="text-[11px] font-black text-hospital-black uppercase tracking-widest">{unit.label}</span>
               </button>
            ))}
         </div>
      </div>
    </div>
  );
};

export default DashboardView;
