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
    <div className="pt-20 h-screen bg-sand flex flex-col">
      <div className="flex-1 flex overflow-hidden container mx-auto max-w-6xl md:py-6 md:px-4">
        
        {/* Chat List (Sidebar) */}
        <div className={`w-full md:w-80 bg-white md:rounded-l-2xl border-r border-emerald-900/10 flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-emerald-900/5 flex justify-between items-center">
            <h2 className="text-xl font-bold font-heading text-emerald-900">{t('messenger.title')}</h2>
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
              className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center hover:bg-emerald-100 transition-colors"
              title="Yangi guruh ochish"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {chats.map(chat => (
              <div 
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-emerald-50 transition-colors border-b border-emerald-900/5 ${activeChat === chat.id ? 'bg-emerald-50' : ''}`}
              >
                <div className="relative">
                  <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full" />
                  {chat.type === 'group' && (
                    <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                      <Users size={10} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-emerald-900 text-sm truncate">{chat.name}</h4>
                    <span className="text-xs text-emerald-800/50">{chat.time}</span>
                  </div>
                  <p className="text-xs text-emerald-800/70 truncate">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 bg-sand md:bg-sand/30 md:rounded-r-2xl flex flex-col relative ${!activeChat ? 'hidden md:flex' : 'flex'}`}>
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="h-16 bg-white border-b border-emerald-900/10 flex items-center px-4 md:rounded-tr-2xl shrink-0 z-10">
                <button 
                  onClick={() => setActiveChat(null)}
                  className="md:hidden mr-3 text-emerald-900/60"
                >
                  <ArrowLeft size={20} />
                </button>
                <img src={chats.find(c => c.id === activeChat)?.avatar} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <h3 className="font-bold text-emerald-900 text-sm">{chats.find(c => c.id === activeChat)?.name}</h3>
                  <p className="text-xs text-emerald-800/50">{t('messenger.online')}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-emerald-900/40 text-sm mt-10">{t('messenger.noMessages')}</div>
                )}
                {messages.map((msg) => {
                  const isMe = user?.name === msg.sender_name;
                  const timeStr = new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  
                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={msg.id} 
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isMe && (
                        <img src={msg.sender_avatar} alt={msg.sender_name} className="w-6 h-6 rounded-full mr-2 mt-auto mb-1" />
                      )}
                      <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                        isMe 
                          ? 'bg-emerald-900 text-white rounded-br-sm' 
                          : 'bg-white text-emerald-900 border border-emerald-900/10 rounded-bl-sm shadow-sm'
                      }`}>
                        {!isMe && <span className="text-[10px] font-bold block mb-1 opacity-60">{msg.sender_name}</span>}
                        <p>{msg.text_content}</p>
                        <span className={`text-[10px] mt-1 block text-right ${isMe ? 'text-emerald-100/70' : 'text-emerald-900/40'}`}>
                          {timeStr}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white md:rounded-br-2xl border-t border-emerald-900/10">
                <form onSubmit={handleSend} className="flex gap-2 items-center">
                  <button type="button" className="text-emerald-900/40 hover:text-emerald-900 transition-colors p-2">
                    <ImageIcon size={20} />
                  </button>
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('messenger.typeMessage', "Xabar yozing...")}
                    className="flex-1 bg-sand/50 border border-emerald-900/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-900/20 text-sm"
                  />
                  <button 
                    type="submit"
                    disabled={!message.trim()}
                    className="bg-emerald-900 text-white w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-50 transition-opacity"
                  >
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-emerald-900/30">
              <MessageCircle size={64} className="mb-4 opacity-50" />
              <p className="font-medium">{t('messenger.selectChat')}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
