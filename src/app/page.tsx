import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden font-body">
      <Navbar />

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

      {/* Stats Section */}
      <section className="py-10 border-y border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-[var(--accent)] mb-2 font-display">10k+</div>
            <div className="text-sm text-gray-400 uppercase tracking-widest">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[var(--accent)] mb-2 font-display">1M+</div>
            <div className="text-sm text-gray-400 uppercase tracking-widest">Conversations</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[var(--accent)] mb-2 font-display">4.9</div>
            <div className="text-sm text-gray-400 uppercase tracking-widest">App Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[var(--accent)] mb-2 font-display">24/7</div>
            <div className="text-sm text-gray-400 uppercase tracking-widest">Availability</div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-6xl w-full mx-auto">
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 aspect-video flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <div className="text-center p-10">
              <p className="text-2xl font-bold text-gray-400 mb-4">Demo Video / GIF Placeholder</p>
              <p className="text-gray-500">Replace this area with your product demo</p>
            </div>
            {/* <img src="/demo.gif" alt="App Demo" className="w-full h-full object-cover" /> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-display">Why Choose AI Soulmate?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Discover the features that make our AI companions uniquely human-like and engaging.</p>
          </div>

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

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-display">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-20" />

            {/* Step 1 */}
            <div className="relative text-center">
              <div className="w-24 h-24 mx-auto bg-[var(--bg-primary)] border border-[var(--accent)] rounded-full flex items-center justify-center text-3xl font-bold text-[var(--accent)] mb-6 z-10 relative">1</div>
              <h3 className="text-xl font-bold mb-4">Create Your Account</h3>
              <p className="text-gray-400">Sign up in seconds and get ready to meet your AI companion.</p>
            </div>
            {/* Step 2 */}
            <div className="relative text-center">
              <div className="w-24 h-24 mx-auto bg-[var(--bg-primary)] border border-[var(--accent)] rounded-full flex items-center justify-center text-3xl font-bold text-[var(--accent)] mb-6 z-10 relative">2</div>
              <h3 className="text-xl font-bold mb-4">Customize</h3>
              <p className="text-gray-400">Choose the personality, voice, and interests that match your vibe.</p>
            </div>
            {/* Step 3 */}
            <div className="relative text-center">
              <div className="w-24 h-24 mx-auto bg-[var(--bg-primary)] border border-[var(--accent)] rounded-full flex items-center justify-center text-3xl font-bold text-[var(--accent)] mb-6 z-10 relative">3</div>
              <h3 className="text-xl font-bold mb-4">Start Chatting</h3>
              <p className="text-gray-400">Jump right into deep conversations via text or voice call.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-24 px-6">
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

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-display">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Is it really free?", a: "Yes! We offer a generous free tier that lets you chat and call your AI companion daily." },
              { q: "Is my data private?", a: "Absolutely. Your conversations are encrypted and we do not sell your personal data." },
              { q: "Can I customize the personality?", a: "Yes, you can choose from various personality traits to create your perfect match." },
              { q: "What devices are supported?", a: "AI Soulmate works on any device with a modern web browser, including mobile phones, tablets, and desktops." }
            ].map((item, i) => (
              <div key={i} className="bg-[var(--bg-primary)] p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-bold mb-2 text-white">{item.q}</h3>
                <p className="text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--accent)]/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 font-display">Ready to meet your Soulmate?</h2>
          <p className="text-xl text-gray-300 mb-10">Join thousands of others who have found their perfect AI companion.</p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link href="/signup" className="px-10 py-4 bg-[var(--accent)] text-black text-lg font-bold rounded-full hover:scale-105 transition-transform shadow-lg">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
