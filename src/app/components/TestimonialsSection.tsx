// components/TestimonialsSection.tsx
export function TestimonialsSection() {
    const testimonials = [
        { name: 'Ayesha', text: 'Beautiful craftsmanship and fast delivery!' },
        { name: 'Rahim', text: 'I love the thoughtful curation of products.' },
    ];
    return (
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <h2 className="text-3xl font-bold text-center">Testimonials</h2>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
                {testimonials.map(t => (
                    <div key={t.name} className="p-6 rounded-xl bg-slate-700">
                        <p className="text-slate-300">"{t.text}"</p>
                        <p className="mt-3 font-semibold text-amber-300">- {t.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
