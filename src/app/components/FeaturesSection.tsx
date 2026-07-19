// components/FeaturesSection.tsx
export function FeaturesSection() {
    const features = [
        { title: 'Verified Makers', text: 'Every seller is reviewed and supported.' },
        { title: 'Fast Delivery', text: 'Curated dispatch with clear updates.' },
        { title: 'Thoughtful Curation', text: 'Pieces selected for durability and design.' },
    ];
    return (
        <section className="py-16 bg-slate-900 text-white">
            <h2 className="text-3xl font-bold text-center">Features</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
                {features.map(f => (
                    <div key={f.title} className="p-6 rounded-xl bg-slate-800">
                        <h3 className="text-xl font-semibold">{f.title}</h3>
                        <p className="mt-3 text-slate-300">{f.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
