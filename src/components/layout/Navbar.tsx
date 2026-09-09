import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Menu, X, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'uz' ? 'ru' : 'uz';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('navbar.home', 'Bosh sahifa'), path: '/' },
    { name: t('navbar.places', 'Joylar'), path: '/#joylar' },
    { name: t('navbar.routes', 'Marshrutlar'), path: '/#marshrutlar' },
    { name: t('navbar.companions', 'Hamroh qidirish'), path: '/hamroh' },
    { name: t('navbar.chat', 'Chat'), path: '/messenger' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-emerald-900/95 backdrop-blur-md shadow-lg pt-12 pb-3 md:py-3' : 'bg-transparent pt-14 pb-5 md:py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white group">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-lg shadow-emerald-900/20 group-hover:scale-105 transition-transform flex items-center justify-center p-1">
            <img src="/logo.png" alt="Farg'ona Tourism Logo" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          <div>
            <h1 className="text-lg font-heading font-bold leading-none tracking-wider m-0">FARG'ONA</h1>
            <span className="text-[10px] tracking-widest uppercase opacity-80">Tourism</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            link.path.startsWith('/#') || link.path.startsWith('#') ? (
              <a
                key={link.name}
                href={link.path}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            )
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-white text-sm font-medium hover:text-emerald-300 transition-colors"
          >
            <Globe size={16} />
            <span className="uppercase">{i18n.language}</span>
          </button>
          
          {user ? (
            <div className="flex items-center gap-4 ml-2">
              <div className="flex items-center gap-2 bg-black/20 pl-2 pr-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full border border-white/30" />
                <span className="text-sm font-medium text-white">{user.name}</span>
              </div>
              <button 
                onClick={logout}
                className="text-white/70 hover:text-white transition-colors"
                title="Chiqish"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-5 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-colors ml-2"
            >
              {t('navbar.login', 'Kirish / Ro\'yxatdan o\'tish')}
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-emerald-900/95 backdrop-blur-md border-t border-white/10 p-4 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-white/80 hover:text-white text-base font-medium p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="h-px bg-white/10 my-2" />
          
          {user ? (
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center gap-3">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-white/30" />
                <span className="font-medium text-white">{user.name}</span>
              </div>
              <button 
                onClick={logout}
                className="text-white/70 hover:text-white p-2"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAuthModalOpen(true);
              }}
              className="bg-emerald-700 text-white px-5 py-3 rounded-lg text-sm font-medium w-full"
            >
              {t('navbar.login', 'Kirish / Ro\'yxatdan o\'tish')}
            </button>
          )}
        </div>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </motion.header>
  );
};
