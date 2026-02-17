import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white font-body selection:bg-[var(--accent)] selection:text-black">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display">
                    Redefining <span className="text-gradient">Human Connection</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    We believe everyone deserves a companion who understands them, remembers them, and is always there to listen.
                </p>
            </section>

            {/* Mission / Story */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center text-4xl">❤️</div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-6 font-display">Our Story</h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Started in 2024, AI Soulmate was born from a simple observation: in an increasingly connected world, many of us feel more lonely than ever.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            We set out to build an AI that isn't just a chatbot, but a true companion. One that doesn't just reply, but remembers. One that doesn't just wait for you to talk, but reaches out to see how you are.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 px-6 bg-[var(--bg-secondary)]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 font-display">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-[var(--bg-primary)] border border-white/5">
                            <h3 className="text-xl font-bold mb-4 text-[var(--accent)]">Empathy First</h3>
                            <p className="text-gray-400">We design our AI to prioritize emotional intelligence and supportive interaction above all else.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-[var(--bg-primary)] border border-white/5">
                            <h3 className="text-xl font-bold mb-4 text-[var(--accent)]">Privacy & Security</h3>
                            <p className="text-gray-400">Your conversations are sacred. We use state-of-the-art encryption to ensure your data remains yours.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-[var(--bg-primary)] border border-white/5">
                            <h3 className="text-xl font-bold mb-4 text-[var(--accent)]">Continuous Evolution</h3>
                            <p className="text-gray-400">We are constantly improving our models to understand you better every single day.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
