import React, { useState, useRef } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Activity, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  Contact,
  Trash2,
  CheckCircle2,
  X,
  FileText,
  Printer,
  ChevronRight,
  Loader2,
  Lock,
  PlusCircle,
  CreditCard,
  AlertCircle,
  Building2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { StaffRole, ShiftType } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

import { APP_CONFIG } from '../constants';

const TAN_BANKS = [
  'CRDB Bank PLC',
  'NMB Bank PLC',
  'NBC Bank',
  'Standard Chartered',
  'Absa Bank Tanzania',
  'Equity Bank',
  'Diamond Trust Bank (DTB)',
  'Exim Bank',
  'KCB Bank',
  'Azania Bank',
  'Tanzania Commercial Bank (TCB)'
];

const HRView = () => {
  const { staffList, addStaff, removeStaff, activityLogs, deptPasswords, updateDeptPassword, addDepartment, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'employees' | 'reports' | 'security'>('employees');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All Roles');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Department registration state
  const [deptData, setDeptData] = useState({ name: '', id: '', password: '', description: '' });

  // Form State
  const [formData, setFormData] = useState<any>({
    name: '',
    role: StaffRole.NURSE,
    dept: 'General Ward',
    shift: ShiftType.MORNING,
    contact: '',
    email: '',
    username: '',
    password: '123456789',
    nidaNumber: '',
    residence: '',
    origin: '',
    familyStatus: 'Single',
    childrenCount: '0',
    educationLevel: 'Degree',
    birthRegion: '',
    bankName: '',
    accountNumber: '',
    photoPreview: null as string | null
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photoPreview: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newStaff = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        avatar: formData.photoPreview || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`
      };
      addStaff(newStaff);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        setShowAddModal(false);
        setFormData({ 
          name: '', role: StaffRole.NURSE, dept: 'General Ward', shift: ShiftType.MORNING, contact: '',
          email: '', username: '', password: '123456789', 
          nidaNumber: '', residence: '', origin: '', familyStatus: 'Single', childrenCount: '0',
          educationLevel: 'Degree', birthRegion: '', bankName: '', accountNumber: '', photoPreview: null
        });
      }, 2000);
    }, 1500);
  };

  const handleAddDept = (e: React.FormEvent) => {
    e.preventDefault();
    addDepartment(deptData);
    setShowAddDeptModal(false);
    setDeptData({ name: '', id: '', password: '', description: '' });
    alert(`Idara ya ${deptData.name} imesajiliwa kikamilifu kwasasa.`);
  };

  const handleInitiatePassChange = (deptId: string) => {
    const newPass = prompt(`Ingiza password mpya kwa idara ya ${deptId}:`);
    if (newPass) {
      updateDeptPassword(deptId, newPass);
      alert(`Password ya ${deptId} imebadilishwa kikamilifu.`);
    }
  };

  const filteredStaff = staffList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          (s.dept && s.dept.toLowerCase().includes(search.toLowerCase())) ||
                          s.role.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All Roles' || s.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
           <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-hospital-black rounded-2xl flex items-center justify-center shadow-2xl">
                 <Users className="text-primary-blue w-6 h-6" />
              </div>
              <h2 className="text-4xl font-black text-hospital-black tracking-tighter">Human Resources</h2>
           </div>
           <nav className="flex gap-10 mt-6 border-b border-slate-100">
             {[
               { id: 'employees', label: 'Wafanyakazi', icon: Users },
               { id: 'reports', label: 'Ripoti za Utendaji', icon: FileText },
               { id: 'security', label: 'System Security', icon: ShieldCheck },
             ].map(tab => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={cn(
                   "pb-4 text-[10px] font-black uppercase tracking-widest transition-all relative",
                   activeTab === tab.id ? "text-primary-blue" : "text-slate-300 hover:text-slate-400"
                 )}
               >
                 {tab.label}
                 {activeTab === tab.id && (
                   <motion.div layoutId="hr-active-tab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary-blue rounded-full shadow-[0_0_10px_rgba(0,96,169,0.5)]" />
                 )}
               </button>
             ))}
           </nav>
        </div>

        <div className="flex items-center gap-4">
           {activeTab === 'employees' && (
             <button 
               onClick={() => setShowAddModal(true)}
               className="bg-hospital-black text-white px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-primary-blue transition-all shadow-xl shadow-slate-200"
             >
               <UserPlus className="w-5 h-5" /> Sajili Mtumishi
             </button>
           )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'employees' ? (
          <motion.div 
            key="employees"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
             {/* Controls */}
             <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                   <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary-blue transition-colors" />
                   <input 
                    type="text" 
                    placeholder="Search by name, role or unit..."
                    className="w-full pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[2rem] text-sm font-medium shadow-sm transition-all focus:ring-4 focus:ring-primary-blue/10 outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                   />
                </div>
                <div className="flex items-center gap-2 bg-white px-6 py-2 border border-slate-100 rounded-[2rem] shadow-sm">
                   <Filter className="w-4 h-4 text-slate-300" />
                   <select 
                    className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                   >
                     <option>All Roles</option>
                     {Object.values(StaffRole).map(role => <option key={role}>{role}</option>)}
                   </select>
                </div>
             </div>

             {/* Staff Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredStaff.map((staff, i) => (
                  <motion.div 
                    key={staff.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-[3rem] p-8 border border-slate-50 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8">
                       <button className="text-slate-200 hover:text-rose-500 transition-colors" onClick={() => removeStaff(staff.id)}>
                          <Trash2 className="w-5 h-5" />
                       </button>
                    </div>

                    <div className="flex items-start gap-6 mb-8 pt-4">
                       <div className="w-24 h-24 rounded-[2rem] bg-slate-50 p-1 relative ring-2 ring-slate-50 group-hover:ring-primary-blue transition-all shadow-xl">
                          <img src={staff.avatar} alt={staff.name} className="w-full h-full rounded-[1.8rem] object-cover" />
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-100 text-hospital-black shadow-lg">
                             <Contact className="w-4 h-4" />
                          </div>
                       </div>
                       <div className="pt-2">
                          <h3 className="text-xl font-black text-hospital-black tracking-tight">{staff.name}</h3>
                          <span className="inline-block px-3 py-1 bg-primary-blue/10 text-primary-blue text-[9px] font-black rounded-full uppercase tracking-widest mt-2">{staff.role}</span>
                       </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-slate-50">
                       <div className="flex items-center gap-3 text-slate-400">
                          <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center group-hover:text-hospital-black transition-colors">
                             <Building2 className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{staff.dept} Division</span>
                       </div>
                       <div className="flex items-center gap-3 text-slate-400">
                          <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center group-hover:text-hospital-black transition-colors">
                             <Mail className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-500">{staff.email}</span>
                       </div>
                    </div>

                    <div className="flex gap-4 pt-10">
                       <button 
                         onClick={() => {
                           const newPass = prompt(`Ingiza password mpya kwa ${staff.name}:`, staff.password || '123456789');
                           if (newPass) {
                             // In a real app we'd update state/DB
                             alert(`Password ya ${staff.name} imesasishwa.`);
                           }
                         }}
                         className="flex-1 py-4 bg-hospital-black text-white rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary-blue transition-all"
                       >
                          Manage Protocol
                       </button>
                       <button className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-hospital-black hover:text-white transition-all">
                          <Printer className="w-5 h-5" />
                       </button>
                    </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        ) : activeTab === 'reports' ? (
          <motion.div key="reports" className="space-y-10">
            <div className="bg-hospital-black rounded-[4rem] p-12 text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-blue via-transparent to-transparent" />
                <div className="flex-1 z-10">
                   <h3 className="text-3xl font-black tracking-tight mb-4">Mtumishi Reports Control</h3>
                   <p className="text-white/40 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-xl">
                      Usimamizi wa ripoti za mahudhurio, utendaji na mishahara ya watumishi wote. Data za {APP_CONFIG.name} zinalindwa kwa encryption kabla ya kutoa ripoti hizi.
                   </p>
                </div>
                <div className="z-10 bg-white/5 p-8 rounded-[3rem] border border-white/5 backdrop-blur-xl">
                   <div className="flex items-center gap-6">
                      <div className="text-center">
                         <div className="text-3xl font-black text-primary-blue">98.4%</div>
                         <div className="text-[9px] font-black uppercase tracking-widest opacity-40">System Efficiency</div>
                      </div>
                      <div className="w-px h-12 bg-white/10" />
                      <div className="text-center">
                         <div className="text-3xl font-black text-white">412</div>
                         <div className="text-[9px] font-black uppercase tracking-widest opacity-40">Active Records</div>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="bg-white rounded-[3.5rem] p-10 shadow-sm border border-slate-50">
                <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-4 mb-4">Employee Activity Log</h4>
                <div className="space-y-4">
                   {activityLogs.map((log, i) => (
                     <div key={log.id} className="flex items-center gap-6 p-6 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-hospital-black group-hover:text-primary-blue transition-all shadow-inner">
                           <Activity className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                           <h5 className="text-sm font-black text-hospital-black tracking-tight">{log.details}</h5>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Initiated by {log.user} • {new Date(log.timestamp).toLocaleString()}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 hover:text-hospital-black transition-colors cursor-pointer">
                           <ChevronRight className="w-5 h-5" />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </motion.div>
        ) : (
          <motion.div key="security" className="space-y-10">
            <div className="bg-hospital-black rounded-[4rem] p-12 text-white relative overflow-hidden">
               <div className="relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-3xl font-black tracking-tight flex items-center gap-4 mb-4">
                        <ShieldCheck className="w-10 h-10 text-primary-blue" />
                        Domain Governance
                      </h3>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest max-w-xl">
                        Idara ya HR ndiyo inayosimamia vigezo vya usalama na password za kuingilia mifumo ya idara nyingine.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => {
                          const confirmReset = window.confirm("Je, una uhakika unataka ku-reset password zote kuwa 123456789?");
                          if (confirmReset) {
                            Object.keys(deptPasswords).forEach(id => updateDeptPassword(id, '123456789'));
                            alert("Idara zote zimewekwa password ya 123456789.");
                          }
                        }}
                        className="bg-white/10 text-white px-6 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-primary-blue transition-all"
                      >
                        <ShieldCheck className="w-4 h-4" /> Reset All Keys
                      </button>
                      <button 
                        onClick={() => setShowAddDeptModal(true)}
                        className="bg-primary-blue text-white px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:text-hospital-black transition-all shadow-2xl shadow-primary-blue/20"
                      >
                        <PlusCircle className="w-4 h-4" /> Sajili Idara Mpya
                      </button>
                    </div>
                  </div>
               </div>
               <div className="absolute top-0 right-0 p-12 opacity-10">
                  <Lock className="w-40 h-40" />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.keys(deptPasswords).map((deptId) => (
                <div key={deptId} className="bg-white rounded-[3rem] p-8 border border-slate-50 shadow-sm hover:shadow-xl transition-all group">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-hospital-black group-hover:text-primary-blue transition-all text-slate-300 shadow-inner">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-hospital-black tracking-tight">{deptId} Domain</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Security Gate</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 relative group/key">
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Access Key</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black text-hospital-black font-mono tracking-[0.2em]">
                          {deptPasswords[deptId]}
                        </span>
                        <ShieldCheck className="w-4 h-4 text-primary-blue" />
                      </div>
                    </div>

                    <button 
                      onClick={() => handleInitiatePassChange(deptId)}
                      className="w-full py-5 bg-hospital-black text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary-blue transition-all shadow-lg"
                    >
                      <X className="w-4 h-4 rotate-45" /> Badilisha Password
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Mtumishi Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-hospital-black/90 backdrop-blur-2xl" onClick={() => setShowAddModal(false)} />
             <motion.div initial={{ scale: 0.9, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 50 }} className="relative bg-white w-full max-w-6xl rounded-[4rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] custom-scrollbar border border-slate-100">
                {showSuccess ? (
                  <div className="h-[70vh] flex flex-col items-center justify-center p-20 text-center">
                     <div className="w-32 h-32 bg-emerald-50 rounded-[3rem] flex items-center justify-center mb-8 relative">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center shadow-xl">
                           <CheckCircle2 className="w-10 h-10 text-white" />
                        </motion.div>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 border-4 border-dashed border-primary-blue/20 rounded-[3rem]" />
                     </div>
                     <h3 className="text-4xl font-black text-hospital-black tracking-tighter mb-4">Enrollment Complete!</h3>
                     <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] max-w-md mx-auto leading-relaxed">
                        Mtumishi {formData.name} amesajiliwa kikamilifu kwenye mfumo wa {APP_CONFIG.name}. Karibu kwenye timu!
                     </p>
                  </div>
                ) : (
                  <>
                    <div className="bg-hospital-black p-12 text-white flex justify-between items-center sticky top-0 z-10 border-b border-white/5">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-primary-blue rounded-[2.2em] flex items-center justify-center shadow-2xl">
                             <UserPlus className="text-hospital-black w-8 h-8" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-black tracking-tighter">Sajili Mtumishi</h3>
                            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-1">Hospital Staff Enrollment Portal</p>
                          </div>
                       </div>
                       <button onClick={() => setShowAddModal(false)} className="w-14 h-14 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all">
                          <X className="w-6 h-6 text-white" />
                       </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-12 lg:p-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
                       {/* Left: Photo Upload */}
                       <div className="lg:col-span-4 space-y-10">
                          <div className="text-center group">
                             <div className="relative inline-block">
                                <div className="w-64 h-64 bg-slate-50 rounded-[4rem] flex flex-col items-center justify-center border-4 border-dashed border-slate-200 group-hover:border-primary-blue transition-all overflow-hidden relative shadow-inner">
                                   {formData.photoPreview ? (
                                      <img src={formData.photoPreview} alt="Preview" className="w-full h-full object-cover" />
                                   ) : (
                                      <>
                                         <Users className="w-16 h-16 text-slate-200 mb-4 group-hover:text-primary-blue transition-colors" />
                                         <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Employee Photo</p>
                                      </>
                                   )}
                                </div>
                                <button type="button" onClick={() => document.getElementById('staff-photo')?.click()} className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-hospital-black text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-blue transition-all shadow-xl">
                                   Upload Photo
                                </button>
                                <input id="staff-photo" type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                             </div>
                          </div>

                          <div className="space-y-6 pt-10">
                             <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Social Status & Origin</h4>
                                <div className="space-y-6">
                                   <div className="space-y-2">
                                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Birth Region (Mkoa)</label>
                                      <input className="w-full px-6 py-4 bg-white border-none rounded-2xl text-sm font-bold shadow-sm" placeholder="Dar es Salaam" value={formData.birthRegion} onChange={e => setFormData({...formData, birthRegion: e.target.value})} />
                                   </div>
                                   <div className="space-y-2">
                                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Family Status</label>
                                      <select className="w-full px-6 py-4 bg-white border-none rounded-2xl text-sm font-bold shadow-sm" value={formData.familyStatus} onChange={e => setFormData({...formData, familyStatus: e.target.value})}>
                                         <option>Single</option>
                                         <option>Married</option>
                                         <option>Divorced</option>
                                         <option>Widowed</option>
                                      </select>
                                   </div>
                                   <div className="space-y-4">
                                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Una Watoto Wangapi?</label>
                                      <input type="number" className="w-full px-6 py-4 bg-white border-none rounded-2xl text-sm font-bold shadow-sm" placeholder="0" value={formData.childrenCount} onChange={e => setFormData({...formData, childrenCount: e.target.value})} />
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>

                       {/* Right: Detailed Info */}
                       <div className="lg:col-span-8 space-y-12">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Jina Kamili</label>
                                <input required className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2.5rem] text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary-blue/10 outline-none transition-all" placeholder="Emmanuel Tyson" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Role/Position</label>
                                <select required className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2.5rem] text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary-blue/10 outline-none transition-all cursor-pointer" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                                   {Object.values(StaffRole).map(role => <option key={role} value={role}>{role}</option>)}
                                </select>
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Nambari ya NIDA</label>
                                <input required className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2.5rem] text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary-blue/10 outline-none transition-all" placeholder="19950101-12345-00001-12" value={formData.nidaNumber} onChange={e => setFormData({...formData, nidaNumber: e.target.value})} />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Mkoa wa Makazi</label>
                                <input className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2.5rem] text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary-blue/10 outline-none transition-all" placeholder="Pwani / Kibaha" value={formData.residence} onChange={e => setFormData({...formData, residence: e.target.value})} />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Jina la Benki</label>
                                <select required className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2.5rem] text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary-blue/10 outline-none transition-all cursor-pointer" value={formData.bankName} onChange={e => setFormData({...formData, bankName: e.target.value})}>
                                   <option value="">Chagua Benki...</option>
                                   {TAN_BANKS.map(bank => <option key={bank} value={bank}>{bank}</option>)}
                                   <option value="Other">Inginevyo...</option>
                                </select>
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Bank Account Number</label>
                                <input required className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2.5rem] text-sm font-black shadow-sm focus:ring-4 focus:ring-primary-blue/10 outline-none transition-all" placeholder="015XXXXXXX" value={formData.accountNumber} onChange={e => setFormData({...formData, accountNumber: e.target.value})} />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Education Level</label>
                                <select className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2.5rem] text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary-blue/10 outline-none transition-all cursor-pointer" value={formData.educationLevel} onChange={e => setFormData({...formData, educationLevel: e.target.value})}>
                                   <option>Certificate</option>
                                   <option>Diploma</option>
                                   <option>Degree</option>
                                   <option>Master's</option>
                                   <option>PhD</option>
                                </select>
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Shift Schedule</label>
                                <select className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2.5rem] text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary-blue/10 outline-none transition-all cursor-pointer" value={formData.shift} onChange={e => setFormData({...formData, shift: e.target.value})}>
                                   {Object.values(ShiftType).map(shift => <option key={shift} value={shift}>{shift}</option>)}
                                </select>
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Email address</label>
                                <input required className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2.5rem] text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary-blue/10 outline-none transition-all" placeholder="staff@smile.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Contact Number</label>
                                <input required className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2.5rem] text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary-blue/10 outline-none transition-all" placeholder="+255 7XX XXX XXX" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
                             </div>
                          </div>

                          <div className="bg-slate-50 p-10 rounded-[3.5rem] border border-slate-100 space-y-8">
                             <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-hospital-black text-primary-blue rounded-2xl flex items-center justify-center">
                                   <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                   <h4 className="text-xl font-black text-hospital-black tracking-tight">System Credentials</h4>
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Maelezo ya kuingilia {APP_CONFIG.name}</p>
                                </div>
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Desired Username</label>
                                   <input required className="w-full px-8 py-5 bg-white border-none rounded-[2rem] text-sm font-black tracking-widest shadow-sm" placeholder="SCOTT_M" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Access Password</label>
                                   <input required type="password" className="w-full px-8 py-5 bg-white border-none rounded-[2rem] text-sm font-bold shadow-sm" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                                </div>
                             </div>
                          </div>

                          <div className="pt-6 flex gap-6">
                             <button type="submit" disabled={isSubmitting} className="flex-1 h-20 bg-hospital-black text-white rounded-[2.5rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-primary-blue transition-all shadow-2xl relative overflow-hidden group">
                                {isSubmitting ? (
                                   <Loader2 className="w-6 h-6 animate-spin text-primary-blue" />
                                ) : (
                                   <>
                                      <CheckCircle2 className="w-6 h-6" /> Enroll New Staff Member
                                   </>
                                )}
                             </button>
                             <button type="button" onClick={() => setShowAddModal(false)} className="px-10 h-20 bg-slate-50 text-slate-400 rounded-[2.5rem] font-black text-sm uppercase tracking-widest hover:bg-rose-50 hover:text-rose-500 transition-all">Cancel</button>
                          </div>
                       </div>
                    </form>
                  </>
                )}
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Dept Modal */}
      <AnimatePresence>
        {showAddDeptModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-hospital-black/90 backdrop-blur-xl" onClick={() => setShowAddDeptModal(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-sm rounded-[3.5rem] p-10 shadow-2xl overflow-hidden border border-slate-100">
               <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8 text-primary-blue" />
                  </div>
                  <h3 className="text-2xl font-black text-hospital-black tracking-tighter">Sajili Idara</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Usalama wa Idarani</p>
               </div>
               
               <form onSubmit={handleAddDept} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Jina la Idara</label>
                    <input required className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary-blue/20 outline-none" placeholder="Pharmacy Unit" value={deptData.name} onChange={e => setDeptData({...deptData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Short Code (ID)</label>
                    <input required className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-black font-mono tracking-widest focus:ring-2 focus:ring-primary-blue/20 outline-none" placeholder="PHA" value={deptData.id} onChange={e => setDeptData({...deptData, id: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Privacy Key</label>
                    <input required className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary-blue/20 outline-none" placeholder="••••••••" value={deptData.password} onChange={e => setDeptData({...deptData, password: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Description</label>
                    <textarea required className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold resize-none h-24 focus:ring-2 focus:ring-primary-blue/20 outline-none" placeholder="Usimamizi wa..." value={deptData.description} onChange={e => setDeptData({...deptData, description: e.target.value})} />
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="w-full h-16 bg-hospital-black text-white rounded-[2rem] font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary-blue transition-all shadow-xl">
                      <CheckCircle2 className="w-4 h-4" /> Kamilisha Usajili
                    </button>
                  </div>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HRView;
