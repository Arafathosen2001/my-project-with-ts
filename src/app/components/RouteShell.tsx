import { type ReactNode } from 'react';
import { FaStar } from 'react-icons/fa';

export function RouteShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-2xl shadow-black/20">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-sm text-amber-300">
            <FaStar />
            Curated handmade finds
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">{description}</p>
        </div>
      </section>

      {children}
    </>
  );
}
