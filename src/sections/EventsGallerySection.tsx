import { Calendar, MapPin, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';
import { RAW_EVENTS as EVENTS } from '../data/mockData';
import { useTranslation } from 'react-i18next';

const gallery = [
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=600&auto=format&fit=crop"
];

export const EventsGallerySection = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language as 'uz' | 'ru') || 'uz';

  return (
    <section id="tadbirlar" className="py-24 bg-sand relative border-t border-emerald-900/5">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Events Section */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 font-medium tracking-widest uppercase text-xs mb-3">
                <Calendar size={16} />
                <span>{t('events.label')}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-emerald-900 mb-4">
                {t('events.title')}
              </h2>
              <p className="text-emerald-800/70 max-w-2xl text-lg">
                {t('events.desc')}
              </p>
            </div>
            <button className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-full border border-emerald-900/20 text-emerald-900 hover:bg-emerald-50 transition-colors duration-300 font-medium group">
              {t('events.viewAll')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EVENTS.map((event: any, idx) => {
              const eventDate = event.date[lang] || event.date;
              return (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={`/tadbir/${event.id}`} className="block bg-white rounded-2xl overflow-hidden border border-emerald-900/5 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 group cursor-pointer h-full">
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg z-10 text-emerald-900 font-bold text-sm shadow-sm">
                      {eventDate.split(' ')[0]} <span className="font-medium text-emerald-700">{eventDate.split(' ')[1]?.replace(',', '')}</span>
                    </div>
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold font-heading text-xl text-emerald-900 mb-2">{event.title[lang] || event.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-emerald-800/60 mb-4 font-medium">
                      <MapPin size={14} />
                      <span>{event.location[lang] || event.location}</span>
                    </div>
                    <p className="text-emerald-800/70 text-sm mb-6 line-clamp-2">
                      {event.desc[lang] || event.desc}
                    </p>
                    <div className="flex items-center justify-between border-t border-emerald-50 pt-4 mt-auto">
                      <span className="text-emerald-600 font-medium text-sm group-hover:underline">{t('events.viewDetails')}</span>
                      <ArrowRight size={16} className="text-emerald-600 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}
            )}
          </div>
        </div>

        {/* Photo Gallery Section */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 font-medium tracking-widest uppercase text-xs mb-3">
                <ImageIcon size={16} />
                <span>{t('events.galleryLabel')}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-emerald-900 mb-4">
                {t('events.galleryTitle')}
              </h2>
            </div>
            <div className="flex gap-2 text-sm font-medium">
              {[0, 1, 2, 3].map((i) => (
                <button key={i} className={`px-4 py-2 rounded-full border ${i === 0 ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-transparent text-emerald-900 border-emerald-900/20 hover:bg-emerald-50'}`}>
                  {t(`events.galleryCats.${i}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {gallery.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl overflow-hidden relative group cursor-pointer ${
                  i === 0 ? 'col-span-2 row-span-2' : 
                  i === 3 ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1'
                }`}
              >
                <img 
                  src={img} 
                  alt="Gallery image" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40">
                    <ImageIcon size={20} />
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
