import PublicLayout from "@/layouts/PublicLayout";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AccountDeletion() {
    return (
        <PublicLayout>
            <AccountDeletionContent />
        </PublicLayout>
    );
}

function AccountDeletionContent() {
    const { t } = useLanguage();

    return (
        <>
            <section className="bg-rose-50/60 pt-10 pb-10 border-b border-rose-100">
                <div className="max-w-5xl mx-auto px-4">
                    <p className="text-xs uppercase tracking-wide text-rose-700 font-semibold mb-2">
                        {t.deletionBadge}
                    </p>
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900">{t.deletionTitle}</h1>
                    <p className="text-sm md:text-base text-gray-600 mt-3 max-w-3xl">
                        {t.deletionDesc}
                    </p>
                </div>
            </section>

            <section className="py-10 md:py-14">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 md:p-8">
                        <ol className="space-y-5 text-gray-700">
                            <li className="flex gap-3">
                                <span className="h-7 w-7 shrink-0 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold flex items-center justify-center">1</span>
                                <div>
                                    <h2 className="text-base md:text-lg font-semibold text-gray-900">{t.deletionStep1Title}</h2>
                                    <p className="text-sm md:text-base mt-1">{t.deletionStep1Desc}</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="h-7 w-7 shrink-0 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold flex items-center justify-center">2</span>
                                <div>
                                    <h2 className="text-base md:text-lg font-semibold text-gray-900">{t.deletionStep2Title}</h2>
                                    <p className="text-sm md:text-base mt-1">{t.deletionStep2Desc}</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="h-7 w-7 shrink-0 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold flex items-center justify-center">3</span>
                                <div>
                                    <h2 className="text-base md:text-lg font-semibold text-gray-900">{t.deletionStep3Title}</h2>
                                    <p className="text-sm md:text-base mt-1">{t.deletionStep3Desc}</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="h-7 w-7 shrink-0 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold flex items-center justify-center">4</span>
                                <div>
                                    <h2 className="text-base md:text-lg font-semibold text-gray-900">{t.deletionStep4Title}</h2>
                                    <p className="text-sm md:text-base mt-1">{t.deletionStep4Desc}</p>
                                </div>
                            </li>
                        </ol>

                        <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-100 text-amber-800 text-sm">
                            {t.deletionNote}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
