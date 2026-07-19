import Link from 'next/link';
import type { ReactNode } from 'react';

export function LoadingSection({ message = 'Loading...' }: { message?: string }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
        <p className="text-slate-300">{message}</p>
      </div>
    </section>
  );
}

export function LoadingGrid({ count = 3 }: { count?: number }) {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="h-56 animate-pulse rounded-3xl border border-white/10 bg-slate-900/70"
        />
      ))}
    </section>
  );
}

export function ErrorSection({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <section className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-8">
      <p className="text-rose-300">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-full border border-rose-400/30 px-4 py-2 text-sm text-rose-300 transition hover:bg-rose-500/10"
        >
          Try again
        </button>
      ) : null}
    </section>
  );
}

export function EmptySection({
  message,
  actionLabel,
  actionHref,
  children,
}: {
  message: string;
  actionLabel?: string;
  actionHref?: string;
  children?: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
      <p className="text-slate-400">{message}</p>
      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="mt-4 inline-flex text-sm font-semibold text-amber-300 hover:text-amber-200"
        >
          {actionLabel}
        </Link>
      ) : null}
      {children}
    </section>
  );
}
