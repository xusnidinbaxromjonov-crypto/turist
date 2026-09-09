import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const reasons = [
  {
    id: '01',
    title: 'Tabiat',
    desc: 'O\'zbekistonning eng toza havoli va so\'lim tabiatli maskanlaridan biri. Betakror tog\' manzaralari va yashil vodiylar.',
    image: '/tabiat_q.png'
  },
  {
    id: '02',
    title: 'Madaniyat',
    desc: 'Ko\'p millatli shahar bo\'lib, o\'zbek, tojik, qirg\'iz va boshqa millatlar madaniyati uyg\'unlashgan yagona nuqta.',
    image: '/madaniyat_q.png'
  },
  {
    id: '03',
    title: 'Mahalliy hayot',
    desc: 'Samimiy odamlar, an\'anaviy bozorlar va haqiqiy Farg\'ona mehmondo\'stligi.',
    image: '/mahalliy_hayot_q.png'
  },
  {
    id: '04',
    title: 'Yangi turizm imkoniyatlari',
    desc: 'Rivojlanayotgan eko-turizm, agro-turizm va ekstremal sport turlari uchun ajoyib hudud.',
    image: '/yangi_turizm_q.png'
  },
  {
    id: '05',
    title: 'Raqamli turizm',
    desc: 'Zamonaviy IT yechimlari bilan integratsiyalashgan aqlli shahar sayohati.',
    image: '/raqamli_turizm_q.png'
  }
];

export const WhyFargonaSection = () => {
  const containerRef = useRef(null);
  const { t } = useTranslation();

  return (
    <section ref={containerRef} className="py-32 bg-sand relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-bold font-heading text-emerald-900 mb-6">
            {t('why.title')}
          </h2>
          <p className="text-emerald-800/80 text-xl font-medium">
            {t('why.subtitle')}
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {reasons.map((reason, idx) => {
            const isEven = idx % 2 === 1;
            
            return (
              <div 
                key={reason.id} 
                className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-20`}
              >
                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="flex-1 w-full"
                >
                  <div className="text-6xl md:text-8xl font-black font-heading text-emerald-900/5 mb-4">
                    {reason.id}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold font-heading text-emerald-900 mb-4">
                    {t(`why.items.${reason.id}.title`)}
                  </h3>
                  <p className="text-lg text-emerald-800/70 leading-relaxed">
                    {t(`why.items.${reason.id}.desc`)}
                  </p>
                </motion.div>

                {/* Image */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="flex-1 w-full"
                >
                  <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] group">
                    <motion.div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${reason.image})` }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                    />
                    <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
