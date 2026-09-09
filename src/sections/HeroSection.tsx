import { motion } from 'framer-motion';
import { ArrowRight, Mountain, Landmark, Store, QrCode } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image & Subtle Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/hero-bg.png")' }} 
      />
      {/* Faqatgina matn o'qilishi uchun juda yengil soya qoldiramiz, rasm tiniq turadi */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/40 via-transparent to-transparent w-2/3" />
      <div className="absolute bottom-0 inset-x-0 h-32 z-0 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between mt-20">
        
        {/* Left Content */}
        <div className="flex flex-col items-start text-left max-w-2xl w-full">


          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold font-heading text-white mb-2 drop-shadow-xl tracking-tight"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="text-2xl md:text-4xl font-medium text-white mb-6 leading-snug drop-shadow-md"
          >
            {t('hero.subtitle')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="text-white/90 text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
          >
            {t('hero.desc')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a href="#marshrutlar" className="bg-emerald-700 hover:bg-emerald-600 text-white pl-2 pr-6 py-2 rounded-full font-medium transition-all flex items-center justify-center gap-3 border border-emerald-600/50 shadow-lg group">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-800 transition-transform group-hover:scale-105">
                <ArrowRight size={20} />
              </div>
              <span>{t('hero.startJourney')}</span>
            </a>
            <a href="#joylar" className="bg-transparent hover:bg-white/10 text-white border border-white/40 px-8 py-3 rounded-full font-medium transition-all flex items-center backdrop-blur-sm">
              {t('hero.explorePlaces')}
            </a>
          </motion.div>
        </div>

        {/* Right Content - Decorative Route */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="hidden lg:block relative h-64 w-80"
        >
          <div className="absolute top-0 right-0 text-white font-heading text-xl md:text-2xl italic tracking-wide text-right drop-shadow-md opacity-90 transform -rotate-3">
            {t('hero.decorative1')}<br/>{t('hero.decorative2')}
          </div>
          
          {/* Dashed line SVG */}
          <svg className="absolute top-16 right-4 w-64 h-32 overflow-visible" viewBox="0 0 200 100">
            <path 
              d="M 180,10 C 150,30 100,-10 50,40 C 20,70 80,90 20,80" 
              fill="transparent" 
              stroke="rgba(255,255,255,0.6)" 
              strokeWidth="2" 
              strokeDasharray="6 6" 
              strokeLinecap="round"
            />
            {/* Start Pin */}
            <g transform="translate(180, 10)">
              <circle cx="0" cy="0" r="12" fill="none" stroke="white" strokeWidth="2"/>
              <path d="M-4,-4 L4,4 M-4,4 L4,-4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </g>
            {/* End Pin */}
            <g transform="translate(20, 80)">
              <circle cx="0" cy="0" r="14" fill="none" stroke="white" strokeWidth="2"/>
              <path d="M-5,-5 L0,-10 L5,-5 M0,-10 L0,5" stroke="white" strokeWidth="2" strokeLinecap="round" transform="rotate(45)"/>
            </g>
          </svg>
        </motion.div>

      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-8 left-0 right-0 z-20 container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-end justify-between gap-6">
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col items-center gap-2 text-white/70 mx-auto md:mx-0"
        >
          <span className="text-[10px] tracking-widest uppercase font-medium">{t('hero.scrollDown')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <div className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center pt-1.5">
              <div className="w-1 h-1.5 bg-white rounded-full" />
            </div>
          </motion.div>
        </motion.div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="hidden md:flex items-center gap-8 text-white/90 text-sm font-medium backdrop-blur-sm bg-black/20 px-8 py-4 rounded-2xl border border-white/10"
        >
          <a href="#joylar" className="flex items-center gap-2 hover:text-gold-light transition-colors group">
            <Mountain size={18} className="group-hover:-translate-y-1 transition-transform" />
            <span>{t('hero.categories.nature')}</span>
          </a>
          <a href="#tarix" className="flex items-center gap-2 hover:text-gold-light transition-colors group">
            <Landmark size={18} className="group-hover:-translate-y-1 transition-transform" />
            <span>{t('hero.categories.history')}</span>
          </a>
          <a href="#bizneslar" className="flex items-center gap-2 hover:text-gold-light transition-colors group">
            <Store size={18} className="group-hover:-translate-y-1 transition-transform" />
            <span>{t('hero.categories.business')}</span>
          </a>
          <a href="#raqamli" className="flex items-center gap-2 hover:text-gold-light transition-colors group">
            <QrCode size={18} className="group-hover:-translate-y-1 transition-transform" />
            <span>{t('hero.categories.digital')}</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};
