import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Coffee, Utensils, Hotel, Camera, Mountain, ShoppingBag, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const mapCategories = [
  { id: 'tabiat', name: 'Tabiat', icon: <Mountain size={18} />, color: 'bg-emerald-600' },
  { id: 'tarix', name: 'Tarixiy joylar', icon: <MapPin size={18} />, color: 'bg-amber-600' },
  { id: 'dam', name: 'Dam olish maskanlari', icon: <Coffee size={18} />, color: 'bg-blue-500' },
  { id: 'taom', name: 'Milliy taomlar', icon: <Utensils size={18} />, color: 'bg-red-500' },
  { id: 'mehmonxona', name: 'Mehmonxonalar', icon: <Hotel size={18} />, color: 'bg-indigo-500' },
  { id: 'mahsulot', name: 'Mahalliy mahsulotlar', icon: <ShoppingBag size={18} />, color: 'bg-orange-500' },
  { id: 'foto', name: 'Foto lokatsiyalar', icon: <Camera size={18} />, color: 'bg-purple-500' },
];

const mockLocations = [
  {
    id: 1,
    name: "Chorbog' dam olish maskani",
    category: 'dam',
    x: 45,
    y: 35,
    image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop",
    desc: "Tabiat qo'ynidagi go'zal maskan, oilaviy dam olish uchun ideal joy.",
    hours: "09:00 - 20:00",
    duration: "2-4 soat"
  },
  {
    id: 2,
    name: "Farg'ona markaziy bog'i",
    category: 'tabiat',
    x: 30,
    y: 60,
    image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=600&auto=format&fit=crop",
    desc: "Shahar markazidagi osoyishta maskan.",
    hours: "08:00 - 22:00",
    duration: "1-2 soat"
  },
  {
    id: 3,
    name: "Milliy taomlar restorani",
    category: 'taom',
    x: 60,
    y: 50,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
    desc: "Haqiqiy Farg'ona palovi va milliy taomlar.",
    hours: "10:00 - 23:00",
    duration: "1-2 soat"
  },
  {
    id: 4,
    name: "Tog' manzarasi",
    category: 'foto',
    x: 75,
    y: 25,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
    desc: "Quyosh botishini tomosha qilish uchun eng yaxshi joy.",
    hours: "24/7",
    duration: "1 soat"
  }
];

export const SmartMapSection = () => {
  const { t } = useTranslation();
  
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeLocation, setActiveLocation] = useState<number | null>(1); // default to first one for demo
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 1));

  const filteredLocations = activeCategory 
    ? mockLocations.filter(loc => loc.category === activeCategory)
    : mockLocations;

  const selectedLoc = mockLocations.find(loc => loc.id === activeLocation);

  return (
    <section id="xarita" className="py-20 bg-sand relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-medium tracking-widest uppercase text-xs mb-3">
              <span>{t('smartMap.label')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-emerald-900 mb-4">
              {t('smartMap.title')}
            </h2>
            <p className="text-emerald-800/70 max-w-2xl text-lg">
              {t('smartMap.desc')}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              <button 
                onClick={() => setActiveCategory(null)}
                className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  activeCategory === null 
                    ? 'bg-emerald-900 text-white shadow-md' 
                    : 'bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-900/10'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeCategory === null ? 'bg-white/20' : 'bg-emerald-100 text-emerald-600'}`}>
                  <MapPin size={18} />
                </div>
                <span className="font-medium text-sm">{t('smartMap.allPlaces')}</span>
              </button>

              {mapCategories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                    activeCategory === cat.id 
                      ? 'bg-emerald-900 text-white shadow-md' 
                      : 'bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-900/10'
                  }`}
                >
                  <div className={`p-2 rounded-lg text-white ${cat.color} ${activeCategory === cat.id ? 'opacity-100' : 'opacity-80'}`}>
                    {cat.icon}
                  </div>
                  <span className="font-medium text-sm">{t(`smartMap.cats.${cat.id}`)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Map Area */}
          <div className="w-full lg:w-3/4 relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-emerald-100 border border-emerald-900/10">
            <motion.div 
              drag={zoom > 1}
              dragConstraints={{ left: -200 * (zoom - 1), right: 200 * (zoom - 1), top: -200 * (zoom - 1), bottom: 200 * (zoom - 1) }}
              animate={{ scale: zoom }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 origin-center cursor-grab active:cursor-grabbing"
            >
              {/* Map Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center pointer-events-none"
                style={{ 
                  backgroundImage: 'url("/uzbekistan-map.png")' 
                }}
              />
              
              {/* Map Overlay for better contrast */}
              <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none" />

              {/* Markers */}
              {filteredLocations.map(loc => {
                const cat = mapCategories.find(c => c.id === loc.category);
                const isActive = activeLocation === loc.id;
                
                return (
                  <div 
                    key={loc.id} 
                    className="absolute"
                    style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: isActive ? 1.2 / zoom : 1 / zoom, opacity: 1 }}
                      whileHover={{ scale: 1.1 / zoom }}
                      onClick={(e) => { e.stopPropagation(); setActiveLocation(loc.id); }}
                      className={`relative z-20 flex items-center justify-center w-10 h-10 rounded-full text-white shadow-lg border-2 transition-colors ${
                        isActive ? 'border-white z-30' : 'border-white/50'
                      } ${cat?.color || 'bg-emerald-600'}`}
                    >
                      {cat?.icon || <MapPin size={18} />}
                      
                      {isActive && (
                        <span className="absolute -bottom-2 w-2 h-2 rotate-45 border-r-2 border-b-2 border-white bg-inherit" />
                      )}
                    </motion.button>
                  </div>
                );
              })}
            </motion.div>

            {/* Popover Card */}
            <AnimatePresence>
              {selectedLoc && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-white rounded-2xl shadow-2xl overflow-hidden z-40 border border-emerald-900/10"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src={selectedLoc.image} 
                      alt={selectedLoc.name} 
                      className="w-full h-full object-cover"
                    />
                    <button 
                      onClick={() => setActiveLocation(null)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors"
                    >
                      &times;
                    </button>
                    <div className="absolute top-2 left-2 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-medium text-emerald-900 shadow-sm">
                      {t(`smartMap.cats.${selectedLoc.category}`)}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-lg text-emerald-900 mb-2 leading-tight">
                      {t(`smartMap.loc${selectedLoc.id}.name`)}
                    </h3>
                    <p className="text-sm text-emerald-800/70 mb-4 line-clamp-2">
                      {t(`smartMap.loc${selectedLoc.id}.desc`)}
                    </p>
                    
                    <div className="flex flex-col gap-2 mb-5 text-xs text-emerald-900/60 font-medium">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-emerald-600" />
                        <span>{selectedLoc.hours}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-emerald-600" />
                        <span>{t('smartMap.duration', { time: selectedLoc.duration })}</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-emerald-900 hover:bg-emerald-800 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">
                      {t('smartMap.addToRoute')}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Map Controls Mock */}
            <div className="absolute right-4 top-4 flex flex-col gap-2 z-50">
              <button 
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-emerald-900 hover:bg-emerald-50 border border-emerald-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-xl font-medium">+</span>
              </button>
              <button 
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-emerald-900 hover:bg-emerald-50 border border-emerald-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-xl font-medium">-</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
