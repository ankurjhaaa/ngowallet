import PublicLayout from "@/layouts/PublicLayout";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPolicy() {
    return (
        <PublicLayout>
            <PrivacyPolicyContent />
        </PublicLayout>
    );
}

function PrivacyPolicyContent() {
    const { t } = useLanguage();

    return (
        <>
            <section className="bg-emerald-50/60 pt-10 pb-10 border-b border-emerald-100">
                <div className="max-w-5xl mx-auto px-4">
                    <p className="text-xs uppercase tracking-wide text-emerald-700 font-semibold mb-2">
                        {t.privacyBadge}
                    </p>
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900">{t.privacyTitle}</h1>
                    <p className="text-sm md:text-base text-gray-600 mt-3 max-w-3xl">
                        {t.privacyDesc}
                    </p>
                </div>
            </section>

            <section className="py-10 md:py-14">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 md:p-8 space-y-6 text-gray-700 leading-relaxed">
                        <div>
                            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{t.privacySec1Title}</h2>
                            <p>{t.privacySec1Desc}</p>
                        </div>

                        <div>
                            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{t.privacySec2Title}</h2>
                            <p>{t.privacySec2Desc}</p>
                        </div>

                        <div>
                            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{t.privacySec3Title}</h2>
                            <p>{t.privacySec3Desc}</p>
                        </div>

                        <div>
                            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{t.privacySec4Title}</h2>
                            <p>{t.privacySec4Desc}</p>
                        </div>

                        <div>
                            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{t.privacySec5Title}</h2>
                            <p>{t.privacySec5Desc}</p>
                        </div>

                        <div>
                            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{t.privacySec6Title}</h2>
                            <p>{t.privacySec6Desc}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
