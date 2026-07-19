// components/NewsletterSection.tsx
'use client';
import { useState } from 'react';

export function NewsletterSection() {
    const [email, setEmail] = useState('');
    return (
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <h2 className="text-3xl font-bold">Newsletter</h2>
            <p className="mt-4 text-slate-300">Subscribe for updates and offers.</p>
            <form className="mt-6 flex flex-col md:flex-row justify-center gap-2 ">
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="px-4 py-2 rounded-full border border-white/10 w-full lg:w-2xl"
                />
                <button type="submit" className="px-6 py-2 rounded-full bg-amber-400 text-slate-900 font-semibold w-full lg:w-auto">
                    Subscribe
                </button>
            </form>
        </section>
    );
}
