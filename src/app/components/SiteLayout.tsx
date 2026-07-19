'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  FaBars,
  FaTimes,
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaList,
  FaPlus,
  FaShoppingBag,
  FaUser,
  FaUserLock,
} from 'react-icons/fa';
import { authClient } from '../lib/auth-client';
import { FaGear } from 'react-icons/fa6';
import { AiOutlineProduct } from 'react-icons/ai';
import { LuLogOut } from 'react-icons/lu';

const navItems = [
  { href: '/', label: 'Home', icon: FaHome },
  { href: '/listings', label: 'Listings', icon: FaList },
  { href: '/about', label: 'About', icon: FaInfoCircle },
  { href: '/contact', label: 'Contact', icon: FaEnvelope },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push('/signin');
      router.refresh();
    } catch {
      alert('Sign out failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Toaster position="top-right" toastOptions={{ className: 'bg-slate-900 text-slate-50' }} />

      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="flex max-w-6xl mx-auto lg:flex-row flex-row-reverse items-start justify-between">
          <Link href="/" className="flex items-center gap-2 text-md pt-4 pr-2 lg:pt-4 lg:pl-0 font-semibold tracking-wide">
            <span className="rounded-full bg-amber-500/15 text-amber-400">
              <FaShoppingBag />
            </span>
            Crafted Market
          </Link>
          <button
            type="button"
            className="absolute left-5 top-5 lg:hidden text-slate-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          

          <nav
            className={`${menuOpen ? 'flex' : 'hidden'} flex-col gap-2 lg:flex lg:flex-row lg:items-center pb-5 pt-10 pl-5 lg:pt-4 lg:pl-0`}
          >
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-full px-4 py-2 text-sm transition ${isActive ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon />
                    {label}
                  </span>
                </Link>
              );
            })}
            {isPending ? (
              <span className="rounded-full px-4 py-2 text-sm text-slate-500">Loding...</span>
            ) : user ? (
              <>
                <Link
                  href="/add-project"
                  className={`rounded-full px-4 py-2 text-sm transition ${pathname === '/add-project'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <FaPlus />
                    Add
                  </span>
                </Link>
                <Link
                  href="/manage"
                  className={`rounded-full px-4 py-2 text-sm transition ${pathname === '/manage'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <FaGear />
                    Manage
                  </span>
                </Link>
                <Link
                  href="/projects"
                  className={`rounded-full px-4 py-2 text-sm transition ${pathname === '/projects'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <AiOutlineProduct />
                    My Projects
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => void handleSignOut()}
                  className="rounded-full px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <LuLogOut />
                    Logout
                  </span>
                </button>
              </>
            ) : (
              <Link
                href="/signin"
                className="rounded-full px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <FaUserLock />
                  Login
                </span>
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10 lg:px-8">{children}</main>
    </div>
  );
}
