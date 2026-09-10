import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Users, MessageCircle, Plus, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';



const DESTINATIONS = [
  "Farg'ona (Tog', Tabiat)",
  'Qo\'qon (Tarixiy joylar)',
  'Marg\'ilon (Hunarmandchilik)',
  'Farg\'ona shahri (Markaz)',
  'Rishton (Kulolchilik)'
];

export const Companions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [posts, setPosts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ destination: DESTINATIONS[0], date: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPosts();

    // Real-time obuna
    const subscription = supabase
      .channel('public:companion_posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'companion_posts' }, payload => {
        const newRecord = payload.new;
        setPosts(current => [{
          id: newRecord.id,
          user: { name: newRecord.user_name, avatar: newRecord.user_avatar },
          destination: newRecord.destination,
          date: newRecord.travel_date,
          text: newRecord.content_text,
          participants: newRecord.participants
        }, ...current]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('companion_posts')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      if (data) {
        const formatted = data.map(p => ({
          id: p.id,
          user: { name: p.user_name, avatar: p.user_avatar },
          destination: p.destination,
          date: p.travel_date,
          text: p.content_text,
          participants: p.participants
        }));
        setPosts(formatted);
      }
    } catch (err) {
      console.error('Xatolik:', err);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert(t('companions.alertLogin', "Oldin tizimga kiring!"));
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase.from('companion_posts').insert([
        {
          user_name: user.name,
          user_avatar: user.avatar,
          destination: newPost.destination,
          travel_date: newPost.date,
          content_text: newPost.text,
          participants: 1
        }
      ]);

      if (error) throw error;

      setIsModalOpen(false);
      setNewPost({ destination: DESTINATIONS[0], date: '', text: '' });
    } catch (err) {
      console.error('Qo\'shishda xatolik:', err);
      alert(t('companions.alertError', "Xatolik yuz berdi, iltimos qayta urinib ko'ring."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessage = (postUser: any) => {
    navigate('/messenger', { state: { newChatUser: postUser } });
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-sand">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-heading text-emerald-900 mb-2">{t('companions.title')}</h1>
            <p className="text-emerald-800/70">{t('companions.subtitle')}</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-900 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-emerald-800 transition-colors shadow-lg"
          >
            <Plus size={20} />
            {t('companions.postAd')}
          </button>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          <AnimatePresence>
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-900/5 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <img src={post.user.avatar} alt={post.user.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <h3 className="font-bold text-emerald-900">{post.user.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-emerald-800/60 mt-1">
                        <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
                          <MapPin size={12} /> {post.destination}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={12} /> {post.participants} {t('companions.people')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-emerald-900/80 mb-6">{post.text}</p>

                <div className="flex justify-end gap-3 border-t border-emerald-50 pt-4">
                  <button 
                    onClick={() => handleMessage(post.user)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors"
                  >
                    <MessageCircle size={16} />
                    {t('companions.message')}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold font-heading text-emerald-900">{t('companions.newAd')}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-emerald-900/50 hover:text-emerald-900">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-900 mb-1">{t('companions.destination')}</label>
                  <select 
                    value={newPost.destination}
                    onChange={(e) => setNewPost({...newPost, destination: e.target.value})}
                    className="w-full border border-emerald-900/20 rounded-xl px-4 py-3 bg-sand/50 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-900/20"
                  >
                    {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-900 mb-1">{t('companions.date')}</label>
                  <input 
                    type="date" 
                    required
                    value={newPost.date}
                    onChange={(e) => setNewPost({...newPost, date: e.target.value})}
                    className="w-full border border-emerald-900/20 rounded-xl px-4 py-3 bg-sand/50 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-900/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-900 mb-1">{t('companions.messageLabel')}</label>
                  <textarea 
                    required
                    placeholder={t('companions.messagePlaceholder')}
                    value={newPost.text}
                    onChange={(e) => setNewPost({...newPost, text: e.target.value})}
                    rows={4}
                    className="w-full border border-emerald-900/20 rounded-xl px-4 py-3 bg-sand/50 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-900/20 resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-900 text-white rounded-xl py-3 font-medium hover:bg-emerald-800 transition-colors mt-4 disabled:opacity-50"
                >
                  {isLoading ? t('companions.posting') : t('companions.postButton')}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
