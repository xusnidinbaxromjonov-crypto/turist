import { useParams, useNavigate } from 'react-router-dom';
import { EVENTS } from '../data/mockData';
import { ArrowLeft, Calendar, MapPin, Share2, Users } from 'lucide-react';

export const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = EVENTS.find(e => e.id === Number(id));

  if (!event) {
    return <div className="pt-32 text-center text-emerald-900">Tadbir topilmadi</div>;
  }

  return (
    <div className="pt-24 min-h-screen bg-sand pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-emerald-900/10 rounded-full flex items-center justify-center text-emerald-900 hover:bg-emerald-900/20 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-emerald-900/5">
          {/* Image Header */}
          <div className="w-full h-[300px] md:h-[400px] relative">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex gap-4 mb-4">
                <div className="bg-emerald-600 px-4 py-2 rounded-xl backdrop-blur-md flex items-center gap-2">
                  <Calendar size={18} />
                  <span className="font-medium text-sm">{event.date}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold font-heading mb-2">{event.title}</h1>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-6 mb-8 text-emerald-800/80 font-medium">
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-emerald-600" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-emerald-600" />
                <span>Ochiq tadbir (Barchaga ruxsat)</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold font-heading text-emerald-900 mb-4">Tadbir haqida</h2>
            <p className="text-emerald-800/80 leading-relaxed mb-8 text-lg">
              {event.fullDesc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 border-t border-emerald-50 pt-8">
              <button className="flex-1 bg-emerald-900 text-white py-4 rounded-xl font-medium hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-900/20">
                Tadbirga yozilish
              </button>
              <button className="flex items-center justify-center gap-2 bg-emerald-50 text-emerald-900 py-4 px-6 rounded-xl font-medium hover:bg-emerald-100 transition-colors">
                <Share2 size={20} />
                Ulashish
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
