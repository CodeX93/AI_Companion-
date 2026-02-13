'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Companion, Message } from '@/types';

export default function ChatInterface({ companionId }: { companionId: string }) {
  const router = useRouter();
  const [companion, setCompanion] = useState<Companion | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Voice Call State
  const [isCalling, setIsCalling] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle');
  const [recognition, setRecognition] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCompanionAndMessages();
  }, [companionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Poll for scheduled messages (simulating cron locally)
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch('/api/cron/process-schedule');
        const data = await res.json();
        if (data.processed > 0) {
          // If we processed messages, refresh our chat
          fetchCompanionAndMessages();
        }
      } catch (e) {
        console.error("Polling error", e);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(pollInterval);
  }, [companionId]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const reco = new SpeechRecognition();
        reco.continuous = false;
        reco.interimResults = false;
        reco.lang = 'en-US';
        setRecognition(reco);
      }
    }
  }, []);

  // Voice Loop Logic
  useEffect(() => {
    if (!isCalling || !recognition) return;

    recognition.onstart = () => {
      if (voiceStatus !== 'speaking') setVoiceStatus('listening');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setVoiceStatus('processing');
      sendMessage(transcript, true); // Send message and indicate it's from voice
    };

    recognition.onend = () => {
      // If we are still calling and not speaking or processing, start listening again
      if (isCalling && voiceStatus === 'listening') {
        try {
          recognition.start();
        } catch (e) {
          // Already started or specific error
        }
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      if (event.error === 'not-allowed') {
        setIsCalling(false);
        alert("Microphone access denied.");
      }
      // If no speech/aborted, onend will trigger restart
    };

    if (voiceStatus === 'listening') {
      try {
        recognition.start();
      } catch (e) {
        // already started
      }
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isCalling, voiceStatus, recognition]);


  const startCall = () => {
    if (!recognition) {
      alert("Your browser does not support voice calling.");
      return;
    }
    setIsCalling(true);
    setVoiceStatus('listening');
  };

  const endCall = () => {
    setIsCalling(false);
    setVoiceStatus('idle');
    window.speechSynthesis.cancel();
    if (recognition) recognition.stop();
  };

  const speakResponse = (text: string) => {
    if (!isCalling) return;

    setVoiceStatus('speaking');
    const utterance = new SpeechSynthesisUtterance(text);

    // Attempt to pick a decent voice? Browser dependent.
    // For now, default is fine.

    utterance.onend = () => {
      if (isCalling) {
        setVoiceStatus('listening');
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchCompanionAndMessages = async () => {
    try {
      const [companionRes, messagesRes] = await Promise.all([
        fetch('/api/companions'),
        fetch(`/api/chat?companionId=${companionId}`),
      ]);

      const companionData = await companionRes.json();
      const messagesData = await messagesRes.json();

      const foundCompanion = companionData.companions?.find((c: Companion) => c.id === companionId);

      if (!foundCompanion) {
        router.push('/dashboard');
        return;
      }

      setCompanion(foundCompanion);
      setMessages(messagesData.messages || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const sendMessage = async (text: string, isVoice: boolean = false) => {
    if (!text.trim() || loading) return;

    setLoading(true);
    if (!isVoice) setInput('');

    const tempUserMessage: Message = {
      id: `temp-${Date.now()}`,
      companionId,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, tempUserMessage]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companionId,
          message: text,
        }),
      });

      if (!res.ok) throw new Error('Failed to send message');

      const data = await res.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        companionId,
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      let responseText = data.response;

      // Check for [CALL] tag
      if (responseText.includes('[CALL]')) {
        responseText = responseText.replace('[CALL]', '').trim();
        // Update the message content to remove the tag
        assistantMessage.content = responseText;
        // Trigger call
        startCall();
        // Use a slight timeout to allow state to settle? optional.
      }

      setMessages(prev => [...prev.filter(m => m.id !== tempUserMessage.id), tempUserMessage, { ...assistantMessage, content: responseText }]);

      if (isVoice && isCalling) {
        speakResponse(responseText);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => prev.filter(m => m.id !== tempUserMessage.id));
      if (!isVoice) alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!companion) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      {/* Voice Call Overlay */}
      {isCalling && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
        >
          <div className="relative mb-12">
            {/* Visualizer Circles */}
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-[var(--accent)] to-[#c29d2f] flex items-center justify-center text-6xl shadow-[0_0_50px_rgba(255,215,0,0.3)] 
                ${voiceStatus === 'listening' ? 'animate-pulse' : ''} 
                ${voiceStatus === 'speaking' ? 'animate-bounce' : ''}
             `}>
              {companion.gender === 'female' ? '👩' : '👨'}
            </div>
            {voiceStatus === 'listening' && (
              <div className="absolute inset-0 rounded-full border-2 border-[var(--accent)] opacity-50 animate-ping"></div>
            )}
          </div>

          <h2 className="text-3xl font-bold mb-4">{companion.name}</h2>
          <p className="text-[var(--text-secondary)] text-xl mb-12 animate-pulse">
            {voiceStatus === 'listening' && "Listening..."}
            {voiceStatus === 'processing' && "Thinking..."}
            {voiceStatus === 'speaking' && "Speaking..."}
            {voiceStatus === 'idle' && "Connecting..."}
          </p>

          <button
            onClick={endCall}
            className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full text-lg font-bold transition-all transform hover:scale-105"
          >
            End Call
          </button>
        </motion.div>
      )}

      {/* Header */}
      <header className="glass-effect border-b border-[var(--border)] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 hover:bg-[#2a2a2a] rounded-lg transition-all"
          >
            ← Back
          </button>
          <div className="flex-1 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-[#c29d2f] flex items-center justify-center text-2xl">
              {companion.gender === 'female' ? '👩' : '👨'}
            </div>
            <div>
              <h1 className="text-xl font-semibold">{companion.name}</h1>
              <p className="text-sm text-[var(--text-secondary)]">
                {companion.personality.traits.slice(0, 3).join(' • ')}
              </p>
            </div>
          </div>

          <button
            onClick={startCall}
            className="p-3 bg-[var(--accent)] text-black rounded-full hover:bg-[var(--accent-hover)] transition-all transform hover:scale-105 shimmer"
            title="Start Voice Call"
          >
            📞
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">{companion.gender === 'female' ? '👩' : '👨'}</div>
              <h2 className="text-2xl font-semibold mb-2">Start a conversation</h2>
              <p className="text-[var(--text-secondary)]">
                Say hello to {companion.name}!
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] px-6 py-4 rounded-2xl ${message.role === 'user'
                    ? 'bg-[var(--accent)] text-black'
                    : 'glass-effect'
                    }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))
          )}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="glass-effect px-6 py-4 rounded-2xl">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="glass-effect border-t border-[var(--border)] px-6 py-4">
        <div className="max-w-4xl mx-auto flex gap-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={`Message ${companion.name}...`}
            rows={1}
            className="flex-1 px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
            style={{ minHeight: '52px', maxHeight: '150px' }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black font-semibold rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shimmer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
