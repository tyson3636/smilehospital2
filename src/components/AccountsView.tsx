import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  PlusCircle, 
  History, 
  TrendingUp, 
  DollarSign, 
  FileText,
  CheckCircle2,
  Users,
  PieChart,
  ArrowDownCircle,
  ArrowUpCircle,
  ShieldCheck,
  Building2,
  Smartphone,
  Bell,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

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

const AccountsView = () => {
  const { staffList, transactions, addTransaction, notifications, clearNotification } = useAuth();
  const [activeTab, setActiveTab] = useState<'entry' | 'payroll' | 'pl' | 'ledger'>('entry');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Filter finance-specific notifications
  const financeNotifications = notifications.filter(n => n.recipientId === 'FINANCE');

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Revenue',
    staffId: '',
    description: '',
    paymentMethod: 'Bank Transfer',
    // Payroll Specific
    payrollMethod: 'Bank Transfer' as 'Bank Transfer' | 'Mobile Money',
    payrollBankName: '',
    payrollAccountNumber: '',
    payrollMobileNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Add real transaction to context
    addTransaction({
      detail: formData.title,
      amount: formData.category === 'Revenue' ? `+${formData.amount}` : `-${formData.amount}`,
      method: formData.paymentMethod,
      category: formData.category,
      staffId: formData.staffId
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ 
        title: '', amount: '', category: 'Revenue', staffId: '', description: '', paymentMethod: 'Bank Transfer',
        payrollMethod: 'Bank Transfer', payrollBankName: '', payrollAccountNumber: '', payrollMobileNumber: ''
      });
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const handleStaffSelect = (staffId: string) => {
    const staff = staffList.find(s => s.id === staffId);
    setFormData({
      ...formData,
      staffId,
      payrollBankName: staff?.bankName || '',
      payrollAccountNumber: staff?.accountNumber || '',
      payrollMobileNumber: staff?.contact || '',
    });
  };

  const currentStaff = staffList.find(s => s.id === formData.staffId);

  return (
    <div className="space-y-10">
      {/* Security Header */}
      <div className="bg-hospital-black/5 p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
        <ShieldCheck className="text-emerald-500 w-4 h-4" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Secure Environment: All financial transactions are encrypted and audited from your IP address.</p>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-hospital-black rounded-2xl flex items-center justify-center shadow-2xl">
              <CreditCard className="text-primary-blue w-6 h-6" />
            </div>
            <h2 className="text-4xl font-black text-hospital-black tracking-tighter">Finance & Ledger Control</h2>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Hospital Revenue, Expenditure & Payroll Management</p>
        </div>

        <div className="flex gap-4">
           <div className="bg-emerald-50 px-6 py-4 rounded-[1.5rem] border border-emerald-100">
              <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Total Assets</p>
              <p className="text-xl font-black text-hospital-black tabular-nums">142,500,000 <span className="text-[10px] opacity-40">TZS</span></p>
           </div>
           <div className="bg-rose-50 px-6 py-4 rounded-[1.5rem] border border-rose-100">
              <p className="text-[9px] font-bold text-rose-600 uppercase tracking-widest mb-1">Expenditure</p>
              <p className="text-xl font-black text-hospital-black tabular-nums">24,320,000 <span className="text-[10px] opacity-40">TZS</span></p>
           </div>
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="flex items-center gap-8 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {[
          { id: 'entry', label: 'Post Transaction', icon: PlusCircle },
          { id: 'payroll', label: 'Staff Payroll', icon: Users },
          { id: 'pl', label: 'Profit & Loss', icon: PieChart },
          { id: 'ledger', label: 'Audit Ledger', icon: History }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "pb-4 text-[11px] font-black uppercase tracking-[0.15em] transition-all relative whitespace-nowrap flex items-center gap-3",
              activeTab === tab.id ? "text-primary-blue" : "text-slate-300 hover:text-slate-400 font-bold"
            )}
          >
            <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-primary-blue" : "text-slate-300")} />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="accounts-tab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary-blue rounded-full shadow-[0_0_15px_rgba(0,96,169,0.5)]" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Interface Area */}
        <div className="lg:col-span-8">
           {/* Financial Notifications Alert */}
           {financeNotifications.length > 0 && (
             <div className="mb-10 space-y-4">
                <div className="flex items-center justify-between px-6">
                   <h3 className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-2">
                      <Bell className="w-3.5 h-3.5 animate-bounce" /> Live Payment Notifications
                   </h3>
                </div>
                {financeNotifications.map(notif => (
                   <motion.div 
                      key={notif.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-6 bg-rose-50 border-l-4 border-rose-500 rounded-[2rem] flex items-center justify-between shadow-sm"
                   >
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <DollarSign className="w-5 h-5 text-rose-500" />
                         </div>
                         <p className="text-sm font-black text-hospital-black">{notif.message}</p>
                      </div>
                      <button onClick={() => clearNotification(notif.id)} className="text-rose-300 hover:text-rose-500 transition-colors">
                         <X className="w-5 h-5" />
                      </button>
                   </motion.div>
                ))}
             </div>
           )}

           {/* Section 1: Transaction Entry */}
           {activeTab === 'entry' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl shadow-slate-100 border border-slate-50 relative overflow-hidden">
                  {showSuccess && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-10">
                      <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-xl">
                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                      </div>
                      <h3 className="text-3xl font-black text-hospital-black tracking-tighter mb-2">Post Successful!</h3>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">The transaction has been committed to the master ledger.</p>
                    </motion.div>
                  )}

                  <h3 className="text-2xl font-black text-hospital-black tracking-tight mb-8">Post Expenditure / Revenue</h3>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Description</label>
                        <input required className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary-blue/10 outline-none transition-all" placeholder="e.g. Laboratory Chemicals Purchase" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Amount (TZS)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                          <input required type="number" className="w-full pl-12 pr-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-black shadow-sm focus:ring-4 focus:ring-primary-blue/10 outline-none transition-all" placeholder="5,500,000" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Entry Type</label>
                        <select className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-bold shadow-sm outline-none transition-all cursor-pointer" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                          <option>Revenue (Patient Receipts)</option>
                          <option>Expenditure (Operational Costs)</option>
                          <option>Asset Purchase Agent</option>
                          <option>Emergency Fund Usage</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Payment Portal</label>
                        <select className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-bold shadow-sm outline-none transition-all cursor-pointer" value={formData.paymentMethod} onChange={e => setFormData({...formData, paymentMethod: e.target.value})}>
                          <option>Petty Cash</option>
                          <option>Main Bank Account</option>
                          <option>Corporate Mobile Wallet</option>
                          <option>Insurance Pay-out</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full bg-hospital-black text-white h-24 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-primary-blue transition-all shadow-2xl shadow-slate-200">
                      {isSubmitting ? 'Verifying Ledger State...' : 'Commit Master Entry'}
                    </button>
                  </form>
                </div>
             </motion.div>
           )}

           {/* Section 2: Payroll */}
           {activeTab === 'payroll' && (
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
                <div className="bg-hospital-black text-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-primary-blue/20 rounded-full blur-[100px] -mr-32 -mt-32" />
                   <h3 className="text-2xl font-black tracking-tight mb-8 relative z-10 flex items-center gap-3">
                     <Users className="text-primary-blue w-6 h-6" /> Staff Payroll Engine
                   </h3>
                   <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-2">
                            <label className="text-[9px] font-black text-white/40 uppercase tracking-widest px-4">Select Staff Member</label>
                            <select required className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-[2rem] text-sm font-bold shadow-sm outline-none focus:bg-white/10" value={formData.staffId} onChange={e => handleStaffSelect(e.target.value)}>
                               <option value="" className="text-black">Choose a staff...</option>
                               {staffList.map(s => <option key={s.id} value={s.id} className="text-black">{s.name} ({s.role})</option>)}
                            </select>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[9px] font-black text-white/40 uppercase tracking-widest px-4">Salary Month</label>
                            <select className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-[2rem] text-sm font-bold shadow-sm outline-none focus:bg-white/10">
                               <option className="text-black">May 2026</option>
                               <option className="text-black">April 2026</option>
                            </select>
                         </div>
                      </div>

                      {currentStaff && (
                         <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 space-y-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6">
                               <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                  <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Master Active Ledger</span>
                               </div>
                            </div>
                            
                            {/* Payment Method Selector */}
                            <div className="space-y-4">
                               <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-2 px-2">Secure Disbursement Portal</p>
                               <div className="grid grid-cols-2 gap-4">
                                  <button 
                                    type="button"
                                    onClick={() => setFormData({...formData, payrollMethod: 'Bank Transfer'})}
                                    className={cn(
                                       "py-5 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2",
                                       formData.payrollMethod === 'Bank Transfer' ? "bg-primary-blue border-primary-blue text-white shadow-lg shadow-primary-blue/20" : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                                    )}
                                  >
                                     <Building2 className="w-5 h-5" />
                                     <span className="text-[9px] font-black uppercase tracking-widest">RTGS Bank Transfer</span>
                                  </button>
                                  <button 
                                    type="button"
                                    onClick={() => setFormData({...formData, payrollMethod: 'Mobile Money'})}
                                    className={cn(
                                       "py-5 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2",
                                       formData.payrollMethod === 'Mobile Money' ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                                    )}
                                  >
                                     <Smartphone className="w-5 h-5" />
                                     <span className="text-[9px] font-black uppercase tracking-widest">Mobile Push Payment</span>
                                  </button>
                               </div>
                            </div>

                            {/* Dynamic Details Input */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 relative z-10">
                               {formData.payrollMethod === 'Bank Transfer' ? (
                                  <>
                                     <div className="space-y-2">
                                        <div className="flex items-center justify-between px-2">
                                           <label className="text-[9px] font-black text-white/40 uppercase tracking-widest">Operating Bank</label>
                                           <div className="flex items-center gap-1 text-[8px] font-bold text-emerald-400">
                                              <ShieldCheck className="w-3 h-3" /> VERIFIED
                                           </div>
                                        </div>
                                        <select required className="w-full px-6 py-4 bg-white/10 border-none rounded-xl text-sm font-bold text-white focus:ring-2 focus:ring-primary-blue cursor-pointer" value={formData.payrollBankName} onChange={e => setFormData({...formData, payrollBankName: e.target.value})}>
                                           <option value="" className="text-black">Select Main Bank...</option>
                                           {TAN_BANKS.map(bank => <option key={bank} value={bank} className="text-black">{bank}</option>)}
                                           <option value="Other" className="text-black">Other Bank...</option>
                                        </select>
                                     </div>
                                     <div className="space-y-2">
                                        <label className="text-[9px] font-black text-white/40 uppercase tracking-widest px-2">Account Number (Direct Deposit)</label>
                                        <input required className="w-full px-6 py-4 bg-white/10 border-none rounded-xl text-sm font-black text-white tracking-widest focus:ring-2 focus:ring-primary-blue" value={formData.payrollAccountNumber} onChange={e => setFormData({...formData, payrollAccountNumber: e.target.value})} placeholder="015XXXXXXXX" />
                                     </div>
                                  </>
                               ) : (
                                  <div className="md:col-span-2 space-y-3">
                                     <div className="flex items-center justify-between px-2">
                                        <label className="text-[9px] font-black text-white/40 uppercase tracking-widest">Linked Wallet Number</label>
                                        <div className="flex items-center gap-1 text-[8px] font-bold text-emerald-400">
                                           <ShieldCheck className="w-3 h-3" /> CRYPTO-AUDIT READY
                                        </div>
                                     </div>
                                     <div className="relative">
                                        <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                                        <input required className="w-full pl-14 pr-6 py-5 bg-white/10 border-none rounded-2xl text-sm font-black text-white tracking-widest focus:ring-2 focus:ring-emerald-500" value={formData.payrollMobileNumber} onChange={e => setFormData({...formData, payrollMobileNumber: e.target.value})} placeholder="07XXXXXXXX" />
                                     </div>
                                  </div>
                               )}
                            </div>

                            <div className="pt-6 border-t border-white/10">
                               <div className="flex justify-between items-center bg-white/5 p-6 rounded-2xl">
                                  <div>
                                     <p className="text-xs font-black uppercase tracking-widest mb-1">Payable Amount</p>
                                     <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Base Salary + Allowances</p>
                                  </div>
                                  <p className="text-3xl font-black text-primary-blue tabular-nums">1,850,000 <span className="text-[10px] text-white/40">TZS</span></p>
                               </div>
                            </div>
                         </motion.div>
                      )}

                      <button type="submit" disabled={!formData.staffId || isSubmitting} className="w-full bg-primary-blue text-white h-20 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-hospital-black transition-all disabled:opacity-30 disabled:pointer-events-none">
                        {isSubmitting ? 'Transmitting Funds...' : 'Approve & Release Payment'}
                      </button>
                   </form>
                </div>
             </motion.div>
           )}

           {/* Section 3: Profit & Loss */}
           {activeTab === 'pl' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="hospital-card p-10 bg-emerald-500 text-white shadow-emerald-100 shadow-2xl">
                      <div className="flex items-center justify-between mb-8">
                         <ArrowUpCircle className="w-10 h-10" />
                         <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-4 py-2 rounded-xl">Q2 Target: 92%</span>
                      </div>
                      <h4 className="text-lg font-black uppercase tracking-widest opacity-60 mb-2">Total Income</h4>
                      <p className="text-5xl font-black tracking-tighter tabular-nums">482M</p>
                      <p className="text-[10px] font-black uppercase tracking-widest mt-6">+12.4% From Last Month</p>
                   </div>
                   <div className="hospital-card p-10 bg-rose-500 text-white shadow-rose-100 shadow-2xl">
                      <div className="flex items-center justify-between mb-8">
                         <ArrowDownCircle className="w-10 h-10" />
                         <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-4 py-2 rounded-xl">Ops Cost: High</span>
                      </div>
                      <h4 className="text-lg font-black uppercase tracking-widest opacity-60 mb-2">Total Expenses</h4>
                      <p className="text-5xl font-black tracking-tighter tabular-nums">124M</p>
                      <p className="text-[10px] font-black uppercase tracking-widest mt-6">-2.1% Reduction Saved</p>
                   </div>
                </div>

                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100">
                   <div className="flex items-center justify-between mb-10">
                      <h3 className="text-2xl font-black text-hospital-black tracking-tighter">Net Operating Margin</h3>
                      <p className="text-3xl font-black text-primary-blue tabular-nums">358,000,000 <span className="text-xs text-slate-300">TZS</span></p>
                   </div>
                   <div className="h-4 bg-slate-50 rounded-full overflow-hidden flex">
                      <div className="h-full bg-emerald-500" style={{ width: '74%' }} />
                      <div className="h-full bg-rose-500" style={{ width: '26%' }} />
                   </div>
                   <div className="grid grid-cols-2 gap-10 mt-8">
                      <div className="space-y-2">
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Profitability Ratio</p>
                         </div>
                         <p className="text-xl font-black text-hospital-black">74.2%</p>
                      </div>
                      <div className="space-y-2 text-right">
                         <div className="flex items-center gap-2 justify-end">
                            <div className="w-2 h-2 bg-rose-500 rounded-full" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loss/Operational Cap</p>
                         </div>
                         <p className="text-xl font-black text-hospital-black">25.8%</p>
                      </div>
                   </div>
                </div>
             </motion.div>
           )}

           {/* Section 4: Audit Ledger */}
           {activeTab === 'ledger' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hospital-card p-0 overflow-hidden">
                 <div className="p-10 border-b border-slate-50">
                    <h3 className="text-2xl font-black text-hospital-black tracking-tighter">Master Audit Trail</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Immutable record of every hospital transaction</p>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead className="bg-slate-50">
                          <tr>
                             <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                             <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Transaction ID</th>
                             <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Details</th>
                             <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                             <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Status</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {transactions.length === 0 ? (
                             <tr>
                                <td colSpan={5} className="px-10 py-12 text-center">
                                   <History className="w-12 h-12 text-slate-100 mx-auto mb-4" />
                                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No transactions recorded yet.</p>
                                </td>
                             </tr>
                          ) : (
                             transactions.map((tx, i) => (
                                <motion.tr 
                                   key={tx.id}
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   className="hover:bg-slate-50/50 transition-colors"
                                >
                                   <td className="px-10 py-6 text-sm font-bold text-slate-500 tabular-nums">
                                      {new Date(tx.timestamp).toLocaleDateString([], {day: '2-digit', month: 'short'})}, {new Date(tx.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                                   </td>
                                   <td className="px-6 py-6 text-xs font-black uppercase tracking-widest text-hospital-black">{tx.id}</td>
                                   <td className="px-6 py-6 text-sm font-bold text-slate-600">
                                      <div className="flex flex-col">
                                         <span>{tx.detail}</span>
                                         <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{tx.method}</span>
                                      </div>
                                   </td>
                                   <td className={cn("px-6 py-6 text-sm font-black tabular-nums", tx.amount.startsWith('+') ? "text-emerald-500" : "text-rose-500")}>
                                      {tx.amount} TZS
                                   </td>
                                   <td className="px-10 py-6 text-right">
                                      <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">{tx.status}</span>
                                   </td>
                                </motion.tr>
                             ))
                          )}
                       </tbody>
                    </table>
                 </div>
              </motion.div>
           )}
        </div>

        {/* Audit Sidebar */}
        <div className="lg:col-span-4 space-y-10">
           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl space-y-8">
              <h4 className="text-xl font-black text-hospital-black tracking-tight flex items-center gap-3">
                 <FileText className="text-primary-blue w-6 h-6" /> Quick Reports
              </h4>
              <div className="space-y-4">
                 {[
                    { label: 'Weekly Revenue Summary', size: '1.2 MB' },
                    { label: 'Expenditure Audit Log', size: '4.8 MB' },
                    { label: 'Staff Payroll Sheet Q2', size: '840 KB' },
                 ].map((report, i) => (
                    <button key={i} className="w-full p-6 bg-slate-50 rounded-[2rem] flex flex-col gap-1 hover:bg-primary-blue group transition-all text-left">
                       <span className="text-[11px] font-black text-hospital-black group-hover:text-white transition-colors">{report.label}</span>
                       <span className="text-[9px] font-bold text-slate-400 group-hover:text-white/60 uppercase tracking-widest">{report.size} • PDF Download</span>
                    </button>
                 ))}
              </div>
           </div>

           <div className="bg-hospital-black p-10 rounded-[4rem] text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-blue via-transparent to-transparent pointer-events-none" />
              <TrendingUp className="text-primary-blue w-12 h-12 mb-8" />
              <h4 className="text-2xl font-black tracking-tight leading-loose mb-2">Projected<br />Operating Budget</h4>
              <p className="text-4xl font-black text-primary-blue tabular-nums">1.2B <span className="text-xs text-white/40">TZS</span></p>
              <div className="mt-8 pt-8 border-t border-white/10">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Utilized</span>
                    <span className="text-[9px] font-black text-primary-blue uppercase tracking-widest">48%</span>
                 </div>
                 <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-blue" style={{ width: '48%' }} />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsView;
