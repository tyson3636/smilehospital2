import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Mail, 
  Lock,
  Zap,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { APP_CONFIG } from '../constants';

const LoginView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network latency
    setTimeout(() => {
      login(email);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-blue/5 blur-[120px] rounded-full" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-hospital-black/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[4rem] shadow-2xl relative z-10 overflow-hidden border border-white">
        {/* Left Side: Brand & Visuals */}
        <div className="bg-hospital-black p-12 lg:p-20 text-white flex flex-col justify-between relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-blue via-transparent to-transparent" />
           </div>

           <div className="relative z-10">
              <div className="flex items-center gap-4 mb-16">
                 <div className="w-16 h-16 bg-primary-blue rounded-[1.8rem] flex items-center justify-center shadow-[0_0_50px_rgba(0,96,169,0.3)]">
                    <img src={APP_CONFIG.logoUrl} alt={APP_CONFIG.name} className="w-9 h-9 object-contain" referrerPolicy="no-referrer" />
                 </div>
                 <h1 className="text-4xl font-black tracking-tighter">{APP_CONFIG.name}</h1>
              </div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                 <h2 className="text-6xl font-black leading-none tracking-tighter max-w-md">
                    Operating <span className="text-primary-blue">The Future</span> of Care.
                 </h2>
                 <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-xs max-w-xs leading-relaxed">
                    {APP_CONFIG.description}
                 </p>
              </motion.div>
           </div>

           <div className="relative z-10 pt-20">
              <div className="flex items-center gap-6 mb-8">
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                       <div key={i} className="w-10 h-10 rounded-full border-2 border-hospital-black bg-slate-800 overflow-hidden shadow-xl">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Staff${i}`} alt="user" />
                       </div>
                    ))}
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-primary-blue">Joined by 200+ Specialists</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm">
                    <ShieldCheck className="w-6 h-6 text-primary-blue mb-2" />
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Security</p>
                    <p className="text-xs font-bold">256-bit AES</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm">
                    <Zap className="w-6 h-6 text-amber-400 mb-2" />
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Uptime</p>
                    <p className="text-xs font-bold">99.9% Online</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-12 lg:p-24 flex flex-col justify-center">
           <div className="mb-12">
              <h3 className="text-4xl font-black text-hospital-black tracking-tighter mb-2">Karibu Tena.</h3>
              <p className="text-slate-400 text-sm font-medium">Ingia kwenye mfumo wa {APP_CONFIG.name} kuendelea.</p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                 <div className="space-y-2 group">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Email address</label>
                    <div className="relative">
                       <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary-blue transition-colors" />
                       <input 
                        type="email" 
                        required
                        placeholder="emmanueltyson36@gmail.com"
                        className="w-full pl-16 pr-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-bold tracking-tight outline-none focus:ring-4 focus:ring-primary-blue/10 transition-all placeholder:text-slate-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                       />
                    </div>
                 </div>

                 <div className="space-y-2 group">
                    <div className="flex justify-between items-center px-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Password</label>
                       <button type="button" className="text-[10px] font-black text-primary-blue uppercase tracking-widest hover:underline">Forgot?</button>
                    </div>
                    <div className="relative">
                       <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary-blue transition-colors" />
                       <input 
                        type="password" 
                        required
                        placeholder="••••••••"
                        className="w-full pl-16 pr-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-bold tracking-tight outline-none focus:ring-4 focus:ring-primary-blue/10 transition-all placeholder:text-slate-300 font-mono"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                       />
                    </div>
                 </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-hospital-black text-white h-20 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-primary-blue transition-all shadow-2xl shadow-slate-200 group relative overflow-hidden"
              >
                 {isSubmitting ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full"
                    />
                 ) : (
                    <>
                       <span>Authorize Entry</span>
                       <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </>
                 )}
              </button>
           </form>

           <div className="mt-16 flex items-center justify-between pt-12 border-t border-slate-50">
              <div className="flex items-center gap-2">
                 <ShieldCheck className="w-5 h-5 text-emerald-500" />
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{APP_CONFIG.name} Secured <br />Encryption Core</p>
              </div>
              <button className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-hospital-black transition-colors">
                 Support Hub <ExternalLink className="w-3 h-3" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
