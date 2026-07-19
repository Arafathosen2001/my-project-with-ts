// components/ServicesSection.tsx
export function ServicesSection() {
    const services = [
        { title: 'Custom Orders', text: 'Tailored pieces for your needs.' },
        { title: 'Gift Wrapping', text: 'Beautifully packaged for loved ones.' },
        { title: 'Community Support', text: 'Helping artisans grow.' },
    ];
    return (
        <section className="py-16 bg-slate-800 text-white">
            <h2 className="text-3xl font-bold text-center">Services</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
                {services.map(s => (
                    <div key={s.title} className="p-6 rounded-xl bg-slate-700">
                        <h3 className="text-xl font-semibold">{s.title}</h3>
                        <p className="mt-3 text-slate-300">{s.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
