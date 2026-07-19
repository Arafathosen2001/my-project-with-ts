'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { RouteShell } from '../components/RouteShell';
import { EmptySection, ErrorSection, LoadingGrid } from '../components/PageStatus';

const pageSize = 6;

export interface MarketplaceItem {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  location: string;
  seller: string;
  tags: string[];
  featured: boolean;
  imageUrl?: string;
  rating: number;
  reviewCount: number;
  createdAt?: string;
}

export default function ListingsPage() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Newest');
  const [page, setPage] = useState(1);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`);

      if (!res.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setError('Could not load listings. Please try again.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const nextItems = items.filter((item) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${item.title} ${item.category} ${item.location}`.toLowerCase().includes(normalizedQuery);
      const matchesCategory = category === 'All' || item.category === category;
      return matchesQuery && matchesCategory;
    });

    const sorted = [...nextItems].sort((a, b) => {
      if (sort === 'Price: low to high') return a.price - b.price;
      if (sort === 'Price: high to low') return b.price - a.price;
      if (sort === 'Rating') return b.rating - a.rating;
      return new Date(b.createdAt ?? '').getTime() - new Date(a.createdAt ?? '').getTime();
    });

    return sorted;
  }, [category, items, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const visibleItems = filteredItems.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [query, category, sort]);

  return (
    <RouteShell
      title="Explore featured listings"
      description="Browse real handmade goods with filters, sorting, and a responsive collection view."
    >
      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
        <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, category, or location"
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none"
          />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none"
          >
            <option>All</option>
            <option value="Ceramics">Ceramics</option>
            <option value="Textiles">Textiles</option>
            <option value="Woodwork">Woodwork</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Home Decor">Home Decor</option>
          </select>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none"
          >
            <option>Newest</option>
            <option>Price: low to high</option>
            <option>Price: high to low</option>
            <option>Rating</option>
          </select>
        </div>
      </section>

      {loading ? (
        <LoadingGrid count={3} />
      ) : error ? (
        <ErrorSection message={error} onRetry={() => void loadItems()} />
      ) : visibleItems.length === 0 ? (
        <EmptySection
          message={
            items.length === 0
              ? 'No listings have been published yet.'
              : 'No listings match your search yet.'
          }
          actionLabel={items.length === 0 ? 'Publish a listing' : 'Browse all listings'}
          actionHref={items.length === 0 ? '/add-project' : '/listings'}
        />
      ) : (
        <>
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleItems.map((item) => (
              <article
                key={item._id}
                className="flex flex-col rounded-3xl border border-white/10 bg-slate-900/70 p-6"
              >
                {item.imageUrl && (
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="object-cover"
                    />
                  </div>
                )}
                <p className="text-sm text-amber-300">{item.category}</p>
                <h2 className="mt-2 text-xl font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm text-slate-300">{item.shortDescription}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-lg font-semibold">${item.price}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300">
                    {item.location}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                  <span>⭐ {item.rating}</span>
                  <span>{item.reviewCount} reviews</span>
                </div>
                <Link
                  href={`/projects/${item._id}`}
                  className="mt-6 inline-flex text-sm font-semibold text-amber-300 hover:text-amber-200"
                >
                  View details →
                </Link>
              </article>
            ))}
          </section>

          <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-900/70 p-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((current) => current - 1)}
              className="rounded-full border border-white/10 px-4 py-2 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <p className="text-sm text-slate-400">
              Page {page} of {totalPages}
            </p>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((current) => current + 1)}
              className="rounded-full border border-white/10 px-4 py-2 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </RouteShell>
  );
}
