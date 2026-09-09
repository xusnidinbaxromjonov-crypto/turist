import { motion } from 'framer-motion';
import { Smartphone, Download, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const MobileAppSection = () => {
  const [isIframe, setIsIframe] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setIsIframe(window.self !== window.top);
  }, []);

  // If this component is being rendered inside the phone iframe itself, don't show it again
  // to avoid infinite recursion!
  if (isIframe) {
    return null;
  }

  return (
    <section className="py-24 bg-emerald-950 relative overflow-hidden text-white">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900 rounded-full blur-3xl opacity-20 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-800/50 text-gold-light font-medium text-sm mb-6 border border-emerald-700">
              <Smartphone size={18} />
              <span>{t('mobile.label')}</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 leading-tight">
              {t('mobile.title')}
            </h2>
            
            <p className="text-xl text-emerald-100/80 mb-8 leading-relaxed">
              {t('mobile.desc')}
            </p>

            <div className="space-y-4 mb-10">
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="text-gold-light shrink-0" size={24} />
                  <span className="text-lg">{t(`mobile.features.${idx}`)}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-emerald-800/50 border border-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-xl font-medium transition-colors flex items-center gap-3 opacity-70 cursor-not-allowed">
                <Download size={24} />
                <div className="text-left">
                  <div className="text-xs text-emerald-300">{t('mobile.comingSoon')}</div>
                  <div className="font-bold">App Store</div>
                </div>
              </button>
              <button className="bg-emerald-800/50 border border-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-xl font-medium transition-colors flex items-center gap-3 opacity-70 cursor-not-allowed">
                <Download size={24} />
                <div className="text-left">
                  <div className="text-xs text-emerald-300">{t('mobile.comingSoon')}</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center relative"
          >
            {/* Scaled container to maintain layout flow while keeping logical 390x844 size */}
            <div className="flex justify-center relative w-[273px] h-[591px]">
              {/* Phone Frame Mockup (iPhone 13 Pro style) */}
              <div className="absolute top-0 left-0 w-[390px] h-[844px] bg-black rounded-[3rem] p-3.5 shadow-2xl border-4 border-emerald-800 shadow-emerald-900/50 ring-4 ring-black transform scale-[0.7] origin-top-left">
                {/* Notch */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-3xl z-20 flex items-center justify-center gap-3 pb-1">
                  <div className="w-12 h-1.5 rounded-full bg-slate-800/80 shadow-inner" />
                  <div className="w-3 h-3 rounded-full bg-slate-900 shadow-inner ring-1 ring-white/10" />
                </div>
                
                {/* Screen Content */}
                <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden relative">
                  {/* Iframe to load the exact same site but mobile-sized */}
                  {!isIframe && (
                    <iframe 
                      src={`/?preview=true&lang=${i18n.language}`} 
                      className="w-full h-full border-0 absolute top-0 left-0"
                      title="Mobile App Preview"
                      style={{ pointerEvents: 'none' }} // Prevent scrolling/clicking inside to keep it looking like a preview
                    />
                  )}
                  {/* Overlay gradient to make it look like a mockup */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute top-20 -right-10 w-32 h-32 bg-gold/20 rounded-full blur-2xl" />
            <div className="absolute bottom-20 -left-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
