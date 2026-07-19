'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { RouteShell } from '../components/RouteShell';
import { authClient } from '../lib/auth-client';

const initialForm = {
  title: '',
  shortDescription: '',
  fullDescription: '',
  price: '',
  category: '',
  location: '',
  seller: '',
  tags: '',
  featured: false,
  imageUrl: '',
};

export default function AddProjectPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const { data: session } = authClient.useSession();
  const user = session?.user as any;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    const payload = {
      title: form.title,
      shortDescription: form.shortDescription,
      fullDescription: form.fullDescription,
      price: Number(form.price),
      category: form.category,
      location: form.location,
      seller: form.seller || user?.name || 'You',
      tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      featured: form.featured,
      imageUrl: form.imageUrl,
      rating: 0,
      reviewCount: 0,
      specifications: [],
      ownerId: user?.id,
    };


    try {
      const token: string = (session as any)?.accessToken || '';
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to publish project');
      }

      await res.json();
      setMessage('Listing published successfully.');
      setForm(initialForm);
      router.push('/listings');
    } catch (error: any) {
      setMessage(error.message || 'Something went wrong.');
    }
  }

  if (!user) {
    return (
      <RouteShell title="Access required" description="Please sign in to publish a listing.">
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <p className="text-slate-300">You need an active session to access this protected page.</p>
        </section>
      </RouteShell>
    );
  }

  return (
    <RouteShell
      title="Add a new project"
      description="Create a fresh listing and bring your next handmade idea into the spotlight."
    >
      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
        <h2 className="text-2xl font-semibold">Ready to publish?</h2>
        <p className="mt-4 text-slate-300">
          Add a handcrafted item, share your story, and make it visible across the marketplace routes.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          <input
            required
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none"
            placeholder="Listing title"
          />
          <select
            required
            value={form.category}
            onChange={(event) =>
              setForm((current) => ({ ...current, category: event.target.value }))
            }
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none"
          >
            <option value="" disabled>Select category</option>
            <option value="Ceramics">Ceramics</option>
            <option value="Textiles">Textiles</option>
            <option value="Woodwork">Woodwork</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Home Decor">Home Decor</option>
          </select>

          <input
            required
            value={form.price}
            type="number"
            min="0"
            onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none"
            placeholder="Price"
          />
          <input
            required
            value={form.location}
            onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none"
            placeholder="Location"
          />
          <input
            value={form.seller}
            onChange={(event) => setForm((current) => ({ ...current, seller: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none"
            placeholder="Seller name"
          />
          <input
            value={form.tags}
            onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none"
            placeholder="Tags (comma separated)"
          />
          <input
            required
            value={form.imageUrl}
            onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none"
            placeholder="Image URL"
          />
          <textarea
            required
            value={form.shortDescription}
            onChange={(event) => setForm((current) => ({ ...current, shortDescription: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none md:col-span-2"
            placeholder="Short description"
            rows={3}
          />
          <textarea
            required
            value={form.fullDescription}
            onChange={(event) => setForm((current) => ({ ...current, fullDescription: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none md:col-span-2"
            placeholder="Full description"
            rows={4}
          />
          <label className="flex items-center gap-3 text-sm text-slate-300 md:col-span-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))}
              className="h-4 w-4 rounded border-white/10 bg-slate-950"
            />
            Feature this listing on the home page
          </label>

          <button
            type="submit"
            className="rounded-full bg-amber-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-400 md:col-span-2"
          >
            Publish listing
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-amber-300">{message}</p> : null}
      </section>
    </RouteShell>
  );
}
