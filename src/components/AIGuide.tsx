import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';

const presetQuestions = [
  "1 kunda qayerlarga borsam bo'ladi?",
  "Oilam bilan qayerga borish mumkin?",
  "Eng chiroyli foto joylar qayerda?",
  "Qayerda milliy taom yeyish mumkin?"
];

export const AIGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Assalomu alaykum! Men Farg'ona bo'yicha sun'iy intellekt yordamchingizman. Sayohatni rejalashtirishda qanday yordam bera olaman?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', text }]);
    setInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      let response = "";
      if (text.includes("foto")) {
        response = "Farg'onada foto tushish uchun eng yaxshi joylar: \n1. Chorbog' dam olish maskanidagi ko'l bo'yi\n2. Farg'ona tog'larining cho'qqisi (ayniqsa quyosh botishida)\n3. Shahardagi qadimiy ko'chalar.";
      } else if (text.includes("1 kunda") || text.includes("kun")) {
        response = "1 kunlik ajoyib marshrut:\nErtalab (09:00): Markaziy maydonda sayr.\nTushlik (12:30): 'Navro'z' restoranida milliy taom.\nTushdan keyin (14:30): Tog' yonbag'rida tabiat manzaralari.\nKechqurun (18:00): Mahalliy hunarmandlar bozoridan esdaliklar xarid qilish.";
      } else if (text.includes("ovqat") || text.includes("taom")) {
        response = "Milliy taomlarni tatib ko'rish uchun 'Navro'z' kafesi va 'Milliy Taomlar' restoranini tavsiya qilaman. U yerda haqiqiy Farg'ona palovi tayyorlanadi.";
      } else {
        response = "Sayohat bo'yicha qanday qiziqishlaringiz bor? Tabiat, tarixiy joylar yoki milliy taomlar? Menga aniqroq aytsangiz, sizga eng zo'r joylarni topib beraman.";
      }

      setMessages(prev => [...prev, { type: 'bot', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-emerald-900 text-white rounded-full flex items-center justify-center shadow-2xl z-50 transition-opacity ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Sparkles size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-full max-w-[360px] sm:w-[360px] h-[550px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-emerald-900/10 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-emerald-900 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles size={20} className="text-gold-light" />
                </div>
                <div>
                  <h3 className="font-bold font-heading text-sm">Farg'ona AI Guide</h3>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-100/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Online
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-sand flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                    msg.type === 'user' 
                      ? 'bg-emerald-900 text-white rounded-br-sm' 
                      : 'bg-white text-emerald-950 border border-emerald-900/10 rounded-bl-sm shadow-sm'
                  }`}>
                    {msg.text.split('\n').map((line, idx) => (
                      <span key={idx}>
                        {line}
                        {idx < msg.text.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-emerald-950 border border-emerald-900/10 rounded-2xl rounded-bl-sm shadow-sm p-4 flex gap-1 items-center w-fit">
                    <div className="w-1.5 h-1.5 bg-emerald-900/40 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-emerald-900/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 bg-emerald-900/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Preset Questions */}
            {messages.length === 1 && (
              <div className="p-3 bg-white border-t border-emerald-900/5">
                <p className="text-xs text-emerald-800/50 mb-2 font-medium">Tavsiya etilgan savollar:</p>
                <div className="flex flex-wrap gap-2">
                  {presetQuestions.map((q, i) => (
                    <button 
                      key={i}
                      onClick={() => handleSend(q)}
                      className="text-[11px] bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors border border-emerald-900/5 text-left"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-emerald-900/10">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder="Savolingizni yozing..."
                  className="flex-1 bg-sand border border-emerald-900/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-900/20 text-emerald-950"
                />
                <button 
                  onClick={() => handleSend(input)}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-emerald-900 text-white flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
