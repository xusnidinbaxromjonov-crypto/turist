import { CheckCircle, TrendingUp, BarChart3, Users, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const GovernmentSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-emerald-900/5">
      {/* Background Graphic */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-emerald-50/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm mb-6">
              <Landmark size={18} />
              <span>{t('gov.label')}</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-emerald-900 mb-6 leading-tight">
              {t('gov.title')}
            </h2>
            
            <p className="text-lg text-emerald-800/70 mb-8 leading-relaxed">
              {t('gov.desc')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                  <span className="text-emerald-900 font-medium">{t(`gov.features.${idx}`)}</span>
                </div>
              ))}
            </div>

            <button className="bg-emerald-900 hover:bg-emerald-800 text-white px-8 py-4 rounded-xl font-medium transition-colors shadow-lg shadow-emerald-900/20">
              {t('gov.btn')}
            </button>
          </div>

          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-emerald-950 rounded-3xl p-8 text-white shadow-2xl relative z-10"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-heading font-bold text-2xl mb-1">{t('gov.chart.title')}</h3>
                  <p className="text-emerald-400 text-sm">{t('gov.chart.subtitle')}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-800 flex items-center justify-center">
                  <TrendingUp className="text-gold-light" />
                </div>
              </div>

              {/* Line Chart */}
              <div className="h-48 relative mb-6 w-full pt-4">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Fill area */}
                  <motion.path
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    d="M 0 60 L 25 45 L 50 35 L 75 20 L 100 0 L 100 100 L 0 100 Z"
                    fill="url(#lineGradient)"
                    vectorEffect="non-scaling-stroke"
                  />
                  
                  {/* Line */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    d="M 0 60 L 25 45 L 50 35 L 75 20 L 100 0"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  
                  {/* Data points */}
                  {[
                    { cx: 0, cy: 60 },
                    { cx: 25, cy: 45 },
                    { cx: 50, cy: 35 },
                    { cx: 75, cy: 20 },
                    { cx: 100, cy: 0 }
                  ].map((point, idx) => (
                    <motion.circle
                      key={idx}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 + idx * 0.1 }}
                      cx={point.cx}
                      cy={point.cy}
                      r="5"
                      fill="#022c22"
                      stroke="#34d399"
                      strokeWidth="3"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </svg>

                {/* Tooltip on the last point */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 }}
                  className="absolute -top-4 -right-4 bg-white text-emerald-900 text-xs font-bold py-1.5 px-3 rounded-lg shadow-lg"
                >
                  +150%
                </motion.div>
              </div>

              <div className="flex justify-between text-emerald-400 text-sm font-medium border-t border-emerald-800 pt-4">
                <span>{t('gov.chart.q1')}</span>
                <span>{t('gov.chart.q2')}</span>
                <span>{t('gov.chart.q3')}</span>
                <span>{t('gov.chart.q4')}</span>
                <span>{t('gov.chart.nextYear')}</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
