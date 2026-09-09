import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, Compass, Wallet, MapPin, Navigation, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TripPlannerSection = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    time: '',
    type: '',
    interest: '',
    budget: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (category: keyof typeof selections, value: string) => {
    setSelections(prev => ({ ...prev, [category]: value }));
    if (step < 4) {
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 2000);
  };

  const resetForm = () => {
    setStep(1);
    setSelections({ time: '', type: '', interest: '', budget: '' });
    setShowResult(false);
  };

  return (
    <section className="py-24 bg-emerald-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-800/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-950/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-emerald-400 font-medium tracking-widest uppercase text-xs mb-4">
            <Compass size={16} />
            <span>{t('planner.label')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
            {t('planner.title')}
          </h2>
          <p className="text-emerald-100/70 text-lg">
            {t('planner.desc')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl shadow-black/20 text-emerald-950">
            
            <AnimatePresence mode="wait">
              {!showResult && !isGenerating ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  {/* Progress Bar */}
                  <div className="flex gap-2 mb-8">
                    {[1, 2, 3, 4].map(i => (
                      <div 
                        key={i} 
                        className={`h-2 rounded-full flex-1 transition-colors duration-500 ${
                          step >= i ? 'bg-emerald-600' : 'bg-emerald-100'
                        }`} 
                      />
                    ))}
                  </div>

                  {/* Step 1: Time */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                        <Clock className="text-emerald-600" />
                        {t('planner.timeQ')}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[0, 1, 2, 3].map(idx => (
                          <button
                            key={idx}
                            onClick={() => handleSelect('time', t(`planner.times.${idx}`))}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                              selections.time === t(`planner.times.${idx}`) 
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-900' 
                                : 'border-emerald-100 hover:border-emerald-300 text-emerald-800'
                            }`}
                          >
                            <div className="font-medium">{t(`planner.times.${idx}`)}</div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Type */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                        <Users className="text-emerald-600" />
                        {t('planner.typeQ')}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[0, 1, 2, 3].map(idx => (
                          <button
                            key={idx}
                            onClick={() => handleSelect('type', t(`planner.types.${idx}`))}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                              selections.type === t(`planner.types.${idx}`) 
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-900' 
                                : 'border-emerald-100 hover:border-emerald-300 text-emerald-800'
                            }`}
                          >
                            <div className="font-medium">{t(`planner.types.${idx}`)}</div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Interest */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                        <Compass className="text-emerald-600" />
                        {t('planner.interestQ')}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[0, 1, 2, 3, 4, 5].map(idx => (
                          <button
                            key={idx}
                            onClick={() => handleSelect('interest', t(`planner.interests.${idx}`))}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                              selections.interest === t(`planner.interests.${idx}`) 
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-900' 
                                : 'border-emerald-100 hover:border-emerald-300 text-emerald-800'
                            }`}
                          >
                            <div className="font-medium">{t(`planner.interests.${idx}`)}</div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Budget */}
                  {step === 4 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                        <Wallet className="text-emerald-600" />
                        {t('planner.budgetQ')}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {[0, 1, 2].map(idx => (
                          <button
                            key={idx}
                            onClick={() => setSelections(prev => ({ ...prev, budget: t(`planner.budgets.${idx}`) }))}
                            className={`p-4 rounded-xl border-2 text-center transition-all ${
                              selections.budget === t(`planner.budgets.${idx}`) 
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-900' 
                                : 'border-emerald-100 hover:border-emerald-300 text-emerald-800'
                            }`}
                          >
                            <div className="font-medium">{t(`planner.budgets.${idx}`)}</div>
                          </button>
                        ))}
                      </div>
                      
                      {selections.budget && (
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={handleGenerate}
                          className="w-full bg-emerald-900 hover:bg-emerald-800 text-white py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-900/20"
                        >
                          {t('planner.generate')}
                          <ArrowRight size={20} />
                        </motion.button>
                      )}
                    </motion.div>
                  )}
                  
                  {step > 1 && step < 4 && (
                    <button 
                      onClick={() => setStep(step - 1)}
                      className="text-emerald-600 font-medium text-sm hover:underline"
                    >
                      &larr; {t('planner.back')}
                    </button>
                  )}
                </motion.div>
              ) : isGenerating ? (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                  <div>
                    <h3 className="text-2xl font-bold font-heading mb-2 text-emerald-900">
                      {t('planner.loading')}
                    </h3>
                    <p className="text-emerald-800/70">
                      {t('planner.loadingDesc', { time: selections.time, type: selections.type, interest: selections.interest })}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="inline-flex items-center gap-1 text-emerald-600 text-sm font-medium bg-emerald-50 px-3 py-1 rounded-full mb-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                        {t('planner.resultBadge')}
                      </div>
                      <h3 className="text-3xl font-bold font-heading text-emerald-900 mb-2">
                        {t('planner.resultTitle', { interest: selections.interest })}
                      </h3>
                      <p className="text-emerald-800/70">
                        {t('planner.resultDesc', { type: selections.type, time: selections.time.toLowerCase() })}
                      </p>
                    </div>
                    <button 
                      onClick={resetForm}
                      className="text-emerald-600 text-sm font-medium hover:underline bg-emerald-50 px-4 py-2 rounded-lg"
                    >
                      {t('planner.restart')}
                    </button>
                  </div>

                  {/* Route Timeline */}
                  <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:ml-10 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-emerald-100">
                    
                    {[
                      { time: "10:00", name: t('planner.route1.name'), desc: t('planner.route1.desc'), icon: <MapPin size={16} /> },
                      { time: "11:30", name: t('planner.route2.name'), desc: t('planner.route2.desc'), icon: <Compass size={16} /> },
                      { time: "13:30", name: t('planner.route3.name'), desc: t('planner.route3.desc'), icon: <Wallet size={16} /> },
                      { time: "15:00", name: t('planner.route4.name'), desc: t('planner.route4.desc'), icon: <Navigation size={16} /> }
                    ].map((item, idx) => (
                      <div key={idx} className="relative flex items-start gap-6">
                        <div className="absolute -left-11 bg-white p-1 rounded-full text-emerald-600 border border-emerald-100 z-10 mt-1">
                          {item.icon}
                        </div>
                        <div className="bg-sand p-5 rounded-2xl border border-emerald-900/5 flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-lg text-emerald-900">{item.name}</h4>
                            <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">{item.time}</span>
                          </div>
                          <p className="text-sm text-emerald-800/70">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                    
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-emerald-100">
                    <button 
                      onClick={() => document.getElementById('xarita')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex-1 bg-emerald-900 hover:bg-emerald-800 text-white py-3 rounded-xl font-medium transition-colors"
                    >
                      {t('planner.viewMap')}
                    </button>
                    <button className="flex-1 border border-emerald-900/20 hover:bg-emerald-50 text-emerald-900 py-3 rounded-xl font-medium transition-colors">
                      {t('planner.save')}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
