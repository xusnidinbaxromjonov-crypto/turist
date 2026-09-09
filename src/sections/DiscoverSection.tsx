import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const discoverItems = [
  {
    id: 1,
    title: 'Tabiat',
    desc: 'Toza havo va betakror manzaralar',
    image: '/tabiat_q.png',
    icon: '🏔️',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-1'
  },
  {
    id: 2,
    title: 'Tog\'lar va manzaralar',
    desc: 'Ochiq osmon ostidagi go\'zallik',
    image: '/foto_tur_q.png',
    icon: '⛰️',
    colSpan: 'col-span-1'
  },
  {
    id: 3,
    title: 'Shahar tarixi',
    desc: 'O\'tmishdan kelajak sari',
    image: '/madaniyat_q.png',
    icon: '🏛️',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-2'
  },
  {
    id: 4,
    title: 'Milliy taomlar',
    desc: 'Mazali an\'anaviy taomlar',
    image: '/asal_haqiqiy.png',
    icon: '🥘',
    colSpan: 'col-span-1 lg:col-span-1'
  },
  {
    id: 5,
    title: 'Mahalliy hayot',
    desc: 'Sodda va samimiy odamlar',
    image: '/mahalliy_hayot_q.png',
    icon: '🤝',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-1'
  },
  {
    id: 6,
    title: 'Oilaviy dam olish',
    desc: 'Barchangiz uchun qulay sharoit',
    image: '/velomarafon_q.png',
    icon: '👨‍👩‍👧‍👦',
    colSpan: 'col-span-1 lg:col-span-2'
  }
];

export const DiscoverSection = () => {
  const { t } = useTranslation();
  return (
    <section id="joylar" className="py-24 bg-emerald-950 text-white">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">
              {t('discover.title')}
            </h2>
            <p className="text-emerald-100/70 text-lg">
              {t('discover.desc')}
            </p>
          </div>
          <Link to="/joy/1" className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-emerald-950 transition-colors duration-300 font-medium group">
            {t('discover.viewAll')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
          {discoverItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${item.colSpan}`}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Content wrapped in Link */}
              <Link to={`/joy/${item.id > 4 ? 1 : item.id}`} className="absolute inset-0 z-10">
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-xl mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold font-heading mb-1 text-white group-hover:-translate-y-1 transition-transform duration-300">
                    {t(`discover.items.${item.id}.title`)}
                  </h3>
                  <p className="text-emerald-100/80 text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                    {t(`discover.items.${item.id}.desc`)}
                  </p>
                  
                  {/* Explore button that appears on hover */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                    <div className="w-10 h-10 rounded-full bg-white text-emerald-950 flex items-center justify-center">
                      <ArrowRight size={18} className="-rotate-45" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
