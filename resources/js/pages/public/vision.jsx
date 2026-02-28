import PublicLayout from "@/layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Vision() {
    return (
        <PublicLayout>
            <VisionContent />
        </PublicLayout>
    );
}

function VisionContent() {
    const { t } = useLanguage();

    return (
        <>
            <Head title="Our Vision — Bazm-e-Haidri" />

            {/* HERO */}
            <section className="bg-gradient-to-b from-emerald-50 to-white pt-16 pb-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-xs tracking-[0.25em] uppercase text-emerald-700 font-semibold mb-3">
                        <i className="fas fa-mosque mr-2"></i>Bazm-e-Haidri
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900">{t.visionHeroTitle}</h1>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">{t.visionHeroDesc}</p>
                </div>
            </section>

            {/* MISSION & VISION CARDS */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
                        <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                            <i className="fas fa-bullseye text-lg"></i>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">{t.visionMissionTitle}</h2>
                        <p className="text-gray-600 leading-relaxed text-sm">{t.visionMissionDesc}</p>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
                        <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                            <i className="fas fa-eye text-lg"></i>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">{t.visionVisionTitle}</h2>
                        <p className="text-gray-600 leading-relaxed text-sm">{t.visionVisionDesc}</p>
                    </div>
                </div>
            </section>

            {/* WHAT WE DO */}
            <section className="bg-green-50 py-14">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">{t.visionWhatTitle}</h2>
                    <p className="text-gray-600 text-center mt-3 max-w-xl mx-auto text-sm">{t.visionWhatDesc}</p>
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FocusCard icon="fa-graduation-cap" title={t.missionEduTitle} desc={t.missionEduDesc} />
                        <FocusCard icon="fa-hospital" title={t.missionHealthTitle} desc={t.missionHealthDesc} />
                        <FocusCard icon="fa-people-carry" title={t.missionCommunityTitle} desc={t.missionCommunityDesc} />
                    </div>
                </div>
            </section>

            {/* FUTURE GOALS */}
            <section className="py-14 md:py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">{t.visionGoalsTitle}</h2>
                    <p className="text-gray-600 text-center mt-3 max-w-xl mx-auto text-sm">{t.visionGoalsDesc}</p>
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <GoalCard number="01" title={t.visionGoal1Title} desc={t.visionGoal1Desc} />
                        <GoalCard number="02" title={t.visionGoal2Title} desc={t.visionGoal2Desc} />
                        <GoalCard number="03" title={t.visionGoal3Title} desc={t.visionGoal3Desc} />
                    </div>
                </div>
            </section>
        </>
    );
}

function FocusCard({ icon, title, desc }) {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm text-center border border-emerald-100">
            <div className="w-12 h-12 mx-auto rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <i className={`fas ${icon} text-lg`}></i>
            </div>
            <h3 className="mt-4 font-bold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-600">{desc}</p>
        </div>
    );
}

function GoalCard({ number, title, desc }) {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-emerald-100">
            <span className="text-emerald-700 font-bold text-lg">{number}</span>
            <h3 className="mt-2 font-bold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-600">{desc}</p>
        </div>
    );
}
