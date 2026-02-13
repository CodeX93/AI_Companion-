'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Companion } from '@/types';
import { motion } from 'framer-motion';

export default function DashboardClient({ user }: { user: any }) {
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanions();
  }, []);

  const fetchCompanions = async () => {
    try {
      const res = await fetch('/api/companions');
      const data = await res.json();
      setCompanions(data.companions || []);
    } catch (error) {
      console.error('Error fetching companions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this companion?')) return;

    try {
      await fetch(`/api/companions?id=${id}`, { method: 'DELETE' });
      setCompanions(companions.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting companion:', error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Your Companions</h1>
            <p className="text-[var(--text-secondary)]">Welcome back, {user.name}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="px-6 py-2 glass-effect hover:bg-[#2a2a2a] rounded-full transition-all"
          >
            Sign Out
          </button>
        </header>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : companions.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💫</div>
            <h2 className="text-2xl font-semibold mb-2">No Companions Yet</h2>
            <p className="text-[var(--text-secondary)] mb-8">Create your first AI companion to start chatting</p>
            <Link
              href="/companion/create"
              className="inline-block px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black font-semibold rounded-full transition-all transform hover:scale-105 shimmer"
            >
              Create Companion
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-6">
              <Link
                href="/companion/create"
                className="px-6 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black font-semibold rounded-full transition-all transform hover:scale-105 shimmer"
              >
                + New Companion
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companions.map((companion, index) => (
                <motion.div
                  key={companion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect rounded-2xl p-6 hover:border-[var(--accent)] transition-all group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent)] to-[#c29d2f] flex items-center justify-center text-3xl">
                        {companion.gender === 'female' ? '👩' : '👨'}
                      </div>
                      {(companion.unreadCount || 0) > 0 && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-black animate-bounce">
                          {companion.unreadCount}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{companion.name}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">{companion.age} years old</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div>
                      <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wide mb-1">Personality</p>
                      <div className="flex flex-wrap gap-1">
                        {companion.personality.traits.slice(0, 3).map(trait => (
                          <span key={trait} className="text-xs px-2 py-1 bg-[var(--accent)]/20 text-[var(--accent)] rounded-full">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wide mb-1">Appearance</p>
                      <p className="text-sm">{companion.appearance.hairColor} • {companion.appearance.eyeColor}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/companion/${companion.id}`}
                      className="flex-1 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black font-semibold rounded-lg transition-all text-center"
                    >
                      Chat
                    </Link>
                    <button
                      onClick={() => handleDelete(companion.id)}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
