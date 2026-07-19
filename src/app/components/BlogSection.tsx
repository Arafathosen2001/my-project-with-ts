// components/BlogSection.tsx
export function BlogSection() {
    const posts = [
        { title: 'The Art of Ceramics', excerpt: 'Discover timeless pottery traditions.' },
        { title: 'Sustainable Textiles', excerpt: 'Eco-friendly fabrics for modern living.' },
    ];
    return (
        <section className="py-16 bg-slate-900 text-white">
            <h2 className="text-3xl font-bold text-center">Blog</h2>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
                {posts.map(p => (
                    <div key={p.title} className="p-6 rounded-xl bg-slate-800">
                        <h3 className="text-xl font-semibold">{p.title}</h3>
                        <p className="mt-3 text-slate-300">{p.excerpt}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
