import Link from 'next/link';
import { RouteShell } from '../components/RouteShell';

const pillars = [
  'Verified makers with a clear story behind each product.',
  'A responsive experience designed for browsing on any device.',
  'Secure account-based publishing and management tools.',
];

export default function AboutPage() {
  return (
    <RouteShell
      title="A thoughtful marketplace for handcrafted goods"
      description="We connect customers with makers who build with care, patience, and a clear point of view."
    >
      <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <h2 className="text-2xl font-semibold">What makes this experience different</h2>
          <p className="mt-4 text-slate-300">
            Each collection is handpicked for quality, story, and long-term use. The route-based structure keeps browsing simple while preserving room for richer content over time.
          </p>
          <div className="mt-6 grid gap-3">
            {pillars.map((pillar) => (
              <div key={pillar} className="rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-sm text-slate-300">
                {pillar}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-amber-400/20 bg-amber-500/10 p-8">
          <h3 className="text-xl font-semibold">Built with modern foundations</h3>
          <ul className="mt-4 space-y-3 text-slate-300">
            <li>Next.js App Router navigation</li>
            <li>React Icons for expressive UI cues</li>
            <li>React Hot Toast for lightweight feedback</li>
          </ul>
          <Link href="/contact" className="mt-6 inline-flex text-sm font-semibold text-amber-300">Start a conversation →</Link>
        </div>
      </section>
    </RouteShell>
  );
}
