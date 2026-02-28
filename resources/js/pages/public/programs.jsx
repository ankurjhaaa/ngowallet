import PublicLayout from "@/layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Programs() {
    return (
        <PublicLayout>
            <ProgramsContent />
        </PublicLayout>
    );
}

function ProgramsContent() {
    const { t } = useLanguage();

    return (
        <>
            <Head title="Programs — Bazm-e-Haidri" />

            {/* HERO */}
            <section className="bg-gradient-to-b from-emerald-50 to-white pt-16 pb-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-xs tracking-[0.25em] uppercase text-emerald-700 font-semibold mb-3">
                        <i className="fas fa-mosque mr-2"></i>Bazm-e-Haidri
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900">{t.progsHeroTitle}</h1>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">{t.progsHeroDesc}</p>
                </div>
            </section>

            {/* PROGRAMS */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ProgramCard
                        icon="fa-graduation-cap"
                        title={t.progsEduTitle}
                        desc={t.progsEduDesc}
                        stats={["1,200+ students supported", "35 schools covered"]}
                    />
                    <ProgramCard
                        icon="fa-hospital"
                        title={t.progsHealthTitle}
                        desc={t.progsHealthDesc}
                        stats={["50+ medical camps", "8,000+ patients treated"]}
                    />
                    <ProgramCard
                        icon="fa-people-carry"
                        title={t.progsCommunityTitle}
                        desc={t.progsCommunityDesc}
                        stats={["25 villages impacted", "500+ families supported"]}
                    />
                </div>
            </section>

            {/* CTA */}
            <section className="bg-green-50 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t.progsCtaTitle}</h2>
                    <p className="mt-3 text-gray-600 max-w-xl mx-auto text-sm">{t.progsCtaDesc}</p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/join" className="bg-emerald-800 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition font-medium text-sm">
                            <i className="fas fa-heart mr-2"></i>{t.ctaCta1}
                        </Link>
                        <Link href="/signup" className="border border-emerald-800 text-emerald-800 px-6 py-3 rounded-lg hover:bg-emerald-50 transition font-medium text-sm">
                            {t.ctaCta2}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

function ProgramCard({ icon, title, desc, stats }) {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition border border-emerald-100">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg">
                <i className={`fas ${icon}`}></i>
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
                {stats.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                        <i className="fas fa-check-circle text-emerald-600 text-xs"></i>{item}
                    </li>
                ))}
            </ul>
            <div className="mt-5">
                <Link href="/join" className="w-full block text-center bg-emerald-800 text-white py-2.5 rounded-lg text-sm hover:bg-emerald-700 transition font-medium">
                    {title}
                </Link>
            </div>
        </div>
    );
}
