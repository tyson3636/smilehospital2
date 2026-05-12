import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Building2, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  Search,
  Activity,
  ShieldCheck,
  Stethoscope,
  Pill,
  History,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { StaffRole } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { APP_CONFIG } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const getDeptIcon = (id: string) => {
  switch (id.toUpperCase()) {
    case 'PHA': return Pill;
    case 'REC': return MessageSquare;
    case 'LAB': return Activity;
    case 'RAD': return Stethoscope;
    case 'IT': return ShieldCheck;
    case 'ADM': return Building2;
    default: return Building2;
  }
};

const Layout: React.FC<LayoutProps> = ({ children, activeSection, onSectionChange }) => {
  const { user, logout, departments, notifications } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const myNotifications = notifications.filter(n => 
    n.recipientId === user?.id || 
    (n.recipientId === 'FINANCE' && (user?.role === StaffRole.ADMIN || user?.dept?.toLowerCase().includes('billing') || user?.dept?.toLowerCase().includes('accounts')))
  );

  const coreItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    ...(user?.role === StaffRole.DOCTOR || user?.role === StaffRole.ADMIN ? [{ id: 'doctor', label: 'Doctor Hub', icon: Stethoscope }] : []),
    ...(user?.role === StaffRole.NURSE || user?.role === StaffRole.ADMIN || user?.dept === 'Reception & Triages' ? [{ id: 'reception', label: 'Reception', icon: MessageSquare }] : [])
  ];

  const hospitalUnits = [
    { id: 'billing', label: 'Accounts & Finance', icon: CreditCard },
    { id: 'pha', label: 'Pharmacy (Idara ya Dawa)', icon: Pill },
    { id: 'hr', label: 'HR Office (Staff)', icon: Activity },
    ...departments.filter(d => !['HR', 'BIL', 'PHA'].includes(d.id.toUpperCase())).map(dept => ({
      id: dept.id.toLowerCase(),
      label: dept.name,
      icon: getDeptIcon(dept.id)
    }))
  ];

  const utilityItems = [
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'schedules', label: 'Shift Schedules', icon: Calendar },
    { id: 'emergency', label: 'Emergency Hub', icon: AlertCircle },
  ];

  const renderMenuItem = (item: { id: string; label: string; icon: any }) => (
    <button
      key={item.id}
      onClick={() => {
        onSectionChange(item.id);
        setIsMobileMenuOpen(false);
      }}
      className={cn(
        "w-full flex items-center gap-4 px-6 py-3.5 rounded-[2rem] transition-all duration-300 relative group text-left",
        activeSection === item.id 
          ? "bg-hospital-black text-white shadow-xl shadow-slate-200" 
          : "text-slate-400 hover:bg-slate-50 hover:text-hospital-black"
      )}
    >
      <item.icon className={cn(
        "w-5 h-5 transition-colors shrink-0",
        activeSection === item.id ? "text-primary-blue" : "group-hover:text-primary-blue"
      )} />
      <span className="text-[11px] font-black tracking-widest uppercase truncate">{item.label}</span>
      {activeSection === item.id && (
        <motion.div 
          layoutId="active-indicator"
          className="absolute right-4 w-1.5 h-1.5 rounded-full bg-primary-blue shadow-[0_0_10px_rgba(0,96,169,0.5)]" 
        />
      )}
    </button>
  );

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-80 bg-white border-r border-slate-50 relative z-30">
        <div className="p-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 bg-hospital-black rounded-[1.8rem] flex items-center justify-center shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-primary-blue/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
               <img src={APP_CONFIG.logoUrl} alt={APP_CONFIG.name} className="w-8 h-8 object-contain relative z-10" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-hospital-black tracking-tighter leading-none">{APP_CONFIG.name}</h1>
              <p className="text-[10px] font-black text-primary-blue uppercase tracking-[0.2em] mt-1">{APP_CONFIG.tagline}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-8 overflow-y-auto custom-scrollbar py-4">
          <div>
             <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] px-6 mb-4">Navigation</p>
             <div className="space-y-1.5">
                {coreItems.map(renderMenuItem)}
             </div>
          </div>

          <div>
             <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] px-6 mb-4">Operations & Units</p>
             <div className="space-y-1.5">
                {hospitalUnits.map(renderMenuItem)}
             </div>
          </div>

          <div>
             <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] px-6 mb-4">Patient Care</p>
             <div className="space-y-1.5">
                {utilityItems.map(renderMenuItem)}
             </div>
          </div>
        </nav>

        <div className="px-6 py-10 space-y-2 border-t border-slate-50">
          {bottomItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all duration-300",
                activeSection === item.id 
                  ? "bg-slate-50 text-hospital-black" 
                  : "text-slate-400 hover:bg-slate-50 hover:text-hospital-black"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-bold tracking-tight">{item.label}</span>
            </button>
          ))}
          <button
            onClick={logout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] text-rose-500 hover:bg-rose-50 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-bold tracking-tight">System Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-50 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="lg:hidden p-3 bg-slate-50 rounded-2xl text-hospital-black"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex items-center gap-3 bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-3 w-80 max-w-md focus-within:ring-4 focus-within:ring-primary-blue/10 transition-all group">
              <Search className="w-4 h-4 text-slate-300 group-focus-within:text-primary-blue transition-colors" />
              <input 
                type="text" 
                placeholder="Global System Search..." 
                className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-slate-300"
              />
              <span className="text-[10px] font-black text-slate-300 border border-slate-200 px-2 py-0.5 rounded-lg">⌘K</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden sm:flex items-center gap-4 pr-6 border-r border-slate-100">
                <div className="text-right">
                   <p className="text-xs font-black text-hospital-black tracking-tight">{user?.name}</p>
                   <p className="text-[9px] font-black text-primary-blue uppercase tracking-widest">{user?.role} • {user?.dept || 'HQ'}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-hospital-black p-0.5 shadow-xl">
                   <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                    alt="user" 
                    className="w-full h-full rounded-[0.9rem] object-cover"
                   />
                </div>
             </div>
             
             <button 
                onClick={() => {
                   if (user?.role === StaffRole.DOCTOR || user?.role === StaffRole.ADMIN) {
                      onSectionChange('doctor');
                   } else if (user?.dept?.toLowerCase().includes('billing') || user?.dept?.toLowerCase().includes('accounts')) {
                      onSectionChange('billing');
                   }
                }}
                className="relative p-4 bg-white border border-slate-50 rounded-[1.2rem] shadow-sm hover:shadow-md transition-all group"
             >
                <Bell className={cn("w-5 h-5 transition-colors", myNotifications.length > 0 ? "text-rose-500 animate-pulse" : "text-slate-400 group-hover:text-hospital-black")} />
                {myNotifications.length > 0 && (
                   <span className="absolute top-3 right-3 w-4 h-4 bg-rose-500 border-2 border-white rounded-full text-[8px] font-black text-white flex items-center justify-center">
                      {myNotifications.length}
                   </span>
                )}
             </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-12">
          {children}
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-hospital-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-80 bg-white p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-hospital-black rounded-2xl flex items-center justify-center">
                    <img src={APP_CONFIG.logoUrl} alt={APP_CONFIG.name} className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <h1 className="text-2xl font-black text-hospital-black tracking-tighter">{APP_CONFIG.name}</h1>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-8 h-8 text-slate-400" />
                </button>
              </div>

              <nav className="flex-1 space-y-8 overflow-y-auto custom-scrollbar py-4">
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 px-4">Navigation</p>
                   <div className="space-y-1">
                      {coreItems.map(renderMenuItem)}
                   </div>
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 px-4">Operations & Units</p>
                   <div className="space-y-1">
                      {hospitalUnits.map(renderMenuItem)}
                   </div>
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 px-4">Patient Care</p>
                   <div className="space-y-1">
                      {utilityItems.map(renderMenuItem)}
                   </div>
                </div>
              </nav>

              <div className="mt-auto pt-10 border-t border-slate-50">
                 <button onClick={logout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-rose-500 hover:bg-rose-50">
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-bold">Logout</span>
                 </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
