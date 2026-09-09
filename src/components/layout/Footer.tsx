import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-sand border-t border-emerald-900/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-emerald-900 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-lg shadow-emerald-900/10 flex items-center justify-center p-1">
                <img src="/logo.png" alt="Farg'ona Tourism Logo" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold leading-none tracking-wider text-emerald-900 m-0">FARG'ONA</h2>
                <span className="text-[10px] tracking-widest uppercase text-emerald-700">Tourism</span>
              </div>
            </Link>
            <p className="text-emerald-800/80 text-sm mb-6 font-medium italic">
              {t('footer.slogan')}
            </p>
            <p className="text-emerald-900/60 text-xs leading-relaxed max-w-xs">
              {t('footer.desc')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-bold text-emerald-900 mb-4">{t('footer.discover')}</h4>
            <ul className="space-y-3">
              <li><a href="#joylar" className="text-sm text-emerald-800/70 hover:text-emerald-600 transition-colors">{t('footer.links.places')}</a></li>
              <li><a href="#marshrutlar" className="text-sm text-emerald-800/70 hover:text-emerald-600 transition-colors">{t('footer.links.routes')}</a></li>
              <li><a href="#xarita" className="text-sm text-emerald-800/70 hover:text-emerald-600 transition-colors">{t('footer.links.map')}</a></li>
              <li><a href="#bizneslar" className="text-sm text-emerald-800/70 hover:text-emerald-600 transition-colors">{t('footer.links.businesses')}</a></li>
              <li><a href="#tadbirlar" className="text-sm text-emerald-800/70 hover:text-emerald-600 transition-colors">{t('footer.links.events')}</a></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-heading font-bold text-emerald-900 mb-4">{t('footer.info')}</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-emerald-800/70 hover:text-emerald-600 transition-colors">{t('footer.infoLinks.about')}</Link></li>
              <li><Link to="/contact" className="text-sm text-emerald-800/70 hover:text-emerald-600 transition-colors">{t('footer.infoLinks.contact')}</Link></li>
              <li><Link to="/faq" className="text-sm text-emerald-800/70 hover:text-emerald-600 transition-colors">{t('footer.infoLinks.faq')}</Link></li>
              <li><Link to="/terms" className="text-sm text-emerald-800/70 hover:text-emerald-600 transition-colors">{t('footer.infoLinks.terms')}</Link></li>
              <li><Link to="/privacy" className="text-sm text-emerald-800/70 hover:text-emerald-600 transition-colors">{t('footer.infoLinks.privacy')}</Link></li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h4 className="font-heading font-bold text-emerald-900 mb-4">{t('footer.subscribe')}</h4>
            <p className="text-sm text-emerald-800/70 mb-4">{t('footer.subDesc')}</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder={t('footer.emailPlaceholder')}
                className="bg-white border border-emerald-900/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <button className="bg-emerald-900 text-white p-2 rounded-lg hover:bg-emerald-800 transition-colors flex-shrink-0">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-emerald-900/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-emerald-900/50">
            &copy; {new Date().getFullYear()} {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4 text-sm font-medium">
            <a href="#" className="text-emerald-900/40 hover:text-emerald-600 transition-colors">IG</a>
            <a href="#" className="text-emerald-900/40 hover:text-emerald-600 transition-colors">FB</a>
            <a href="#" className="text-emerald-900/40 hover:text-emerald-600 transition-colors">TW</a>
            <a href="#" className="text-emerald-900/40 hover:text-emerald-600 transition-colors">YT</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
