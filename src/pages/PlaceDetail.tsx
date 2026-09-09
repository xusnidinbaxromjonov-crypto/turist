import { useParams, useNavigate } from 'react-router-dom';
import { PLACES } from '../data/mockData';
import { MapPin, ArrowLeft, Star, Clock, Ticket } from 'lucide-react';

export const PlaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const place = PLACES.find(p => p.id === Number(id));

  if (!place) {
    return <div className="pt-32 text-center text-emerald-900">Joy topilmadi</div>;
  }

  return (
    <div className="pt-20 min-h-screen bg-sand pb-20">
      <div className="h-[40vh] min-h-[300px] relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${place.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sand via-emerald-900/40 to-emerald-900/20" />
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 container mx-auto max-w-4xl">
          <div className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-3 uppercase tracking-wider">
            {place.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-emerald-900 drop-shadow-md mb-2">{place.title}</h1>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 md:px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-emerald-900/5">
          <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-emerald-900/10">
            <div className="flex items-center gap-2 text-emerald-800">
              <MapPin className="text-emerald-600" size={20} />
              <span className="font-medium">{place.details.location}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-800">
              <Star className="text-gold" size={20} />
              <span className="font-medium">{place.details.rating}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-800">
              <Ticket className="text-emerald-600" size={20} />
              <span className="font-medium">{place.details.entryFee}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-800">
              <Clock className="text-emerald-600" size={20} />
              <span className="font-medium">{place.details.bestTime}</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold font-heading text-emerald-900 mb-4">Joy haqida</h3>
          <p className="text-lg text-emerald-800/80 leading-relaxed mb-8">
            {place.desc}
          </p>

          <h3 className="text-2xl font-bold font-heading text-emerald-900 mb-4">Xaritada</h3>
          <div className="w-full h-64 bg-emerald-100 rounded-2xl flex items-center justify-center border border-emerald-900/10">
            <div className="text-emerald-800/50 flex flex-col items-center gap-2">
              <MapPin size={32} />
              <span>Xarita yuklanmoqda... (Mock)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
