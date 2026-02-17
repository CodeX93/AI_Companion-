import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="py-16 px-6 border-t border-white/5 bg-black/40">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-sm">
                <div>
                    <div className="text-2xl font-bold text-gradient font-display mb-6">AI Soulmate</div>
                    <p className="text-gray-400 leading-relaxed">
                        Experience the future of connection with an AI that understands, remembers, and cares for you.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Product</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link href="/#features" className="hover:text-[var(--accent)] transition-colors">Features</Link></li>
                        <li><Link href="/pricing" className="hover:text-[var(--accent)] transition-colors">Pricing</Link></li>
                        <li><Link href="/dashboard" className="hover:text-[var(--accent)] transition-colors">Web App</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Company</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link href="/about" className="hover:text-[var(--accent)] transition-colors">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-[var(--accent)] transition-colors">Contact</Link></li>
                        <li><Link href="/blog" className="hover:text-[var(--accent)] transition-colors">Blog</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Legal</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link href="/privacy" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-[var(--accent)] transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} AI Soulmate. All rights reserved.</p>
            </div>
        </footer>
    );
}
