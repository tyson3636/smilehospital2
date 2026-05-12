import React from 'react';
import { 
  Building2, 
  Search, 
  Users, 
  ShieldCheck, 
  FlaskConical, 
  Receipt, 
  Network, 
  Truck, 
  Pill, 
  HardDrive, 
  ArrowRight, 
  CheckCircle2, 
  PlusCircle, 
  Lock,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { StaffRole } from '../types';
import { motion, AnimatePresence } from 'motion/react';

import { APP_CONFIG } from '../constants';

const getDeptIcon = (id: string) => {
  const iconMap: Record<string, any> = {
    REC: Network,
    PHA: Pill,
    LAB: FlaskConical,
    RAD: HardDrive,
    BIL: Receipt,
    HR: Users,
    ADM: Building2,
    IT: Network,
    SEC: ShieldCheck,
    AMB: Truck,
    OPD: Stethoscope,
    IPD: Building2
  };
  return iconMap[id.toUpperCase()] || Building2;
};

const DepartmentsView = ({ onSectionChange }: { onSectionChange: (section: string) => void }) => {
  const [search, setSearch] = React.useState('');
  const { user, isSuperAdmin, deptPasswords, departments } = useAuth();
  const isAdmin = isSuperAdmin || user?.role === StaffRole.ADMIN || user?.role === StaffRole.HR;
  
  const [enteringDept, setEnteringDept] = React.useState<any>(null);
  const [passInput, setPassInput] = React.useState('');
  const [error, setError] = React.useState('');

  const filtered = (departments || []).filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleEnter = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = deptPasswords[enteringDept.id.toUpperCase()];
    if (passInput === correct) {
      onSectionChange(enteringDept.id.toLowerCase());
      setEnteringDept(null);
      setPassInput('');
      setError('');
    } else {
      setError('Password siyo sahihi. Wasiliana na HR.');
    }
  };

  return (
    <div className="space-y-10 pb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-hospital-black rounded-2xl flex items-center justify-center shadow-2xl">
              <Building2 className="text-primary-blue w-6 h-6" />
            </div>
            <h2 className="text-3xl font-black text-hospital-black tracking-tighter">Hospital Divisions</h2>
          </div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest leading-none">Usimamizi wa Idara zote za {APP_CONFIG.name}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-blue transition-colors" />
            <input 
              type="text" 
              placeholder="Tafuta idara..."
              className="pl-12 pr-6 py-3.5 bg-white border border-slate-100 rounded-2xl text-sm font-medium w-full md:w-80 shadow-sm focus:ring-4 focus:ring-primary-blue/10 transition-all outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {isAdmin && (
            <button 
              onClick={() => onSectionChange('hr')}
              className="bg-hospital-black text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-primary-blue transition-all shadow-xl shadow-slate-200"
            >
              <PlusCircle className="w-5 h-5" />
              Sajili Idara (via HR)
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filtered.map((dept, i) => {
          const Icon = getDeptIcon(dept.id);

          return (
            <motion.div 
              key={dept.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => {
                setEnteringDept(dept);
              }}
              className="hospital-card p-8 group relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-6 right-6">
                <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full ring-1 ring-emerald-500/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{dept.status}</span>
                </div>
              </div>

              <div className="flex items-start gap-5 mb-8">
                <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-hospital-black group-hover:text-primary-blue transition-all duration-500 shadow-inner group-hover:shadow-2xl">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-black text-hospital-black tracking-tight mb-1 group-hover:text-primary-blue transition-colors">{dept.name}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{dept.id} Unit</p>
                </div>
              </div>

              <p className="text-xs font-medium text-slate-500 leading-relaxed mb-8 h-8 line-clamp-2">
                {dept.description}
              </p>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map(j => (
                        <div key={j} className="w-8 h-8 rounded-xl border-2 border-white bg-slate-100 overflow-hidden shadow-sm group-hover:translate-x-1 transition-transform">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${dept.id + j}`} alt="avatar" />
                        </div>
                      ))}
                    </div>
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Team Unit</span>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] text-slate-300 uppercase tracking-widest font-black mb-1">Chief Officer</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary-blue" />
                      <p className="text-sm font-black text-hospital-black">{dept.head}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 group-hover:bg-primary-blue group-hover:text-white flex items-center justify-center transition-all shadow-sm group-hover:shadow-xl group-hover:shadow-primary-blue/20 text-slate-400">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {enteringDept && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-hospital-black/95 backdrop-blur-2xl" onClick={() => setEnteringDept(null)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-sm rounded-[3.5rem] p-12 shadow-2xl border border-slate-100">
               <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-inner ring-1 ring-slate-100">
                    <Lock className="w-10 h-10 text-primary-blue" />
                  </div>
                  <h3 className="text-3xl font-black text-hospital-black tracking-tighter">Domain Access</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Entering {enteringDept.name}</p>
               </div>
               
               <form onSubmit={handleEnter} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center block">Idara Privacy Key</label>
                    <input 
                      type="password" 
                      required 
                      autoFocus
                      className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-black text-center tracking-[0.5em] outline-none focus:ring-4 focus:ring-primary-blue/10 transition-all font-mono" 
                      placeholder="••••••••" 
                      value={passInput}
                      onChange={e => setPassInput(e.target.value)}
                    />
                  </div>
                  
                  {error && <p className="text-[10px] font-bold text-rose-500 text-center uppercase tracking-widest animate-bounce">{error}</p>}
                  
                  <div className="flex flex-col gap-4">
                    <button type="submit" className="primary-button w-full h-16 rounded-[2rem]">
                      <ShieldCheck className="w-5 h-5" /> Authorize Entry
                    </button>
                    <button type="button" onClick={() => setEnteringDept(null)} className="w-full py-4 text-slate-400 font-bold uppercase tracking-widest text-[9px] hover:text-rose-500 transition-colors">Cancel</button>
                  </div>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DepartmentsView;
