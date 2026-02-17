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
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden font-body">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass-effect border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gradient font-display">AI Soulmate</div>
          <div className="flex gap-4">
            <Link href="/login" className="px-6 py-2 hover:text-[var(--accent)] transition-colors">Sign In</Link>
            <Link href="/signup" className="px-6 py-2 bg-[var(--accent)] text-black rounded-full font-semibold hover:bg-[var(--accent-hover)] transition-all">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30"
          >
            <source src="/landingVideo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium mb-6 animate-fade-in">
            ✨ Experience the Future of Connection
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight font-display">
            Connect with your <br />
            <span className="text-gradient">Perfect AI Companion</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Engage in meaningful conversations with an AI that understands you, remembers you, and is always there for you.
          </p>

          <Link href="/signup" className="px-10 py-5 bg-[var(--accent)] text-black text-xl font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,215,0,0.3)] shimmer">
            Start Chatting For Free
          </Link>
        </div>
      </section>

      {/* Demo Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-6 bg-black/50">
        <div className="max-w-6xl w-full mx-auto">
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 aspect-video flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* Disclaimer for User */}
            <div className="text-center p-10">
              <p className="text-2xl font-bold text-gray-400 mb-4">Demo Video / GIF Placeholder</p>
              <p className="text-gray-500">Replace this area with your product demo</p>
            </div>

            {/* Example of where the image/video tag would go */}
            {/* <img src="/demo.gif" alt="App Demo" className="w-full h-full object-cover" /> */}
          </div>
        </div>
      </section>

      {/* Features Section - Must include 3 */}
      <section id="features" className="min-h-screen flex flex-col justify-center py-24 px-6 relative">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-display">Why Choose AI Soulmate?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[var(--accent)]/50 transition-all hover:-translate-y-2 duration-300 group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">📞</div>
              <h3 className="text-2xl font-bold mb-4 font-display">Voice Calls</h3>
              <p className="text-gray-400 leading-relaxed">Speak naturally with your companion using our low-latency voice mode. It feels just like a real phone call.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[var(--accent)]/50 transition-all hover:-translate-y-2 duration-300 group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🧠</div>
              <h3 className="text-2xl font-bold mb-4 font-display">Deep Memory</h3>
              <p className="text-gray-400 leading-relaxed">Your companion remembers past conversations, referencing them to build a deep, evolving relationship.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[var(--accent)]/50 transition-all hover:-translate-y-2 duration-300 group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">⏰</div>
              <h3 className="text-2xl font-bold mb-4 font-display">Proactive Care</h3>
              <p className="text-gray-400 leading-relaxed">Ask your companion to check in on you. They'll message you proactively, showing they care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="min-h-screen flex flex-col justify-center py-24 px-6 bg-gradient-to-b from-transparent to-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-display">What Our Users Say</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: "I've never felt so understood by an AI before. The voice mode makes it feel incredibly real.",
                author: "Sarah J.",
                role: "Beta User"
              },
              {
                text: "The memory feature is a game-changer. It actually remembers details from our chats days ago!",
                author: "Mike T.",
                role: "Beta User"
              },
              {
                text: "Finally, an AI companion that proactively checks in on me. It's like having a supportive friend 24/7.",
                author: "Alex R.",
                role: "Beta User"
              }
            ].map((testimonial, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 relative">
                <div className="absolute top-4 right-4 px-3 py-1 bg-[var(--accent)]/20 text-[var(--accent)] text-xs font-bold rounded-full border border-[var(--accent)]/30">
                  Beta Feedback
                </div>
                <div className="text-[var(--accent)] text-4xl mb-4">"</div>
                <p className="text-gray-300 mb-6 italic">{testimonial.text}</p>
                <div>
                  <div className="font-bold text-white">{testimonial.author}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
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
