'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate generic API call
        setTimeout(() => {
            setStatus('success');
            // Reset after 3 seconds
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white font-body selection:bg-[var(--accent)] selection:text-black">
            <Navbar />

            <section className="pt-32 pb-10 px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display">
                    Get in <span className="text-gradient">Touch</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Have questions or feedback? We'd love to hear from you.
                </p>
            </section>

            <section className="py-10 px-6">
                <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-[var(--accent)] focus:outline-none transition-colors"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-[var(--accent)] focus:outline-none transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                            <textarea
                                id="message"
                                required
                                rows={5}
                                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-[var(--accent)] focus:outline-none transition-colors resize-none"
                                placeholder="How can we help you?"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'sending' || status === 'success'}
                            className="w-full py-4 bg-[var(--accent)] text-black font-bold rounded-xl hover:bg-[var(--accent-hover)] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                        </button>

                        {status === 'success' && (
                            <p className="text-green-500 text-center text-sm animate-fade-in">Thanks for reaching out! We'll get back to you soon.</p>
                        )}
                    </form>
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-500">Or email us directly at</p>
                    <a href="mailto:support@aisoulmate.com" className="text-[var(--accent)] hover:underline">support@aisoulmate.com</a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
