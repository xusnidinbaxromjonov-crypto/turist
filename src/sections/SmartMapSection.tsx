import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Coffee, Utensils, Hotel, Camera, Mountain, ShoppingBag, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';

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
    lat: 41.62,
    lng: 70.01,
    image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop",
    desc: "Tabiat qo'ynidagi go'zal maskan, oilaviy dam olish uchun ideal joy.",
    hours: "09:00 - 20:00",
    duration: "2-4 soat"
  },
  {
    id: 2,
    name: "Farg'ona markaziy bog'i",
    category: 'tabiat',
    lat: 40.386,
    lng: 71.782,
    image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=600&auto=format&fit=crop",
    desc: "Shahar markazidagi osoyishta maskan.",
    hours: "08:00 - 22:00",
    duration: "1-2 soat"
  },
  {
    id: 3,
    name: "Milliy taomlar restorani",
    category: 'taom',
    lat: 40.530,
    lng: 70.933,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
    desc: "Haqiqiy Farg'ona palovi va milliy taomlar.",
    hours: "10:00 - 23:00",
    duration: "1-2 soat"
  },
  {
    id: 4,
    name: "Tog' manzarasi",
    category: 'foto',
    lat: 39.982,
    lng: 71.800,
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

  const filteredLocations = activeCategory 
    ? mockLocations.filter(loc => loc.category === activeCategory)
    : mockLocations;

  const selectedLoc = mockLocations.find(loc => loc.id === activeLocation);

  // Helper to create custom Leaflet icon
  const createCustomIcon = (cat: any, isActive: boolean) => {
    const iconHtml = renderToString(cat?.icon || <MapPin size={18} />);
    return L.divIcon({
      html: `<div class="relative flex items-center justify-center w-10 h-10 rounded-full text-white shadow-lg border-2 transition-transform ${
        isActive ? 'border-white scale-110' : 'border-white/50'
      } ${cat?.color || 'bg-emerald-600'}">
        ${iconHtml}
        ${isActive ? '<span class="absolute -bottom-2 w-2 h-2 rotate-45 border-r-2 border-b-2 border-white bg-inherit"></span>' : ''}
      </div>`,
      className: '',
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });
  };

  return (
    <section className="py-20 bg-sand relative overflow-hidden" id="smart-map">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-900/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-600/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm mb-6"
          >
            <MapPin size={16} />
            {t('smartMap.badge')}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-heading text-emerald-950 mb-6"
          >
            {t('smartMap.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-emerald-900/70"
          >
            {t('smartMap.subtitle')}
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar / Filters */}
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
            <div className="absolute inset-0 z-0">
              <MapContainer 
                center={[40.7, 71.5]} 
                zoom={8} 
                scrollWheelZoom={true} 
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                  url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                />
                
                {filteredLocations.map(loc => {
                  const cat = mapCategories.find(c => c.id === loc.category);
                  const isActive = activeLocation === loc.id;
                  
                  return (
                    <Marker 
                      key={loc.id} 
                      position={[loc.lat, loc.lng]}
                      icon={createCustomIcon(cat, isActive)}
                      eventHandlers={{
                        click: () => setActiveLocation(loc.id)
                      }}
                    />
                  );
                })}
              </MapContainer>
            </div>

            {/* Popover Card */}
            <div className="absolute inset-0 pointer-events-none z-50">
              <AnimatePresence>
                {selectedLoc && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-emerald-900/10"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
