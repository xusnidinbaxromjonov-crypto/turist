import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RAW_ROUTES as ROUTES } from '../data/mockData';
import { useTranslation } from 'react-i18next';

export const RoutesSection = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language as 'uz' | 'ru') || 'uz';
  const featuredRoute = ROUTES.find(r => r.featured);
  const regularRoutes = ROUTES.filter(r => !r.featured);

  return (
    <section id="marshrutlar" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-medium tracking-widest uppercase text-xs mb-3">
              <span>{t('routes.label')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-emerald-900 mb-4">
              {t('routes.title')}
            </h2>
            <p className="text-emerald-800/70 max-w-2xl text-lg">
              {t('routes.desc')}
            </p>
          </div>
          <Link to="/marshrut/1" className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-full border border-emerald-900/20 text-emerald-900 hover:bg-emerald-50 transition-colors duration-300 font-medium group">
            {t('routes.viewAll')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Featured Route */}
          {featuredRoute && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative rounded-3xl overflow-hidden group h-[400px] lg:h-auto min-h-[450px]"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${featuredRoute.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent opacity-90" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="bg-white/20 backdrop-blur-md w-fit px-4 py-1.5 rounded-full text-sm font-medium mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {t('routes.recommended')}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold font-heading mb-3">
                  {featuredRoute.title[lang]}
                </h3>
                
                <div className="flex flex-wrap items-center gap-4 mb-8 text-emerald-100/90 text-sm font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} />
                    <span>{featuredRoute.places[lang]}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-emerald-100/50" />
                  <div className="flex items-center gap-1.5">
                    <Navigation size={16} />
                    <span>{featuredRoute.distance?.[lang]}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-emerald-100/50" />
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} />
                    <span>{featuredRoute.duration[lang]}</span>
                  </div>
                </div>
                
                <Link to={`/marshrut/${featuredRoute.id}`} className="w-full bg-white text-emerald-900 py-4 rounded-xl font-medium hover:bg-emerald-50 transition-colors flex items-center justify-between px-6 group/btn">
                  {t('routes.viewRoute')}
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center group-hover/btn:bg-emerald-200 transition-colors">
                    <ArrowRight size={16} className="text-emerald-900 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Regular Routes Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {regularRoutes.map((route, idx) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer bg-sand rounded-2xl p-3 border border-emerald-900/5 hover:border-emerald-900/10 hover:shadow-lg hover:shadow-emerald-900/5 transition-all duration-300"
              >
                <Link to={`/marshrut/${route.id}`} className="block h-48 rounded-xl overflow-hidden mb-4 relative">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${route.image})` }}
                  />
                  <div className="absolute inset-0 bg-emerald-900/20 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-emerald-900 shadow-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowRight size={18} className="-rotate-45" />
                  </div>
                </Link>
                
                <div className="px-2 pb-2">
                  <Link to={`/marshrut/${route.id}`} className="font-heading font-bold text-lg text-emerald-900 mb-2 hover:text-emerald-700 transition-colors inline-block">
                    {route.title[lang]}
                  </Link>
                  
                  <div className="flex items-center gap-3 text-emerald-800/60 text-xs font-medium">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{route.places[lang]}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-emerald-900/20" />
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{route.duration[lang]}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
