// components/HeroSection.tsx
'use client';
import Link from 'next/link';

export function HeroSection() {
    return (
        <section className="h-[65vh] flex flex-col items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700 text-white text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Discover Artisan Pieces</h1>
            <p className="mt-4 text-lg md:text-xl max-w-xl">
                Thoughtful design, curated collections, and verified makers.
            </p>
            <div className="mt-6 flex gap-4">
                <Link href="/listings" className="px-6 py-3 rounded-full bg-amber-400 text-slate-900 font-semibold">
                    Browse Collection
                </Link>
                <Link href="/about" className="px-6 py-3 rounded-full border border-white/30 font-semibold">
                    Learn More
                </Link>
            </div>
        </section>
    );
}
