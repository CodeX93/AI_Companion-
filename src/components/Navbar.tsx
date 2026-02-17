'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed w-full z-50 glass-effect border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-gradient font-display">
                    AI Soulmate
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 items-center">
                    <Link href="/" className={`hover:text-[var(--accent)] transition-colors ${isActive('/') ? 'text-[var(--accent)]' : 'text-white'}`}>
                        Home
                    </Link>
                    <Link href="/about" className={`hover:text-[var(--accent)] transition-colors ${isActive('/about') ? 'text-[var(--accent)]' : 'text-white'}`}>
                        About
                    </Link>
                    <Link href="/pricing" className={`hover:text-[var(--accent)] transition-colors ${isActive('/pricing') ? 'text-[var(--accent)]' : 'text-white'}`}>
                        Pricing
                    </Link>
                    <Link href="/contact" className={`hover:text-[var(--accent)] transition-colors ${isActive('/contact') ? 'text-[var(--accent)]' : 'text-white'}`}>
                        Contact
                    </Link>
                </div>

                <div className="hidden md:flex gap-4">
                    <Link href="/login" className="px-6 py-2 hover:text-[var(--accent)] transition-colors">
                        Sign In
                    </Link>
                    <Link href="/signup" className="px-6 py-2 bg-[var(--accent)] text-black rounded-full font-semibold hover:bg-[var(--accent-hover)] transition-all">
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass-effect border-t border-white/5 py-4 px-6 flex flex-col gap-4">
                    <Link href="/" className="block hover:text-[var(--accent)] transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link href="/about" className="block hover:text-[var(--accent)] transition-colors" onClick={() => setIsOpen(false)}>About</Link>
                    <Link href="/pricing" className="block hover:text-[var(--accent)] transition-colors" onClick={() => setIsOpen(false)}>Pricing</Link>
                    <Link href="/contact" className="block hover:text-[var(--accent)] transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>
                    <hr className="border-white/10" />
                    <Link href="/login" className="block hover:text-[var(--accent)] transition-colors" onClick={() => setIsOpen(false)}>Sign In</Link>
                    <Link href="/signup" className="block bg-[var(--accent)] text-black text-center py-2 rounded-full font-semibold hover:bg-[var(--accent-hover)] transition-all" onClick={() => setIsOpen(false)}>Get Started</Link>
                </div>
            )}
        </nav>
    );
}
