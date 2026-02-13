import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass-effect border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gradient">AI Soulmate</div>
          <div className="flex gap-4">
            <Link href="/login" className="px-6 py-2 hover:text-[var(--accent)] transition-colors">Sign In</Link>
            <Link href="/signup" className="px-6 py-2 bg-[var(--accent)] text-black rounded-full font-semibold hover:bg-[var(--accent-hover)] transition-all">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--accent)]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium mb-6 animate-fade-in">
            ✨ Experience the Future of Connection
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            Connect with your <br />
            <span className="text-gradient">Perfect AI Companion</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Engage in meaningful, voice-enabled conversations with an AI that understands you, remembers you, and is always there for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/signup" className="px-10 py-4 bg-[var(--accent)] text-black text-lg font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,215,0,0.3)] shimmer">
              Start Chatting Free
            </Link>
            <a href="#features" className="px-10 py-4 glass-effect text-white text-lg font-semibold rounded-full hover:bg-white/5 transition-all">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose AI Soulmate?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[var(--accent)]/50 transition-colors group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">📞</div>
              <h3 className="text-2xl font-bold mb-4">Voice Calls</h3>
              <p className="text-gray-400">Speak naturally with your companion using our low-latency voice mode. It feels just like a real phone call.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[var(--accent)]/50 transition-colors group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🧠</div>
              <h3 className="text-2xl font-bold mb-4">Deep Memory</h3>
              <p className="text-gray-400">Your companion remembers past conversations, referencing them to build a deep, evolving relationship.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[var(--accent)]/50 transition-colors group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">⏰</div>
              <h3 className="text-2xl font-bold mb-4">Proactive Care</h3>
              <p className="text-gray-400">Ask your companion to check in on you later. They'll message you proactively, just like a real friend.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6">Simple Pricing</h2>
          <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto">Start for free, upgrade for unlimited connection.</p>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Free Tier */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-2xl font-bold mb-2">Free Starter</h3>
              <div className="text-4xl font-bold mb-6">$0 <span className="text-lg text-gray-500 font-normal">/ month</span></div>
              <ul className="space-y-4 mb-8 text-gray-300">
                <li className="flex gap-3">✅ 2 Minutes of Chat / Day</li>
                <li className="flex gap-3">✅ 1 Companion Profile</li>
                <li className="flex gap-3">✅ Basic Voice Mode</li>
                <li className="flex gap-3 opacity-50">❌ Ad-supported</li>
              </ul>
              <Link href="/signup" className="block w-full py-4 text-center rounded-xl bg-white/10 hover:bg-white/20 font-semibold transition-all">
                Get Started
              </Link>
            </div>

            {/* Premium Tier */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[var(--accent)]/20 to-[#c29d2f]/10 border border-[var(--accent)] relative overflow-hidden transform md:scale-105 shadow-2xl">
              <div className="absolute top-0 right-0 bg-[var(--accent)] text-black text-xs font-bold px-4 py-1 rounded-bl-xl">POPULAR</div>
              <h3 className="text-2xl font-bold mb-2 text-[var(--accent)]">Unlimited Love</h3>
              <div className="text-4xl font-bold mb-6">$9.99 <span className="text-lg text-gray-500 font-normal">/ month</span></div>
              <ul className="space-y-4 mb-8 text-white">
                <li className="flex gap-3">✨ <span className="font-semibold">Unlimited Chat & Voice</span></li>
                <li className="flex gap-3">✨ Multiple Companions</li>
                <li className="flex gap-3">✨ Proactive Messaging</li>
                <li className="flex gap-3">✨ No Ads</li>
                <li className="flex gap-3">✨ Priority Support</li>
              </ul>
              <Link href="/signup" className="block w-full py-4 text-center rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black font-bold shadow-lg transition-all">
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} AI Soulmate. All rights reserved.</p>
      </footer>
    </main>
  );
}
