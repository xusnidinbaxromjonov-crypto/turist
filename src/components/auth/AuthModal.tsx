import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const displayName = isLogin ? (email.split('@')[0] || 'Sayohatchi') : (name || 'Sayohatchi');
      login(displayName, email);
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden"
          >
            {/* Header Image Area */}
            <div className="h-40 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/tabiat_q.png')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/90 hover:text-white bg-black/30 hover:bg-black/50 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors z-10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-8">
              <div className="flex gap-4 mb-8 border-b border-emerald-100 pb-px">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 pb-3 text-sm font-bold transition-colors relative ${
                    isLogin ? 'text-emerald-900' : 'text-emerald-900/40'
                  }`}
                >
                  Kirish
                  {isLogin && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />}
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 pb-3 text-sm font-bold transition-colors relative ${
                    !isLogin ? 'text-emerald-900' : 'text-emerald-900/40'
                  }`}
                >
                  Ro'yxatdan o'tish
                  {!isLogin && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-xs font-bold text-emerald-900/60 uppercase tracking-wider mb-2">Ism va Familiya</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-900/40">
                        <User size={18} />
                      </div>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-emerald-900"
                        placeholder="Azizbek Aliyev"
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-xs font-bold text-emerald-900/60 uppercase tracking-wider mb-2">Email manzil</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-900/40">
                      <Mail size={18} />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-emerald-900"
                      placeholder="azizbek@misol.uz"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-900/60 uppercase tracking-wider mb-2">Parol</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-900/40">
                      <Lock size={18} />
                    </div>
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-emerald-900"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-medium py-3.5 rounded-xl transition-colors shadow-lg shadow-emerald-900/20 mt-6 relative overflow-hidden"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
                  ) : (
                    isLogin ? 'Tizimga kirish' : 'Ro\'yxatdan o\'tish'
                  )}
                </button>
              </form>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
