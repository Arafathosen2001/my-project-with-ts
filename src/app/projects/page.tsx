'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { RouteShell } from '../components/RouteShell';
import { EmptySection, ErrorSection, LoadingGrid } from '../components/PageStatus';
import { authClient } from '../lib/auth-client';

export interface MarketplaceItem {
  _id: string;
  title: string;
  category: string;
  fullDescription: string;
  ownerId: string;
}

export default function ProjectsPage() {
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
      setError('Could not load your projects. Please try again.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  if (!user) {
    return (
      <RouteShell title="Access required" description="Please sign in to view your projects.">
        <EmptySection
          message="You need an active session to access this page."
          actionLabel="Sign in"
          actionHref="/signin?redirect=/projects&message=login-required"
        />
      </RouteShell>
    );
  }

  return (
    <RouteShell
      title="Project overview"
      description="A dedicated landing page for your own project-based browsing and detail views."
    >
      {loading ? (
        <LoadingGrid count={2} />
      ) : error ? (
        <ErrorSection message={error} onRetry={() => void loadItems()} />
      ) : items.length === 0 ? (
        <EmptySection
          message="You have not published any projects yet."
          actionLabel="Add your first project"
          actionHref="/add-project"
        />
      ) : (
        <section className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item._id}
              className="rounded-3xl border border-white/10 bg-slate-900/70 p-8"
            >
              <p className="text-sm text-amber-300">{item.category}</p>
              <h2 className="mt-2 text-2xl font-semibold">{item.title}</h2>
              <p className="mt-4 text-slate-300">{item.fullDescription}</p>
              <Link
                href={`/projects/${item._id}`}
                className="mt-6 inline-flex text-sm font-semibold text-amber-300 hover:text-amber-200"
              >
                Read the story →
              </Link>
            </article>
          ))}
        </section>
      )}
    </RouteShell>
  );
}
