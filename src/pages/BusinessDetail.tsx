import { useParams, useNavigate } from 'react-router-dom';
import { BUSINESSES } from '../data/mockData';
import { MapPin, ArrowLeft, Star, Phone, Globe } from 'lucide-react';

export const BusinessDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const business = BUSINESSES.find(b => b.id === Number(id));

  if (!business) {
    return <div className="pt-32 text-center text-emerald-900">Biznes topilmadi</div>;
  }

  return (
    <div className="pt-20 min-h-screen bg-sand pb-20">
      <div className="h-[40vh] min-h-[300px] relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${business.image})` }}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors z-10"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-2 rounded-2xl shadow-2xl rotate-3 transform hover:rotate-0 transition-transform duration-500">
            <div 
              className="w-48 h-48 sm:w-64 sm:h-64 bg-cover bg-center rounded-xl"
              style={{ backgroundImage: `url(${business.image})` }}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 md:px-6 mt-12 text-center">
        <div className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full w-fit mx-auto mb-4 uppercase tracking-wider">
          {business.category}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-emerald-900 mb-4">{business.name}</h1>
        
        <div className="flex items-center justify-center gap-6 text-emerald-800 font-medium mb-8">
          <div className="flex items-center gap-1">
            <Star className="text-gold" size={20} />
            <span>{business.rating} ({business.reviews} sharh)</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="text-emerald-600" size={20} />
            <span>{business.location}</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-emerald-900/5 text-left max-w-2xl mx-auto mb-8">
          <h3 className="text-2xl font-bold font-heading text-emerald-900 mb-4">Biz haqimizda</h3>
          <p className="text-lg text-emerald-800/80 leading-relaxed mb-8">
            {business.desc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="w-full border-2 border-emerald-900 text-emerald-900 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors">
              <Phone size={20} />
              Qo'ng'iroq qilish
            </button>
            <button className="w-full bg-emerald-900 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-emerald-800 transition-colors">
              <Globe size={20} />
              Veb-saytga o'tish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
