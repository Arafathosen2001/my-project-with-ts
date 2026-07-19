'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { RouteShell } from '../components/RouteShell';
import { EmptySection, ErrorSection, LoadingSection } from '../components/PageStatus';
import { fetchItems, getFeaturedItems, type MarketplaceItem } from '../lib/marketplace';

const highlights = [
  { title: 'Verified makers', text: 'Every seller is reviewed and supported by the community.' },
  { title: 'Fast delivery', text: 'Curated dispatch with clear updates from box to doorstep.' },
  { title: 'Thoughtful curation', text: 'Find pieces selected for durability, design, and story.' },
];

const stats = [
  { value: '2.8k+', label: 'active buyers' },
  { value: '97%', label: 'repeat orders' },
  { value: '24h', label: 'average response' },
];

export default function HomePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await fetchItems();
      setItems(data);
    } catch {
      setError('Could not load featured listings. Please try again.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  const featuredItems = getFeaturedItems(items);

  return (
    <RouteShell
      title="Discover artisan pieces that feel personal"
      description="Browse support-worthy makers, thoughtful home accents, and hand-finished goods in one focused marketplace."
    >
      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <h2 className="text-2xl font-semibold">Why shoppers love this space</h2>
          {loading ? (
            <div className="mt-5">
              <LoadingSection message="Loading featured listings..." />
            </div>
          ) : error ? (
            <div className="mt-5">
              <ErrorSection message={error} onRetry={() => void loadItems()} />
            </div>
          ) : featuredItems.length > 0 ? (
            <ul className="mt-5 space-y-3 text-slate-300">
              {featuredItems.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3"
                >
                  <span>
                    {item.title} · {item.category}
                  </span>
                  <Link
                    href={`/projects/${item._id}`}
                    className="ml-4 px-3 py-1 rounded-full bg-amber-400 text-slate-900 text-sm font-semibold hover:bg-amber-500 transition"
                  >
                    View Details
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-5">
              <EmptySection
                message="No featured listings yet."
                actionLabel="Browse all listings"
                actionHref="/listings"
              />
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-amber-400/20 bg-amber-500/10 p-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-300">This week’s spotlight</p>
          <h3 className="mt-3 text-2xl font-semibold">A hand-thrown ceramic collection</h3>
          <p className="mt-3 text-slate-300">
            Freshly fired pieces are now available, each one shaped to feel at home in everyday rituals.
          </p>
          <Link href="/listings" className="mt-6 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-amber-300">
            Browse the collection
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Growth snapshot</p>
            <h2 className="mt-2 text-2xl font-semibold">Trusted by makers and thoughtful buyers alike</h2>
          </div>
          <Link href="/about" className="text-sm font-semibold text-amber-300">Learn more about the mission</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
              <p className="text-3xl font-semibold text-amber-300">{item.value}</p>
              <p className="mt-1 text-sm text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </RouteShell>
  );
}
