import React, { useState } from 'react';
import { 
  Pill, 
  Search, 
  Plus, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  History, 
  ArrowUpRight,
  ShieldCheck,
  Package,
  ShoppingCart,
  Activity,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Medication {
  id: string;
  name: string;
  type: string;
  category: string;
  stock: number;
  minStock: number;
  unitPrice: number;
  expiryDate: string;
}

const PharmacyView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'dispense' | 'add' | 'audit'>('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDispensing, setIsDispensing] = useState(false);
  const [isAddingStock, setIsAddingStock] = useState(false);
  const [dispenseSuccess, setDispenseSuccess] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  const [newMedData, setNewMedData] = useState({
    name: '',
    category: 'Painkiller',
    type: 'Tablet',
    stock: '',
    price: '',
    expiry: '',
    authCode: ''
  });

  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingStock(true);
    setTimeout(() => {
      setIsAddingStock(false);
      setAddSuccess(true);
      setNewMedData({ name: '', category: 'Painkiller', type: 'Tablet', stock: '', price: '', expiry: '', authCode: '' });
      setTimeout(() => setAddSuccess(false), 3000);
    }, 1500);
  };

  const initialInventory: Medication[] = [
    { id: 'DRG-001', name: 'Paracetamol', type: 'Tablet', category: 'Painkiller', stock: 1500, minStock: 200, unitPrice: 150, expiryDate: '2027-12-01' },
    { id: 'DRG-002', name: 'Amoxicillin', type: 'Capsule', category: 'Antibiotic', stock: 85, minStock: 100, unitPrice: 2500, expiryDate: '2026-06-15' },
    { id: 'DRG-003', name: 'Insulin Glargine', type: 'Injection', category: 'Diabetes', stock: 42, minStock: 10, unitPrice: 45000, expiryDate: '2025-08-20' },
    { id: 'DRG-004', name: 'Omeprazole', type: 'Capsule', category: 'Gastric', stock: 500, minStock: 50, unitPrice: 400, expiryDate: '2028-02-10' },
    { id: 'DRG-005', name: 'Salbutamol', type: 'Inhaler', category: 'Respiratory', stock: 120, minStock: 30, unitPrice: 12000, expiryDate: '2026-11-22' },
  ];

  const categories = ['All', 'Painkiller', 'Antibiotic', 'Respiratory', 'Diabetes', 'Gastric'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredInventory = initialInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDispense = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDispensing(true);
    setTimeout(() => {
      setIsDispensing(false);
      setDispenseSuccess(true);
      setTimeout(() => setDispenseSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-12">
      {/* Secure Header */}
      <div className="bg-hospital-black rounded-[4rem] p-12 text-white relative overflow-hidden group shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Pill className="text-emerald-400 w-6 h-6" />
              </div>
              <h2 className="text-4xl font-black tracking-tighter uppercase italic">Pharmacy Master</h2>
            </div>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Restricted Access • Secure Dispensing Protocol Active</p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-3xl backdrop-blur-sm">
                <p className="text-[10px] text-white/40 font-black uppercase mb-1">Total Assets (Stock)</p>
                <div className="flex items-center gap-3">
                   <Activity className="w-4 h-4 text-emerald-400" />
                   <p className="text-xl font-black tracking-tighter">8.4M <span className="text-[10px] opacity-40">TZS</span></p>
                </div>
             </div>
             <button className="bg-emerald-500 hover:bg-emerald-400 text-white p-5 rounded-3xl transition-all shadow-xl shadow-emerald-500/20 active:scale-95">
                <Plus className="w-6 h-6" />
             </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-12 border-b border-slate-100 pb-2 overflow-x-auto scrollbar-hide">
         {[
           { id: 'inventory', label: 'Medicine Store', icon: Package },
           { id: 'add', label: 'Add New Stock', icon: Plus },
           { id: 'dispense', label: 'Dispense Medicine', icon: ShoppingCart },
           { id: 'audit', label: 'Pharmacy Ledger', icon: History }
         ].map(tab => (
           <button 
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={cn(
               "pb-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative flex items-center gap-3",
               activeTab === tab.id ? "text-emerald-600" : "text-slate-300 hover:text-slate-400"
             )}
           >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="pharmacy-tab" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-full" />
              )}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Main Interface Content */}
         <div className="lg:col-span-8 space-y-8">
            {activeTab === 'inventory' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                 {/* Filters */}
                 <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 relative group">
                       <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                       <input 
                         className="w-full pl-14 pr-8 py-5 bg-white border-none rounded-[2rem] text-sm font-bold shadow-sm focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all"
                         placeholder="Medicine name or Batch ID..."
                         value={searchQuery}
                         onChange={e => setSearchQuery(e.target.value)}
                       />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                       {categories.map(cat => (
                         <button 
                           key={cat}
                           onClick={() => setSelectedCategory(cat)}
                           className={cn(
                             "px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                             selectedCategory === cat ? "bg-hospital-black text-white" : "bg-white text-slate-400 hover:bg-slate-50"
                           )}
                         >
                           {cat}
                         </button>
                       ))}
                    </div>
                 </div>

                 {/* Inventory Table */}
                 <div className="hospital-card p-0 overflow-hidden">
                    <table className="w-full text-left">
                       <thead className="bg-slate-50">
                          <tr>
                             <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Medicine & ID</th>
                             <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                             <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Price (UNIT)</th>
                             <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">In Stock</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {filteredInventory.map((item) => (
                             <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-10 py-8">
                                   <div className="flex flex-col">
                                      <span className="text-sm font-black text-hospital-black tracking-tight">{item.name}</span>
                                      <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-0.5">{item.id} • {item.type}</span>
                                   </div>
                                </td>
                                <td className="px-6 py-8">
                                   {item.stock <= item.minStock ? (
                                     <div className="flex items-center gap-2 text-rose-500 bg-rose-50 px-3 py-1.5 rounded-xl w-fit">
                                        <AlertTriangle className="w-3.5 h-3.5" />
                                        <span className="text-[9px] font-black uppercase tracking-widest leading-none">Low Stock</span>
                                     </div>
                                   ) : (
                                     <div className="flex items-center gap-2 text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-xl w-fit">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        <span className="text-[9px] font-black uppercase tracking-widest leading-none">Optimal</span>
                                     </div>
                                   )}
                                </td>
                                <td className="px-6 py-8">
                                   <span className="text-sm font-black text-hospital-black tabular-nums">{item.unitPrice.toLocaleString()} <span className="text-[10px] opacity-30">TZS</span></span>
                                </td>
                                <td className="px-6 py-8 text-right">
                                   <div className="flex flex-col items-end pr-4">
                                      <span className="text-xl font-black text-hospital-black tabular-nums">{item.stock}</span>
                                      <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Available</span>
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </motion.div>
            )}

            {activeTab === 'add' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                 <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden border border-slate-50">
                    {addSuccess && (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-10">
                          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-xl">
                             <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                          </div>
                          <h3 className="text-3xl font-black text-hospital-black tracking-tighter mb-2">Inventory Updated!</h3>
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">New medication Batch successfully committed to secure store.</p>
                       </motion.div>
                    )}

                    <div className="flex items-center justify-between mb-10">
                       <div className="flex items-center gap-4">
                          <Package className="w-8 h-8 text-emerald-500" />
                          <div>
                             <h3 className="text-2xl font-black text-hospital-black tracking-tight">Add Medicine Entry</h3>
                             <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Store Inventory Injection Protocol</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-2xl">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Secure Ledger</span>
                       </div>
                    </div>

                    <form onSubmit={handleAddMed} className="space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Medication Name</label>
                             <input required className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-bold shadow-sm outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all" placeholder="e.g. Paracetamol Extra" value={newMedData.name} onChange={e => setNewMedData({...newMedData, name: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Medication Category</label>
                             <select className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-bold shadow-sm outline-none transition-all cursor-pointer" value={newMedData.category} onChange={e => setNewMedData({...newMedData, category: e.target.value})}>
                                {categories.slice(1).map(cat => <option key={cat}>{cat}</option>)}
                                <option>General</option>
                             </select>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Unit Price (TZS)</label>
                             <div className="relative">
                                <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                                <input required type="number" className="w-full pl-12 pr-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-black shadow-sm outline-none transition-all" placeholder="500" value={newMedData.price} onChange={e => setNewMedData({...newMedData, price: e.target.value})} />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Quantity to Add</label>
                             <input required type="number" className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-black shadow-sm outline-none transition-all" placeholder="00" value={newMedData.stock} onChange={e => setNewMedData({...newMedData, stock: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Expiry Date</label>
                             <input required type="date" className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-bold shadow-sm outline-none transition-all" value={newMedData.expiry} onChange={e => setNewMedData({...newMedData, expiry: e.target.value})} />
                          </div>
                       </div>

                       <div className="pt-8 border-t border-slate-50">
                          <div className="flex flex-col md:flex-row items-center gap-6">
                             <div className="flex-1 w-full space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Pharmacist Master Auth Code</label>
                                <input required type="password" className="w-full px-8 py-5 bg-rose-50/30 border border-dashed border-rose-200 rounded-[2rem] text-sm font-black shadow-sm outline-none transition-all" placeholder="••••••••" value={newMedData.authCode} onChange={e => setNewMedData({...newMedData, authCode: e.target.value})} />
                             </div>
                             <button type="submit" disabled={isAddingStock} className="w-full md:w-fit bg-hospital-black text-white px-16 h-20 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.25em] shadow-2xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-4">
                                {isAddingStock ? 'Verifying Batch...' : 'Commit New Stock'}
                             </button>
                          </div>
                       </div>
                    </form>
                 </div>
              </motion.div>
            )}

            {activeTab === 'dispense' && (
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
                 <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden">
                    {dispenseSuccess && (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-10">
                          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-xl">
                             <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                          </div>
                          <h3 className="text-3xl font-black text-hospital-black tracking-tighter mb-2">Dispensed Successfully</h3>
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Inventory updated and billing report sent to accounts.</p>
                       </motion.div>
                    )}

                    <div className="flex items-center gap-4 mb-10">
                       <ShieldCheck className="w-8 h-8 text-emerald-500" />
                       <div>
                          <h3 className="text-2xl font-black text-hospital-black tracking-tight">Dispense Protocol Card</h3>
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Authorized Pharmacist Input Only</p>
                       </div>
                    </div>

                    <form onSubmit={handleDispense} className="space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Select Medication</label>
                             <select className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-bold shadow-sm outline-none transition-all cursor-pointer">
                                {initialInventory.map(item => (
                                  <option key={item.id} value={item.id}>{item.name} ({item.stock} in stock)</option>
                                ))}
                             </select>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Quantity to Dispense</label>
                             <input type="number" required min="1" className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-black shadow-sm outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-mono" placeholder="00" />
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Patient Reference ID</label>
                             <input required className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-bold shadow-sm outline-none transition-all uppercase tracking-widest" placeholder="PAT-XXXX" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Verification Code</label>
                             <input required type="password" className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-black shadow-sm outline-none transition-all" placeholder="••••••" />
                          </div>
                       </div>

                       <div className="p-8 bg-emerald-50 rounded-[2.5rem] flex items-center justify-between border border-emerald-100">
                          <div>
                             <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Estimated Total Price</p>
                             <p className="text-3xl font-black text-hospital-black tabular-nums">4,500 <span className="text-sm opacity-40">TZS</span></p>
                          </div>
                          <button type="submit" disabled={isDispensing} className="bg-hospital-black text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-emerald-500 transition-all shadow-slate-200">
                             {isDispensing ? 'Processing...' : 'Authorize Dispense'}
                          </button>
                       </div>
                    </form>
                 </div>
              </motion.div>
            )}

            {activeTab === 'audit' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                 <div className="hospital-card p-10">
                    <h3 className="text-2xl font-black text-hospital-black tracking-tighter mb-8">Recent Pharmaceutical Flow</h3>
                    <div className="space-y-4">
                       {[
                         { action: 'Dispensed', item: 'Paracetamol', qty: 'x20', date: 'Just now', icon: TrendingDown, color: 'text-rose-500' },
                         { action: 'Stock In', item: 'Amoxicillin', qty: 'x500', date: '2h ago', icon: ArrowUpRight, color: 'text-emerald-500' },
                         { action: 'Dispensed', item: 'Insulin', qty: 'x2', date: '5h ago', icon: TrendingDown, color: 'text-rose-500' },
                       ].map((log, i) => (
                         <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all group">
                            <div className="flex items-center gap-5">
                               <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all", log.action === 'Stock In' ? 'bg-emerald-50' : 'bg-rose-50')}>
                                  <log.icon className={cn("w-5 h-5", log.color)} />
                               </div>
                               <div>
                                  <h4 className="text-sm font-black text-hospital-black italic">{log.action}: {log.item}</h4>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.qty} Units • Verified Signature</p>
                               </div>
                            </div>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{log.date}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </motion.div>
            )}
         </div>

         {/* Sidebar: Pharma Status */}
         <div className="lg:col-span-4 space-y-10">
            <div className="bg-hospital-black p-10 rounded-[4rem] text-white overflow-hidden relative shadow-2xl">
               <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from- emerald-500 via-transparent to-transparent pointer-events-none" />
               <DollarSign className="w-12 h-12 text-emerald-400 mb-8" />
               <h4 className="text-2xl font-black tracking-tight leading-snug">Current Medicine<br />Assets Value</h4>
               <div className="mt-8">
                  <p className="text-4xl font-black text-emerald-400 tracking-tighter">8,420,000</p>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-2">Valuated as of Today</p>
               </div>
               <div className="mt-10 pt-10 border-t border-white/10">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Inventory Health</span>
                     <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">94% Stable</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500" style={{ width: '94%' }} />
                  </div>
               </div>
            </div>

            <div className="hospital-card p-10 border border-emerald-100 shadow-emerald-50">
               <AlertTriangle className="w-10 h-10 text-rose-500 mb-8" />
               <h4 className="text-xl font-black text-hospital-black tracking-tight">Critical Re-order List</h4>
               <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Stock levels below minimum threshold</p>
               
               <div className="mt-8 space-y-6">
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-bold text-slate-600">Amoxicillin</span>
                     <span className="text-sm font-black text-rose-500 tabular-nums">85 / 100</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-bold text-slate-600">IV Saline 500ml</span>
                     <span className="text-sm font-black text-rose-500 tabular-nums">12 / 50</span>
                  </div>
               </div>

               <button className="w-full mt-10 py-5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-hospital-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                  Generate Re-order Sheet
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default PharmacyView;
