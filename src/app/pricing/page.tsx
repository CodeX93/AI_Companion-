import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white font-body">
            <Navbar />

            <section className="pt-32 pb-20 px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display">
                    Simple <span className="text-gradient">Pricing</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Start for free, upgrade for more memory and voice time.
                </p>
            </section>

            <section className="py-10 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {/* Free Tier */}
                    <div className="p-8 rounded-3xl border border-white/10 bg-white/5 flex flex-col">
                        <h3 className="text-xl font-bold mb-2">Free</h3>
                        <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                        <p className="text-gray-400 mb-8 text-sm">Perfect for trying out your AI companion.</p>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex gap-3 text-sm text-gray-300">
                                <span className="text-[var(--accent)]">✓</span> 50 text messages/day
                            </li>
                            <li className="flex gap-3 text-sm text-gray-300">
                                <span className="text-[var(--accent)]">✓</span> Standard response speed
                            </li>
                            <li className="flex gap-3 text-sm text-gray-300">
                                <span className="text-[var(--accent)]">✓</span> Basic memory
                            </li>
                        </ul>
                        <Link href="/signup" className="block w-full py-3 rounded-xl border border-white/20 hover:bg-white/10 text-center transition-colors">
                            Get Started
                        </Link>
                    </div>

                    {/* Pro Tier (Highlighted) */}
                    <div className="p-8 rounded-3xl border border-[var(--accent)] bg-[var(--accent)]/5 flex flex-col relative transform md:-translate-y-4">
                        <div className="absolute top-0 right-0 bg-[var(--accent)] text-black text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">POPULAR</div>
                        <h3 className="text-xl font-bold mb-2 text-[var(--accent)]">Pro</h3>
                        <div className="text-4xl font-bold mb-6">$9.99<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                        <p className="text-gray-400 mb-8 text-sm">For those who want a deeper connection.</p>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex gap-3 text-sm text-white font-medium">
                                <span className="text-[var(--accent)]">✓</span> Unlimited text messages
                            </li>
                            <li className="flex gap-3 text-sm text-white font-medium">
                                <span className="text-[var(--accent)]">✓</span> 30 mins voice calls/month
                            </li>
                            <li className="flex gap-3 text-sm text-white font-medium">
                                <span className="text-[var(--accent)]">✓</span> Advanced long-term memory
                            </li>
                            <li className="flex gap-3 text-sm text-white font-medium">
                                <span className="text-[var(--accent)]">✓</span> Proactive check-ins
                            </li>
                        </ul>
                        <Link href="/signup?plan=pro" className="block w-full py-3 rounded-xl bg-[var(--accent)] text-black font-bold text-center hover:bg-[var(--accent-hover)] transition-colors shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                            Start 7-Day Free Trial
                        </Link>
                    </div>

                    {/* Ultimate Tier */}
                    <div className="p-8 rounded-3xl border border-white/10 bg-white/5 flex flex-col">
                        <h3 className="text-xl font-bold mb-2">Ultimate</h3>
                        <div className="text-4xl font-bold mb-6">$19.99<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                        <p className="text-gray-400 mb-8 text-sm">The complete experience with no limits.</p>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex gap-3 text-sm text-gray-300">
                                <span className="text-[var(--accent)]">✓</span> Everything in Pro
                            </li>
                            <li className="flex gap-3 text-sm text-gray-300">
                                <span className="text-[var(--accent)]">✓</span> Unlimited voice calls
                            </li>
                            <li className="flex gap-3 text-sm text-gray-300">
                                <span className="text-[var(--accent)]">✓</span> Custom voice generation
                            </li>
                            <li className="flex gap-3 text-sm text-gray-300">
                                <span className="text-[var(--accent)]">✓</span> Priority support
                            </li>
                        </ul>
                        <Link href="/signup?plan=ultimate" className="block w-full py-3 rounded-xl border border-white/20 hover:bg-white/10 text-center transition-colors">
                            Subscribe
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
