import Link from 'next/link';
import { RouteShell } from '../components/RouteShell';

export default function ContactPage() {
  return (
    <RouteShell
      title="Say hello to the team"
      description="Reach out for product questions, maker highlights, or collaborations that feel aligned with your audience."
    >
      <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <h2 className="text-2xl font-semibold">Let’s connect</h2>
          <p className="mt-4 text-slate-300">
            We’re happy to answer questions about orders, custom requests, and the stories behind each featured maker.
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <p>📧 hello@craftedmarket.com</p>
            <p>📞 +1 (555) 014-2058</p>
            <p>📍 128 River Street, Portland, OR</p>
          </div>
        </div>

        <div className="rounded-3xl border border-amber-400/20 bg-amber-500/10 p-8">
          <h3 className="text-xl font-semibold">Need support?</h3>
          <p className="mt-3 text-slate-300">Our support desk can help with account setup, listing questions, and order updates.</p>
          <Link href="/signin" className="mt-6 inline-flex text-sm font-semibold text-amber-300">Open your account →</Link>
        </div>
      </section>
    </RouteShell>
  );
}
