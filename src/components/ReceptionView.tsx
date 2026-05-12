import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  UserPlus, 
  Search, 
  CreditCard, 
  ShieldCheck, 
  Stethoscope, 
  FileText, 
  History,
  CheckCircle2,
  Clock,
  ArrowRight,
  ClipboardList
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { StaffRole } from '../types';

const INSURANCE_PROVIDERS = [
  'NHIF (National Health Insurance)',
  'Strategis Health',
  'Jubilee Insurance',
  'AAR Health Care',
  'Resolution Insurance',
  'Britam Insurance',
  'GA Insurance',
  'Heritage Insurance',
  'ICEA Lion Health',
  'Metropolitan Life'
];

const ReceptionView = () => {
  const { staffList, registerPatient, patients } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const doctors = staffList.filter(s => s.role === StaffRole.DOCTOR || s.role === StaffRole.ADMIN);

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    paymentType: 'Cash' as 'Cash' | 'Insurance / Bima',
    insuranceProvider: 'NHIF (National Health Insurance)',
    amountPaid: '',
    fileType: 'Existing' as 'Existing' | 'New Patient',
    fileNumber: '',
    doctorId: '',
    emergencyLevel: 'Normal'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newPatient = {
      id: Date.now().toString(),
      fullName: `${formData.firstName} ${formData.middleName} ${formData.lastName}`,
      paymentType: formData.paymentType === 'Cash' ? 'Cash' : `Insurance: ${formData.insuranceProvider}`,
      amountPaid: formData.paymentType === 'Cash' ? formData.amountPaid : null,
      fileNumber: formData.fileType === 'New Patient' ? `NEW-${Math.floor(Math.random()*10000)}` : formData.fileNumber,
      doctorId: formData.doctorId,
      status: 'Waiting',
      timestamp: new Date().toISOString(),
      emergencyLevel: formData.emergencyLevel
    };

    setTimeout(() => {
      registerPatient(newPatient);
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        firstName: '', middleName: '', lastName: '',
        paymentType: 'Cash', insuranceProvider: 'NHIF (National Health Insurance)',
        amountPaid: '',
        fileType: 'Existing', fileNumber: '', doctorId: '',
        emergencyLevel: 'Normal'
      });
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="bg-hospital-black rounded-[4rem] p-12 text-white relative overflow-hidden group shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-blue via-transparent to-transparent" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 bg-primary-blue rounded-2xl flex items-center justify-center shadow-lg shadow-primary-blue/20">
                <UserPlus className="text-white w-7 h-7" />
              </div>
              <h2 className="text-4xl font-black tracking-tighter uppercase italic">Reception Hub</h2>
            </div>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Patient Registration & Triage Gateway</p>
          </div>

          <div className="flex gap-4">
             <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-[2rem] backdrop-blur-sm">
                <p className="text-[10px] text-white/40 font-black uppercase mb-1">Queue Status</p>
                <div className="flex items-center gap-2">
                   <Clock className="w-3.5 h-3.5 text-primary-blue" />
                   <p className="text-xl font-black tracking-tighter">{patients.filter(p => p.status === 'Waiting').length} Patients Waiting</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Form */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl border border-slate-50 relative overflow-hidden">
            {showSuccess && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-10">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-xl">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-black text-hospital-black tracking-tighter mb-2">Usajili Imekamilika!</h3>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-loose max-w-xs">Mgonjwa amesajiliwa kikamilifu na notification imetumwa kwa Dr. aliyepangiwa.</p>
              </motion.div>
            )}

            <h3 className="text-2xl font-black text-hospital-black tracking-tight mb-10 flex items-center gap-3">
               <FileText className="text-primary-blue w-6 h-6" /> Patient Master Intake
            </h3>

            <form onSubmit={handleSubmit} className="space-y-10">
               {/* Name Section */}
               <div className="space-y-6">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-primary-blue rounded-full" /> Full Official Names
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 ml-4">Jina la Kwanza</label>
                        <input required className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary-blue/10 outline-none transition-all" placeholder="First Name" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 ml-4">Jina la Kati</label>
                        <input required className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary-blue/10 outline-none transition-all" placeholder="Middle Name" value={formData.middleName} onChange={e => setFormData({...formData, middleName: e.target.value})} />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 ml-4">Jina la Mwisho</label>
                        <input required className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary-blue/10 outline-none transition-all" placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Payment Info */}
                  <div className="space-y-6">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Financial Settlement
                     </div>
                     <div className="grid grid-cols-1 gap-4">
                        <div className="flex gap-4">
                           <button 
                              type="button"
                              onClick={() => setFormData({...formData, paymentType: 'Cash'})}
                              className={cn(
                                 "flex-1 p-6 h-24 rounded-[2.5rem] flex flex-col items-center justify-center gap-2 transition-all border-2",
                                 formData.paymentType === 'Cash' ? "bg-emerald-50 border-emerald-200 text-emerald-900 shadow-xl shadow-emerald-500/5 scale-105 z-10" : "bg-white border-slate-100 text-slate-400 opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
                              )}
                           >
                              <div className="flex items-center gap-3">
                                 <CreditCard className={formData.paymentType === 'Cash' ? "text-emerald-500 w-5 h-5" : "text-slate-300 w-5 h-5"} />
                                 <span className="text-[10px] font-black uppercase tracking-[0.15em]">Cash Payment</span>
                              </div>
                              {formData.paymentType === 'Cash' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                           </button>
                           <button 
                              type="button"
                              onClick={() => setFormData({...formData, paymentType: 'Insurance / Bima'})}
                              className={cn(
                                 "flex-1 p-6 h-24 rounded-[2.5rem] flex flex-col items-center justify-center gap-2 transition-all border-2",
                                 formData.paymentType === 'Insurance / Bima' ? "bg-primary-blue/5 border-primary-blue/20 text-primary-blue shadow-xl shadow-primary-blue/5 scale-105 z-10" : "bg-white border-slate-100 text-slate-400 opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
                              )}
                           >
                              <div className="flex items-center gap-3">
                                 <ShieldCheck className={formData.paymentType === 'Insurance / Bima' ? "text-primary-blue w-5 h-5" : "text-slate-300 w-5 h-5"} />
                                 <span className="text-[10px] font-black uppercase tracking-[0.15em]">Insurance / Bima</span>
                              </div>
                              {formData.paymentType === 'Insurance / Bima' && <CheckCircle2 className="w-4 h-4 text-primary-blue" />}
                           </button>
                        </div>

                        {formData.paymentType === 'Cash' && (
                           <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 space-y-6 shadow-inner"
                           >
                              <div className="flex items-center justify-between">
                                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Secure Payment Gateway</label>
                                 <div className="bg-emerald-500 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase">Security Active</div>
                              </div>
                              
                              <div className="bg-white p-6 rounded-[2rem] border border-slate-100 space-y-4">
                                 <div className="flex items-center justify-between">
                                    <p className="text-[10px] font-black text-slate-400 uppercase">Merchant Lipa No:</p>
                                    <p className="text-xl font-black text-hospital-black tracking-widest">552-880-1</p>
                                 </div>
                                 <div className="h-px bg-slate-50 w-full" />
                                 <p className="text-[9px] font-bold text-slate-400 italic text-center">Tuma malipo kwanza, kisha jaza kiasi hapa chini.</p>
                              </div>

                              <div className="space-y-2">
                                 <label className="text-[11px] font-bold text-slate-500 ml-4">Kiasi kilicholipwa (TZS)</label>
                                 <input 
                                    required
                                    type="number"
                                    className="w-full px-8 py-5 bg-white border-none rounded-[2rem] text-sm font-black shadow-sm outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:font-normal"
                                    placeholder="e.g. 20,000"
                                    value={formData.amountPaid}
                                    onChange={e => setFormData({...formData, amountPaid: e.target.value})}
                                 />
                                 <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest ml-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-3 h-3" /> Transaction will be synced to Accounts
                                 </p>
                              </div>
                           </motion.div>
                        )}

                        {formData.paymentType === 'Insurance / Bima' && (
                           <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 space-y-4 shadow-inner"
                           >
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Select Provider (Mfuko wa Bima)</label>
                              <select 
                                 required
                                 className="w-full px-8 py-5 bg-white border-none rounded-[2rem] text-sm font-bold shadow-sm outline-none focus:ring-4 focus:ring-primary-blue/10 transition-all cursor-pointer"
                                 value={formData.insuranceProvider}
                                 onChange={e => setFormData({...formData, insuranceProvider: e.target.value})}
                              >
                                 {INSURANCE_PROVIDERS.map(provider => (
                                    <option key={provider} value={provider}>{provider}</option>
                                 ))}
                                 <option value="Other">Other / International</option>
                              </select>
                              <div className="flex items-center gap-3 px-4 py-2 bg-primary-blue/10 rounded-2xl">
                                 <ShieldCheck className="w-3.5 h-3.5 text-primary-blue" />
                                 <p className="text-[9px] font-black text-primary-blue uppercase tracking-widest">Eligibility Check Auto-Pending</p>
                              </div>
                           </motion.div>
                        )}
                     </div>
                  </div>

                  {/* File Info */}
                  <div className="space-y-6">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> File & Records
                     </div>
                     <div className="p-8 bg-slate-50 rounded-[3rem] space-y-6">
                        <div className="flex items-center bg-white p-2 rounded-2xl">
                           <button 
                             type="button"
                             onClick={() => setFormData({...formData, fileType: 'Existing'})}
                             className={cn("flex-1 py-3 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", formData.fileType === 'Existing' ? "bg-hospital-black text-white" : "text-slate-300")}
                           >Existing</button>
                           <button 
                             type="button"
                             onClick={() => setFormData({...formData, fileType: 'New Patient'})}
                             className={cn("flex-1 py-3 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", formData.fileType === 'New Patient' ? "bg-hospital-black text-white" : "text-slate-300")}
                           >New Patient</button>
                        </div>
                        {formData.fileType === 'Existing' && (
                           <input required className="w-full px-6 py-4 bg-white border-none rounded-2xl text-sm font-black tracking-widest shadow-sm focus:ring-4 focus:ring-primary-blue/5 outline-none transition-all uppercase" placeholder="Enter File Number e.g. FM-8821" value={formData.fileNumber} onChange={e => setFormData({...formData, fileNumber: e.target.value})} />
                        )}
                        {formData.fileType === 'New Patient' && (
                           <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center gap-3">
                              <CheckCircle2 className="w-4 h-4" />
                              <p className="text-[9px] font-black uppercase tracking-widest leading-loose">A dynamic file number will be generated on commit.</p>
                           </div>
                        )}
                     </div>
                  </div>
               </div>

               {/* Assign Doctor */}
               <div className="space-y-6">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" /> Consultation & Assign Doctor
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 ml-4">Available Doctor (OPD)</label>
                        <select required className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2.5rem] text-sm font-bold shadow-sm outline-none transition-all cursor-pointer" value={formData.doctorId} onChange={e => setFormData({...formData, doctorId: e.target.value})}>
                           <option value="">Select Doctor...</option>
                           {doctors.map(doc => <option key={doc.id} value={doc.id}>Dr. {doc.name} - {doc.dept || 'Consultant'}</option>)}
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 ml-4">Emergency Level</label>
                        <select className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2.5rem] text-sm font-bold shadow-sm outline-none transition-all cursor-pointer" value={formData.emergencyLevel} onChange={e => setFormData({...formData, emergencyLevel: e.target.value})}>
                           <option>Normal (Routine)</option>
                           <option>Urgent (Moderate)</option>
                           <option>Emergency (Critical)</option>
                        </select>
                     </div>
                  </div>
               </div>

               <button type="submit" disabled={isSubmitting} className="w-full bg-hospital-black text-white h-24 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-primary-blue transition-all shadow-2xl shadow-slate-200">
                  {isSubmitting ? 'Transmitting Data to Doctor Hub...' : 'Send to Doctor Hub'} <ArrowRight className="w-5 h-5" />
               </button>
            </form>
          </div>
        </div>

        {/* Queue Sidebar */}
        <div className="lg:col-span-4 space-y-10">
           <div className="hospital-card p-10">
              <h4 className="text-xl font-black text-hospital-black tracking-tight mb-8 flex items-center gap-3">
                 <ClipboardList className="text-primary-blue w-6 h-6" /> Waiting Queue
              </h4>
              <div className="space-y-6">
                 {patients.length === 0 ? (
                    <div className="text-center py-12">
                       <Clock className="w-12 h-12 text-slate-100 mx-auto mb-4" />
                       <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Queue is clear.</p>
                    </div>
                 ) : (
                    patients.slice(0, 5).map((p, i) => (
                       <div key={i} className="flex items-start gap-4 p-5 bg-slate-50 rounded-[2.5rem] relative group cursor-default">
                          <div className={cn(
                             "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                             p.emergencyLevel === 'Emergency (Critical)' ? "bg-rose-50 text-rose-500" : "bg-white text-slate-400"
                          )}>
                             <p className="text-sm font-black text-center">{i+1}</p>
                          </div>
                          <div>
                             <h4 className="text-xs font-black text-hospital-black truncate w-32 tracking-tight italic">{p.fullName}</h4>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{p.fileNumber}</p>
                             <div className="flex items-center gap-4 mt-2">
                                <span className={cn("text-[8px] font-black uppercase px-2 py-0.5 rounded", p.paymentType === 'Cash' ? "bg-emerald-50 text-emerald-600" : "bg-primary-blue/5 text-primary-blue")}>
                                   {p.paymentType}
                                </span>
                                <span className="text-[8px] font-black text-slate-300 uppercase">{new Date(p.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                             </div>
                          </div>
                       </div>
                    ))
                 )}
              </div>
              {patients.length > 5 && (
                 <button className="w-full mt-6 py-4 text-[10px] font-black uppercase text-primary-blue hover:underline">View All Full Queue</button>
              )}
           </div>

           <div className="bg-hospital-black p-10 rounded-[3.5rem] text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary-blue via-transparent to-transparent pointer-events-none" />
              <Stethoscope className="text-primary-blue w-12 h-12 mb-8" />
              <h4 className="text-2xl font-black tracking-tighter leading-snug">Doctor<br />Response Time</h4>
              <div className="mt-8">
                 <p className="text-4xl font-black text-primary-blue tracking-tighter">~14m</p>
                 <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-2">Average wait per patient</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionView;
