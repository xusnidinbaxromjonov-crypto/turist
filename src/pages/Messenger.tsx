import { useState, useEffect, useRef } from 'react';
import { Send, Users, ArrowLeft, Image as ImageIcon, MessageCircle, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

const INITIAL_CHATS = [
  {
    id: 1,
    name: 'Sardor',
    avatar: 'https://ui-avatars.com/api/?name=Sardor&background=0284c7&color=fff',
    lastMessage: 'Ertaga soat 9:00 da ko\'rishamiz!',
    time: '14:20',
    type: 'personal'
  },
  {
    id: 2,
    name: 'Qo\'qon Sayohatchilari',
    avatar: 'https://ui-avatars.com/api/?name=QS&background=047857&color=fff',
    lastMessage: 'Malika: Men ham boraman.',
    time: 'Kecha',
    type: 'group'
  }
];

export const Messenger = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [chats, setChats] = useState<any[]>(() => {
    const saved = localStorage.getItem('turist_chats');
    if (saved) return JSON.parse(saved);
    return INITIAL_CHATS;
  });

  useEffect(() => {
    localStorage.setItem('turist_chats', JSON.stringify(chats));
  }, [chats]);

  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if we navigated here to message someone new
  useEffect(() => {
    if (location.state?.newChatUser) {
      const newUser = location.state.newChatUser;
      
      setChats(prev => {
        const existingChat = prev.find(c => c.name === newUser.name);
        if (existingChat) {
          setTimeout(() => setActiveChat(existingChat.id), 0);
          return prev;
        } else {
          const newChat = {
            id: Date.now(),
            name: newUser.name,
            avatar: newUser.avatar || `https://ui-avatars.com/api/?name=${newUser.name}&background=0ea5e9&color=fff`,
            lastMessage: '',
            time: 'Hozir',
            type: 'personal'
          };
          setTimeout(() => setActiveChat(newChat.id), 0);
          return [newChat, ...prev];
        }
      });
      
      // Clear state so it doesn't run again on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  // Fetch initial messages and subscribe
  useEffect(() => {
    if (!activeChat) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', activeChat)
        .order('created_at', { ascending: true });
        
      if (!error && data) {
        setMessages(data);
        scrollToBottom();
      }
    };

    fetchMessages();

    const subscription = supabase
      .channel(`chat_${activeChat}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `chat_id=eq.${activeChat}`
      }, payload => {
        setMessages(current => [...current, payload.new]);
        setTimeout(scrollToBottom, 100);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [activeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activeChat) return;

    if (!user) {
      alert(t('messenger.alertLogin', "Xabar yuborish uchun tizimga kiring! (Tepadagi tugma orqali)"));
      return;
    }
    
    const msgText = message;
    setMessage('');

    try {
      const { error } = await supabase.from('messages').insert([
        {
          chat_id: activeChat,
          sender_name: user.name,
          sender_avatar: user.avatar,
          text_content: msgText
        }
      ]);

      if (error) throw error;
    } catch (err) {
      console.error('Xabar yuborishda xatolik:', err);
      alert(t('messenger.alertError', "Xatolik: Xabar yuborilmadi! Baza sozlamalarini tekshiring."));
    }
  };

  return (
    <div className="pt-16 h-screen bg-white flex flex-col">
      <div className="flex-1 flex overflow-hidden w-full max-w-[1600px] mx-auto shadow-sm">
        
        {/* Chat List (Sidebar) */}
        <div className={`w-full md:w-[380px] bg-white border-r border-gray-200 flex flex-col shrink-0 ${activeChat ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-white h-14 shrink-0">
            <h2 className="text-lg font-bold text-gray-800 ml-2">{t('messenger.title')}</h2>
            <button 
              onClick={() => {
                const groupName = prompt("Guruh nomini kiriting:");
                if (groupName) {
                  const members = prompt("Guruhga qaysi do'stlaringizni qo'shasiz? (Ismlarini vergul bilan ajratib yozing)");
                  const newGroup = {
                    id: Date.now(),
                    name: groupName,
                    avatar: `https://ui-avatars.com/api/?name=${groupName}&background=047857&color=fff`,
                    lastMessage: members ? `${members} guruhga qo'shildi` : 'Yangi guruh ochildi',
                    time: 'Hozir',
                    type: 'group'
                  };
                  setChats(prev => [newGroup, ...prev]);
                  setTimeout(() => setActiveChat(newGroup.id), 0);
                }
              }}
              className="w-8 h-8 rounded-full text-emerald-600 flex items-center justify-center hover:bg-emerald-50 transition-colors"
              title="Yangi guruh ochish"
            >
              <Plus size={18} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {chats.map(chat => {
              const isActive = activeChat === chat.id;
              return (
                <div 
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className={`flex items-center gap-3 p-3 mx-2 my-1 rounded-xl cursor-pointer transition-colors ${isActive ? 'bg-emerald-600 text-white' : 'hover:bg-gray-100 text-gray-900'}`}
                >
                  <div className="relative shrink-0">
                    <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                    {chat.type === 'group' && (
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white ${isActive ? 'bg-white text-emerald-600' : 'bg-emerald-600 text-white'}`}>
                        <Users size={10} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className={`font-bold text-sm truncate ${isActive ? 'text-white' : 'text-gray-900'}`}>{chat.name}</h4>
                      <span className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>{chat.time}</span>
                    </div>
                    <p className={`text-sm truncate ${isActive ? 'text-white/80' : 'text-gray-500'}`}>{chat.lastMessage}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 bg-[#d8e3da] flex flex-col relative ${!activeChat ? 'hidden md:flex' : 'flex'}`}>
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="h-14 bg-white border-b border-gray-200 flex items-center px-4 shrink-0 z-10 shadow-sm">
                <button 
                  onClick={() => setActiveChat(null)}
                  className="md:hidden mr-3 text-gray-500 hover:text-gray-800"
                >
                  <ArrowLeft size={20} />
                </button>
                <img src={chats.find(c => c.id === activeChat)?.avatar} className="w-10 h-10 rounded-full mr-3 object-cover" />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{chats.find(c => c.id === activeChat)?.name}</h3>
                  <p className="text-xs text-emerald-600 font-medium">{t('messenger.online')}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center w-full flex justify-center mt-10">
                    <span className="text-gray-500 text-sm bg-white/50 px-4 py-1 rounded-full shadow-sm">{t('messenger.noMessages')}</span>
                  </div>
                )}
                {messages.map((msg) => {
                  const isMe = user?.name === msg.sender_name;
                  const timeStr = new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  
                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={msg.id} 
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isMe && (
                        <img src={msg.sender_avatar} alt={msg.sender_name} className="w-8 h-8 rounded-full mr-2 mt-auto mb-1 object-cover shrink-0" />
                      )}
                      <div className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-4 py-2 text-[15px] leading-relaxed shadow-sm relative min-w-[80px] ${
                        isMe 
                          ? 'bg-[#effdde] text-gray-900 rounded-br-sm' 
                          : 'bg-white text-gray-900 rounded-bl-sm'
                      }`}>
                        {!isMe && <span className="text-[13px] font-bold block mb-0.5 text-emerald-600">{msg.sender_name}</span>}
                        <p className="pb-3 pr-4">{msg.text_content}</p>
                        <span className={`text-[10px] absolute bottom-1.5 right-2 ${isMe ? 'text-green-700/70' : 'text-gray-400'}`}>
                          {timeStr}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="bg-white p-2 md:p-3 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
                <form onSubmit={handleSend} className="flex gap-2 items-center max-w-4xl mx-auto">
                  <button type="button" className="text-gray-400 hover:text-emerald-600 transition-colors p-2 shrink-0">
                    <ImageIcon size={24} />
                  </button>
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('messenger.typeMessage', "Xabar yozing...")}
                    className="flex-1 bg-[#f4f4f5] rounded-full px-5 py-3 focus:outline-none focus:bg-gray-100 focus:ring-1 focus:ring-emerald-500 transition-all text-[15px]"
                  />
                  <button 
                    type="submit"
                    disabled={!message.trim()}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all ${message.trim() ? 'bg-emerald-600 text-white shadow-md' : 'bg-transparent text-gray-400'}`}
                  >
                    <Send size={20} className={message.trim() ? 'ml-1' : ''} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <div className="bg-white/50 p-6 rounded-full mb-4 shadow-sm">
                <MessageCircle size={48} className="opacity-50" />
              </div>
              <p className="font-medium bg-white/50 px-4 py-1 rounded-full shadow-sm">{t('messenger.selectChat')}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
