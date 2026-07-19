// components/Footer.tsx
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaShoppingBag } from 'react-icons/fa';

export function Footer() {
    return (
        <footer className="bg-slate-900 text-white pt-16 pb-8 ">
            <div className="container mx-auto max-w-6xl px-6 grid gap-12 md:grid-cols-4">

                {/* Brand */}
                <div>
                    <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-wide">
                        <span className="rounded-full bg-amber-500/15 p-2 text-amber-400">
                            <FaShoppingBag />
                        </span>
                        Crafted Market
                    </Link>
                    <p className="mt-4 text-slate-400 leading-relaxed">
                        A curated space for handmade goods, connecting thoughtful buyers with verified makers.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-lg font-semibold text-amber-300">Explore</h3>
                    <ul className="mt-4 space-y-2 text-slate-400">
                        <li><Link href="/" className="hover:text-amber-400">Home</Link></li>
                        <li><Link href="/about" className="hover:text-amber-400">About</Link></li>
                        <li><Link href="/contact" className="hover:text-amber-400">Contact</Link></li>
                        <li><Link href="/listings" className="hover:text-amber-400">Listings</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold text-amber-300">Contact</h3>
                    <ul className="mt-4 space-y-2 text-slate-400">
                        <li>Email: <a href="mailto:aarafat7864@gmail.com" className="hover:text-amber-400">aarafat7864@gmail.com</a></li>
                        <li>Phone: <a href="tel:+8801714988538" className="hover:text-amber-400">+8801714988538</a></li>
                        <li>Address: Dhaka, Bangladesh</li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="text-lg font-semibold text-amber-300">Follow Us</h3>
                    <div className="mt-4 flex flex-wrap gap-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 hover:bg-amber-400 hover:text-slate-900 transition">
                            <FaFacebookF size={18} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 hover:bg-amber-400 hover:text-slate-900 transition">
                            <FaTwitter size={18} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 hover:bg-amber-400 hover:text-slate-900 transition">
                            <FaInstagram size={18} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800 hover:bg-amber-400 hover:text-slate-900 transition">
                            <FaLinkedin size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-12 border-t border-white/10 pt-6 text-center text-slate-500 text-sm">
                © {new Date().getFullYear()} Artisan Marketplace · All rights reserved.
            </div>
        </footer>
    );
}
