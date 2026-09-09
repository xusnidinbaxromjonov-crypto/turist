import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Volume2, Loader2, ArrowRightLeft, Languages } from 'lucide-react';


interface VoiceTranslatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LANGUAGES = [
  { code: 'uz', name: "O'zbek", speechCode: 'uz-UZ' },
  { code: 'en', name: 'English', speechCode: 'en-US' },
  { code: 'ru', name: 'Русский', speechCode: 'ru-RU' },
  { code: 'zh', name: '中文 (Chinese)', speechCode: 'zh-CN' },
  { code: 'tr', name: 'Türkçe (Turkish)', speechCode: 'tr-TR' },
  { code: 'ar', name: 'العربية (Arabic)', speechCode: 'ar-SA' },
  { code: 'fr', name: 'Français (French)', speechCode: 'fr-FR' },
  { code: 'de', name: 'Deutsch (German)', speechCode: 'de-DE' },
  { code: 'es', name: 'Español (Spanish)', speechCode: 'es-ES' },
  { code: 'ko', name: '한국어 (Korean)', speechCode: 'ko-KR' },
  { code: 'ja', name: '日本語 (Japanese)', speechCode: 'ja-JP' },
  { code: 'hi', name: 'हिन्दी (Hindi)', speechCode: 'hi-IN' }
];

export const VoiceTranslatorModal = ({ isOpen, onClose }: VoiceTranslatorModalProps) => {
  const [sourceLang, setSourceLang] = useState(LANGUAGES[1]); // Default English
  const [targetLang, setTargetLang] = useState(LANGUAGES[0]); // Default Uzbek
  
  const [isListening, setIsListening] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleTranslate(transcript, sourceLang.code, targetLang.code);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setErrorMsg('Ovozni aniqlashda xatolik yuz berdi. Iltimos qayta urinib ko\'ring.');
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [sourceLang, targetLang]);

  const toggleListen = () => {
    setErrorMsg('');
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.lang = sourceLang.speechCode;
        try {
          recognitionRef.current.start();
          setIsListening(true);
          setInputText('');
          setTranslatedText('');
        } catch (e) {
          console.error(e);
        }
      } else {
        setErrorMsg('Brauzeringiz ovozli kiritishni qo\'llab-quvvatlamaydi.');
      }
    }
  };

  const handleTranslate = async (text: string, source: string, target: string) => {
    if (!text.trim()) return;
    
    setIsTranslating(true);
    setErrorMsg('');
    try {
      // Using MyMemory translation API (Free, no key required for simple usage)
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`);
      const data = await res.json();
      
      if (data.responseData?.translatedText) {
        setTranslatedText(data.responseData.translatedText);
      } else {
        setErrorMsg('Tarjima qilishda xatolik yuz berdi.');
      }
    } catch (err) {
      setErrorMsg('Tarjimon xizmatiga ulanib bo\'lmadi.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const handleSpeak = (text: string, langCode: string) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    window.speechSynthesis.speak(utterance);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-emerald-900 px-6 py-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Languages size={20} className="text-gold-light" />
              </div>
              <h2 className="font-heading font-bold text-lg">Ovozli Tarjimon</h2>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            {/* Language Selectors */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <select 
                value={sourceLang.code}
                onChange={(e) => setSourceLang(LANGUAGES.find(l => l.code === e.target.value) || LANGUAGES[1])}
                className="flex-1 bg-sand border border-emerald-900/10 rounded-xl px-4 py-2.5 text-sm font-medium text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-900/20"
              >
                {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
              </select>
              
              <button 
                onClick={handleSwapLanguages}
                className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors shrink-0"
              >
                <ArrowRightLeft size={18} />
              </button>

              <select 
                value={targetLang.code}
                onChange={(e) => setTargetLang(LANGUAGES.find(l => l.code === e.target.value) || LANGUAGES[0])}
                className="flex-1 bg-sand border border-emerald-900/10 rounded-xl px-4 py-2.5 text-sm font-medium text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-900/20"
              >
                {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
              </select>
            </div>

            {/* Input / Transcribed Text */}
            <div className="bg-sand rounded-2xl p-4 mb-4 min-h-[100px] border border-emerald-900/5 relative">
              <p className="text-emerald-950 text-lg">
                {inputText || <span className="text-emerald-900/40">Gapirishingiz mumkin...</span>}
              </p>
              {inputText && (
                <button 
                  onClick={() => handleSpeak(inputText, sourceLang.speechCode)}
                  className="absolute bottom-3 right-3 text-emerald-600 hover:text-emerald-800"
                >
                  <Volume2 size={20} />
                </button>
              )}
            </div>

            {/* Mic Button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={toggleListen}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${
                  isListening 
                    ? 'bg-red-500 animate-pulse scale-110 shadow-red-500/40' 
                    : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/40 hover:scale-105'
                }`}
              >
                <Mic size={28} />
              </button>
            </div>

            {errorMsg && (
              <div className="text-center text-red-500 text-sm font-medium mb-4">
                {errorMsg}
              </div>
            )}

            {/* Translation Output */}
            <div className="bg-emerald-900 rounded-2xl p-4 min-h-[100px] shadow-inner relative text-white">
              {isTranslating ? (
                <div className="flex items-center justify-center h-full text-emerald-100 gap-2">
                  <Loader2 size={20} className="animate-spin" />
                  <span>Tarjima qilinmoqda...</span>
                </div>
              ) : (
                <>
                  <p className="text-lg">
                    {translatedText || <span className="text-emerald-100/40">Tarjima bu yerda chiqadi</span>}
                  </p>
                  {translatedText && (
                    <button 
                      onClick={() => handleSpeak(translatedText, targetLang.speechCode)}
                      className="absolute bottom-3 right-3 text-emerald-400 hover:text-white transition-colors"
                    >
                      <Volume2 size={20} />
                    </button>
                  )}
                </>
              )}
            </div>
            
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
