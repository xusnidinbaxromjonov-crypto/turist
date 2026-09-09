import { motion } from 'framer-motion';
import { MapPin, Navigation, Store, QrCode, Star } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const stats = [
  { id: 1, label: 'Turistik joylar', value: 45, icon: <MapPin size={24} />, suffix: '+' },
  { id: 2, label: 'Marshrutlar', value: 12, icon: <Navigation size={24} />, suffix: '' },
  { id: 3, label: 'Mahalliy bizneslar', value: 120, icon: <Store size={24} />, suffix: '+' },
  { id: 4, label: 'QR joylar', value: 30, icon: <QrCode size={24} />, suffix: '' },
  { id: 5, label: 'Tavsiya etilgan', value: 15, icon: <Star size={24} />, suffix: '' }
];

const Counter = ({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) => {
  const [count, setCount] = useState(from);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{count}</span>;
};

export const StatisticsSection = () => {
  return (
    <section className="py-16 bg-emerald-900 text-white relative overflow-hidden">
      {/* Background graphic */}
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-y-1/4 translate-x-1/4">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-gold-light font-medium tracking-widest uppercase text-xs mb-3">
              <span>Raqamlarda</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">
              Farg'ona turizmi — raqamlarda
            </h2>
            <p className="text-emerald-100/70">
              Raqamlar bizning imkoniyatlarimizni ko'rsatadi.
            </p>
          </div>
          <div className="text-right">
            <div className="font-heading font-bold text-xl text-gold-light italic opacity-80">
              Farg'onani<br/>kashf et!
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-emerald-800/30 border border-emerald-700/50 hover:bg-emerald-800/50 transition-colors"
            >
              <div className="text-gold-light mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-bold font-heading mb-2 text-white">
                <Counter from={0} to={stat.value} duration={2 + idx * 0.2} />
                <span className="text-2xl text-emerald-400">{stat.suffix}</span>
              </div>
              <div className="text-sm font-medium text-emerald-100/80 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
