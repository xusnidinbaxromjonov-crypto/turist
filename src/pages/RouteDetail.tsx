import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '../data/mockData';
import { MapPin, ArrowLeft, Clock, Navigation, PlusCircle } from 'lucide-react';

export const RouteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const route = ROUTES.find(r => r.id === Number(id));

  if (!route) {
    return <div className="pt-32 text-center text-emerald-900">Marshrut topilmadi</div>;
  }

  return (
    <div className="pt-20 min-h-screen bg-sand pb-20">
      <div className="h-[40vh] min-h-[300px] relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${route.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sand via-emerald-900/60 to-emerald-900/20" />
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-white drop-shadow-lg mb-4">{route.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-white text-sm font-medium">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-emerald-400" />
              <span>{route.places}</span>
            </div>
            {route.distance && (
              <div className="flex items-center gap-2">
                <Navigation size={18} className="text-emerald-400" />
                <span>{route.distance}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-emerald-400" />
              <span>{route.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 md:px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-emerald-900/5 mb-8">
              <h3 className="text-2xl font-bold font-heading text-emerald-900 mb-4">Marshrut haqida</h3>
              <p className="text-lg text-emerald-800/80 leading-relaxed mb-8">
                {route.desc || "Ushbu marshrut sizga shahar bo'ylab eng qulay va qiziqarli sayohatni taqdim etadi."}
              </p>

              <h3 className="text-2xl font-bold font-heading text-emerald-900 mb-6">Reja (Soatma-soat)</h3>
              <div className="space-y-6">
                {route.timeline?.map((item, idx) => (
                  <div key={idx} className="flex gap-4 relative">
                    {idx !== route.timeline!.length - 1 && (
                      <div className="absolute top-8 left-3 w-0.5 h-full bg-emerald-100" />
                    )}
                    <div className="w-6 h-6 rounded-full bg-emerald-100 border-2 border-emerald-600 shrink-0 z-10" />
                    <div className="pb-4">
                      <h4 className="font-bold text-emerald-900 font-heading text-lg">{item.time}</h4>
                      <p className="text-emerald-800/70">{item.act}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-1 space-y-6">
            <div className="bg-emerald-900 text-white rounded-3xl p-6 shadow-xl">
              <h3 className="font-bold font-heading text-xl mb-4">Shu marshrut bo'yicha hamroh qidirish</h3>
              <p className="text-emerald-100/80 text-sm mb-6">Ushbu marshrut bo'ylab birga sayohat qilish uchun do'stlar toping.</p>
              <button 
                onClick={() => navigate('/hamroh')}
                className="w-full bg-white text-emerald-900 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors"
              >
                <PlusCircle size={20} />
                E'lon berish
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
