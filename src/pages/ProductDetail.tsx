import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/mockData';
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === Number(id));

  if (!product) {
    return <div className="pt-32 text-center text-emerald-900">Mahsulot topilmadi</div>;
  }

  return (
    <div className="pt-24 min-h-screen bg-sand pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-emerald-900/10 rounded-full flex items-center justify-center text-emerald-900 hover:bg-emerald-900/20 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-emerald-900/5 flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="bg-emerald-50 rounded-2xl overflow-hidden h-[300px] md:h-[400px] relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </div>
          </div>

          {/* Details */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="text-emerald-600 font-medium text-sm mb-2">{product.producer}</div>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-emerald-900 mb-4">{product.name}</h1>
            
            <div className="text-3xl font-bold text-emerald-700 mb-6">{product.price}</div>
            
            <p className="text-emerald-800/80 leading-relaxed mb-8">
              {product.desc}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-emerald-800/70 text-sm">
                <ShieldCheck size={20} className="text-emerald-600" />
                <span>100% asl sifat va mahalliy hunarmandlar ishi</span>
              </div>
              <div className="flex items-center gap-3 text-emerald-800/70 text-sm">
                <Truck size={20} className="text-emerald-600" />
                <span>O'zbekiston bo'ylab yetkazib berish (MOCK)</span>
              </div>
            </div>

            <button className="w-full bg-emerald-900 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-emerald-800 transition-colors shadow-lg">
              <ShoppingBag size={20} />
              Sotib olish
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
