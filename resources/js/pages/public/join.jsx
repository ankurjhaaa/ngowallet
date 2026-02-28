import PublicLayout from "@/layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Join() {
    return (
        <PublicLayout>
            <JoinContent />
        </PublicLayout>
    );
}

function JoinContent() {
    const { t } = useLanguage();

    return (
        <>
            <Head title="Join Us — Bazm-e-Haidri" />

            {/* HERO */}
            <section className="bg-gradient-to-b from-emerald-50 to-white pt-16 pb-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-xs tracking-[0.25em] uppercase text-emerald-700 font-semibold mb-3">
                        <i className="fas fa-mosque mr-2"></i>Bazm-e-Haidri
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900">{t.joinHeroTitle}</h1>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">{t.joinHeroDesc}</p>
                </div>
            </section>

            {/* WHY + HOW */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">{t.joinWhyTitle}</h2>
                        <p className="text-gray-600 leading-relaxed text-sm">{t.joinWhyDesc}</p>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">{t.joinHowTitle}</h2>
                        <ul className="space-y-3 text-gray-600 text-sm">
                            <li className="flex gap-2"><i className="fas fa-phone text-emerald-700 mt-1"></i>{t.joinStep1}</li>
                            <li className="flex gap-2"><i className="fas fa-calendar-alt text-emerald-700 mt-1"></i>{t.joinStep2}</li>
                            <li className="flex gap-2"><i className="fas fa-database text-emerald-700 mt-1"></i>{t.joinStep3}</li>
                            <li className="flex gap-2"><i className="fas fa-hand-holding-heart text-emerald-700 mt-1"></i>{t.joinStep4}</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* WHO CAN JOIN */}
            <section className="bg-green-50 py-14">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t.joinWhoTitle}</h2>
                    <p className="mt-4 text-gray-600 max-w-xl mx-auto text-sm">{t.joinWhoDesc}</p>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t.joinCtaTitle}</h2>
                    <p className="mt-4 text-gray-600 max-w-xl mx-auto text-sm">{t.joinCtaDesc}</p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <a href="/contact" className="bg-emerald-800 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition font-medium text-sm">
                            <i className="fas fa-envelope mr-2"></i>{t.joinCtaBtn1}
                        </a>
                        <a href="tel:+919000000000" className="border border-emerald-800 text-emerald-800 px-6 py-3 rounded-lg hover:bg-emerald-50 transition font-medium text-sm">
                            <i className="fas fa-phone mr-2"></i>{t.joinCtaBtn2}
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
