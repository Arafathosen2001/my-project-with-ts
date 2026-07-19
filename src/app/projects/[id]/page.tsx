'use client';

import { useCallback, useEffect, useState, use } from 'react';
import { RouteShell } from '../../components/RouteShell';
import { EmptySection, ErrorSection, LoadingSection } from '../../components/PageStatus';
import toast from 'react-hot-toast';

export interface MarketplaceItem {
  _id: string;
  title: string;
  category: string;
  fullDescription: string;
  shortDescription: string;
  location: string;
  price: number;
  seller: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  imageUrl: string; // ✅ make sure imageUrl is included
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [item, setItem] = useState<MarketplaceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadItem = useCallback(async () => {
    setLoading(true);
    setError('');
    setItem(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`);
      if (res.status === 404) {
        setError('This listing could not be found.');
        return;
      }
      if (res.status === 400) {
        setError('This listing link is invalid.');
        return;
      }
      if (!res.ok) {
        throw new Error('Failed to fetch project');
      }
      const data = await res.json();
      setItem(data);
    } catch {
      setError('Could not load this listing. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void loadItem();
  }, [loadItem]);

  return (
    <RouteShell
      title={item?.title ?? 'Project details'}
      description={item?.shortDescription ?? 'A dedicated detail route for deeper views into each project or listing.'}
    >
      {loading ? (
        <LoadingSection message="Loading listing..." />
      ) : error ? (
        <ErrorSection
          message={error}
          onRetry={error.includes('try again') ? () => void loadItem() : undefined}
        />
      ) : item ? (
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full object-cover rounded-2xl mb-6"
              />
            )}
            <p className="text-sm text-amber-300">{item.category}</p>
            <h2 className="mt-2 text-3xl font-semibold">{item.title}</h2>
            <p className="mt-4 text-slate-300">{item.fullDescription}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {(item.tags ?? []).map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-amber-400/20 bg-amber-500/10 p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Seller</p>
            <h3 className="mt-2 text-2xl font-semibold">{item.seller}</h3>
            <p className="mt-3 text-slate-300">{item.location}</p>
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Price</span>
                <span className="font-semibold">${item.price}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Rating</span>
                <span className="font-semibold">{item.rating}/5</span>
              </div>
              <div className="flex justify-between">
                <span>Reviews</span>
                <span className="font-semibold">{item.reviewCount}</span>
              </div>
            </div>

            <button
              onClick={() => toast.success('This is a demo. No real purchase will be made.')}
              className="mt-6 w-full rounded-full bg-amber-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Buy Now
            </button>
          </div>
        </section>
      ) : (
        <EmptySection
          message="This listing is no longer available."
          actionLabel="Browse all listings"
          actionHref="/listings"
        />
      )}
    </RouteShell>
  );
}
