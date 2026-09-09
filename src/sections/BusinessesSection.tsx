import { ArrowRight, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RAW_BUSINESSES as BUSINESSES } from '../data/mockData';
import { useTranslation } from 'react-i18next';

export const BusinessesSection = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language as 'uz' | 'ru') || 'uz';
  return (
    <section id="bizneslar" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-medium tracking-widest uppercase text-xs mb-3">
              <span>{t('bizSection.label')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-emerald-900 mb-4">
              {t('bizSection.title')}
            </h2>
            <p className="text-emerald-800/70 max-w-2xl text-lg">
              {t('bizSection.desc')}
            </p>
          </div>
          <Link to="/biznes/1" className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-full border border-emerald-900/20 text-emerald-900 hover:bg-emerald-50 transition-colors duration-300 font-medium group">
            {t('bizSection.viewAll')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide mb-8">
          {[0, 1, 2, 3, 4, 5].map((catId) => (
            <button 
              key={catId}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                catId === 0 
                  ? 'bg-emerald-900 text-white' 
                  : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              {t(`bizSection.cats.${catId}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {BUSINESSES.map((biz) => (
            <div key={biz.id} className="group bg-sand rounded-2xl overflow-hidden border border-emerald-900/5 hover:border-emerald-900/10 hover:shadow-lg hover:shadow-emerald-900/5 transition-all duration-300 flex flex-col">
              <Link to={`/biznes/${biz.id}`} className="block h-48 overflow-hidden relative shrink-0">
                <img 
                  src={biz.image} 
                  alt={biz.name[lang]} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </Link>
              <div className="p-5 flex-1 flex flex-col">
                <Link to={`/biznes/${biz.id}`} className="font-bold text-lg font-heading text-emerald-900 mb-1 hover:text-emerald-700 transition-colors inline-block">{biz.name[lang]}</Link>
                <div className="flex items-center gap-2 text-sm text-emerald-800/60 mb-4">
                  <span className="bg-emerald-100 px-2 py-0.5 rounded text-emerald-700 font-medium text-xs">
                    {biz.category[lang]}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-medium">
                    <Star size={14} className="fill-amber-500" />
                    {biz.rating}
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 text-emerald-800/60 text-sm mb-5">
                  <MapPin size={14} />
                  <span>{biz.location[lang]}</span>
                </div>
                
                <div className="flex gap-2 mt-auto">
                  <Link to={`/biznes/${biz.id}`} className="flex-1 border border-emerald-900/20 text-emerald-900 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors text-center">
                    {t('bizSection.view')}
                  </Link>
                  <button className="flex-1 bg-emerald-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors">
                    {t('bizSection.route')}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* CTA Card */}
          <div className="bg-emerald-900 rounded-2xl p-6 text-white flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-emerald-800 transition-colors">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
              <div className="w-8 h-8 border-2 border-white/50 rounded flex items-center justify-center">
                <span className="text-xl font-bold text-white/50">+</span>
              </div>
            </div>
            <h4 className="font-bold font-heading text-xl mb-3">{t('bizSection.ctaTitle')}</h4>
            <p className="text-emerald-100/70 text-sm mb-6">{t('bizSection.ctaDesc')}</p>
            <button className="bg-white text-emerald-900 px-6 py-2.5 rounded-lg text-sm font-medium w-full flex justify-center items-center gap-2">
              {t('bizSection.ctaBtn')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
