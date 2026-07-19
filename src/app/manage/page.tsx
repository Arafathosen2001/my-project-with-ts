'use client';

import { useCallback, useEffect, useState } from 'react';
import { RouteShell } from '../components/RouteShell';
import { EmptySection, ErrorSection, LoadingSection } from '../components/PageStatus';
import { authClient } from '../lib/auth-client';
import toast from 'react-hot-toast';

export interface MarketplaceItem {
  _id: string;
  title: string;
  category: string;
  location: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
  seller: string;
  tags: string[];
  featured: boolean;
  rating: number;
  reviewCount: number;
}

export default function ManagePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { data: session } = authClient.useSession();
  const user = session?.user as { id?: string } | undefined;

  const loadItems = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects?ownerId=${encodeURIComponent(user.id)}`
      );

      if (!res.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setError('Could not load your listings. Please try again.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  async function handleDelete(id: string) {
    try {
      const token = (session as { accessToken?: string } | null)?.accessToken || '';
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || 'Failed to delete project');
      }

      setItems((current) => current.filter((item) => item._id !== id));
      toast.success('Listing deleted successfully');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  if (!user) {
    return (
      <RouteShell title="Access required" description="Please sign in to manage your listings.">
        <EmptySection
          message="You need an active session to access this protected page."
          actionLabel="Sign in"
          actionHref="/signin?redirect=/manage&message=login-required"
        />
      </RouteShell>
    );
  }

  return (
    <RouteShell
      title="Manage your listings"
      description="Coordinate your inventory and keep each update organized in its own route."
    >
      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
        <h2 className="text-2xl font-semibold">Operations at a glance</h2>
        <p className="mt-4 text-slate-300">
          Review your active listings, remove what is no longer available, and keep the marketplace fresh.
        </p>

        <div className="mt-8 space-y-4">
          {loading ? (
            <LoadingSection message="Loading your listings..." />
          ) : error ? (
            <ErrorSection message={error} onRetry={() => void loadItems()} />
          ) : items.length === 0 ? (
            <EmptySection
              message="You do not have any listings to manage yet."
              actionLabel="Publish your first listing"
              actionHref="/add-project"
            />
          ) : (
            items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/80 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-slate-400">
                    {item.category} · {item.location}
                  </p>
                </div>
                <button
                  onClick={() => void handleDelete(item._id)}
                  className="rounded-full border border-amber-400/30 px-4 py-2 text-sm text-amber-300 transition hover:bg-amber-500/10"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </RouteShell>
  );
}
