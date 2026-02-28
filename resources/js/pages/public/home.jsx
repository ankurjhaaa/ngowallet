import PublicLayout from "@/layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  return (
    <PublicLayout>
      <HomeContent />
    </PublicLayout>
  );
}

function HomeContent() {
  const { t } = useLanguage();

  return (
    <>
      <Head title="Bazm-e-Haidri — Purnea" />

      {/* ============================================================
                HERO
            ============================================================ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/karbhala_hero.png" alt="Bazm-e-Haidri" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/70 via-emerald-900/50 to-emerald-950/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-24 md:pt-32 md:pb-36 text-center">
          <p className="text-emerald-300 text-sm md:text-base tracking-wide font-medium mb-4 italic">
            "{t.heroQuote}"
          </p>
          <h1 className="text-3xl md:text-6xl font-bold text-white leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-emerald-200 text-lg md:text-2xl font-medium mt-2">
            {t.heroSubtitle}
          </p>
          <p className="mt-5 text-white/75 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {t.heroDesc}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/join" className="bg-emerald-500 text-white px-7 py-3 rounded-lg font-semibold text-sm hover:bg-emerald-400 transition shadow-lg">
              <i className="fas fa-hands-helping mr-2"></i>{t.heroCta1}
            </Link>
            <Link href="/vision" className="border border-white/40 text-white px-7 py-3 rounded-lg font-medium text-sm hover:bg-white/10 transition">
              {t.heroCta2}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,30 L1440,60 L0,60 Z" fill="#f0fdf4" />
          </svg>
        </div>
      </section>

      {/* ============================================================
                PURNEA HISTORY
            ============================================================ */}
      <section className="bg-green-50 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.25em] uppercase text-emerald-700 font-semibold mb-2">{t.historyTag}</p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              {t.historyTitle} <span className="text-emerald-700">{t.historyHighlight}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="rounded-xl overflow-hidden shadow-lg border border-emerald-200">
              <img src="/images/purnea_heritage.png" alt="Heritage" className="w-full h-64 md:h-80 object-cover" />
            </div>
            <div className="space-y-4">
              <HistoryItem icon="fa-landmark" title={t.historyAncientTitle} desc={t.historyAncientDesc} />
              <HistoryItem icon="fa-book-open" title={t.historyCultureTitle} desc={t.historyCultureDesc} />
              <HistoryItem icon="fa-map-marked-alt" title={t.historyGeoTitle} desc={t.historyGeoDesc} />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
                GREAT PERSONALITIES
            ============================================================ */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.25em] uppercase text-emerald-700 font-semibold mb-2">{t.personalitiesTag}</p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              {t.personalitiesTitle} <span className="text-emerald-700">{t.personalitiesHighlight}</span>
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto text-sm">{t.personalitiesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <PersonCard name={t.personRenuName} title={t.personRenuTitle} desc={t.personRenuDesc} icon="fa-feather-alt" initial="र" />
            <PersonCard name={t.personMaharajaName} title={t.personMaharajaTitle} desc={t.personMaharajaDesc} icon="fa-crown" initial="म" />
            <PersonCard name={t.personSinhaName} title={t.personSinhaTitle} desc={t.personSinhaDesc} icon="fa-balance-scale" initial="स" />
            <PersonCard name={t.personRahulName} title={t.personRahulTitle} desc={t.personRahulDesc} icon="fa-globe-asia" initial="रा" />
            <PersonCard name={t.personSaintName} title={t.personSaintTitle} desc={t.personSaintDesc} icon="fa-pray" initial="☪" />
            <PersonCard name={t.personFreedomName} title={t.personFreedomTitle} desc={t.personFreedomDesc} icon="fa-fist-raised" initial="✦" />
          </div>
        </div>
      </section>

      {/* ============================================================
                TIMELINE
            ============================================================ */}
      <section className="bg-green-50 py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.25em] uppercase text-emerald-700 font-semibold mb-2">{t.timelineTag}</p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              {t.timelineTitle} <span className="text-emerald-700">{t.timelineHighlight}</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-5 md:left-6 top-0 bottom-0 w-0.5 bg-emerald-200" />
            <div className="space-y-6">
              <TimelineItem era="Ancient Era" year="600 BCE" text="Part of the Anga Mahajanapada — a thriving cultural and trade center." />
              <TimelineItem era="Maurya Period" year="320 BCE" text="Under Emperor Ashoka's empire. Widespread spread of Buddhism." />
              <TimelineItem era="Gupta Period" year="320 CE" text="Golden age — unprecedented development in art, science, and literature." />
              <TimelineItem era="Mughal Era" year="1500 CE" text="Establishment of Purnea Sarkar — growth as an administrative and trade center." />
              <TimelineItem era="British Era" year="1770 CE" text="Formation of Purnea district. Beginning of modern development." />
              <TimelineItem era="Independent India" year="1947" text="Purnea becomes a key district of Bihar. Rapid growth in education and agriculture." />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
                MISSION
            ============================================================ */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.25em] uppercase text-emerald-700 font-semibold mb-2">{t.missionTag}</p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              {t.missionTitle} <span className="text-emerald-700">{t.missionHighlight}</span>
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto text-sm">{t.missionSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <MissionCard icon="fa-graduation-cap" title={t.missionEduTitle} desc={t.missionEduDesc} percent="45%" />
            <MissionCard icon="fa-hospital" title={t.missionHealthTitle} desc={t.missionHealthDesc} percent="35%" />
            <MissionCard icon="fa-people-carry" title={t.missionCommunityTitle} desc={t.missionCommunityDesc} percent="20%" />
          </div>
        </div>
      </section>

      {/* ============================================================
                IMPACT
            ============================================================ */}
      <section className="bg-green-50 py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.25em] uppercase text-emerald-700 font-semibold mb-2">{t.impactTag}</p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              {t.impactTitle} <span className="text-emerald-700">{t.impactHighlight}</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ImpactStat icon="fa-briefcase" value="120+" label={t.impactPrograms} />
            <ImpactStat icon="fa-map-marked-alt" value="35+" label={t.impactVillages} />
            <ImpactStat icon="fa-hands-helping" value="500+" label={t.impactVolunteers} />
            <ImpactStat icon="fa-calendar-check" value="5+" label={t.impactYears} />
          </div>
        </div>
      </section>

      {/* ============================================================
                CTA
            ============================================================ */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <p className="text-emerald-300 text-sm tracking-wide mb-3">{t.ctaQuote}</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white">{t.ctaTitle}</h2>
          <p className="mt-4 text-emerald-100/70 max-w-md mx-auto text-sm">{t.ctaDesc}</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/join" className="bg-white text-emerald-800 px-7 py-3 rounded-lg font-semibold text-sm hover:bg-emerald-50 transition shadow-lg">
              <i className="fas fa-heart mr-2"></i>{t.ctaCta1}
            </Link>
            <Link href="/join" className="border border-white/40 text-white px-7 py-3 rounded-lg font-medium text-sm hover:bg-white/10 transition">
              {t.ctaCta2}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ================================================================ COMPONENTS ================================================================ */

function HistoryItem({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3 bg-white p-4 rounded-lg border-l-4 border-emerald-500 shadow-sm">
      <i className={`fas ${icon} text-emerald-700 mt-1`}></i>
      <div>
        <h3 className="font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
      </div>
    </div>
  );
}

function PersonCard({ name, title, desc, icon, initial }) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-emerald-100 hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold shrink-0">
          {initial}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-sm">{name}</h3>
          <p className="text-xs text-emerald-700 font-medium">{title}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function TimelineItem({ era, year, text }) {
  return (
    <div className="flex gap-4 relative">
      <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 z-10">
        <i className="fas fa-circle text-[6px]"></i>
      </div>
      <div className="pt-1 pb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-bold text-gray-900">{era}</span>
          <span className="text-[11px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">{year}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{text}</p>
      </div>
    </div>
  );
}

function MissionCard({ icon, title, desc, percent }) {
  return (
    <div className="bg-green-50 rounded-lg p-5 border border-emerald-200 hover:shadow-md transition">
      <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg">
        <i className={`fas ${icon}`}></i>
      </div>
      <h3 className="mt-3 font-bold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</p>
      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 h-2 bg-emerald-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-600 rounded-full" style={{ width: percent }} />
        </div>
        <span className="text-xs font-bold text-emerald-700">{percent}</span>
      </div>
    </div>
  );
}

function ImpactStat({ icon, value, label }) {
  return (
    <div className="bg-white rounded-lg p-5 text-center border border-emerald-200 hover:shadow-md transition">
      <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg">
        <i className={`fas ${icon}`}></i>
      </div>
      <p className="mt-3 text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
      <p className="mt-1 text-sm text-gray-600">{label}</p>
    </div>
  );
}
