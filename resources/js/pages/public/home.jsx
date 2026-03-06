import PublicLayout from"@/layouts/PublicLayout";
import { Head, Link } from"@inertiajs/react";
import { useLanguage } from"@/contexts/LanguageContext";
import { Button } from"@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Badge } from"@/components/ui/badge";
import { motion } from"framer-motion";
import { ArrowRight, Heart, Users, Calendar, Globe, Landmark, BookOpen, MapPin, Feather, Crown, Scale, Globe2, HandHeart, Sword } from"lucide-react";
import { cn } from"@/lib/utils";

const fadeInUp = {
 initial: { opacity: 0, y: 20 },
 whileInView: { opacity: 1, y: 0 },
 viewport: { once: true },
 transition: { duration: 0.6 }
};

const staggerContainer = {
 initial: {},
 whileInView: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
 const { t, lang } = useLanguage();
 const isRtl = lang ==="ur";

 return (
 <PublicLayout>
 <Head title="Bazm-e-Haidri — Purnea"/>

 {/* Hero Section */}
 <section className="relative min-h-[85vh] flex items-center overflow-hidden">
 {/* Background Layer */}
 <div className="absolute inset-0 z-0">
 <img
 src="/images/karbhala_hero.png"
 alt="Bazm-e-Haidri Hero"
 className="w-full h-full object-cover object-center scale-105"
 />
 <div className="absolute inset-0 bg-emerald-950/95"/>
 <div className="absolute inset-x-0 bottom-0 h-32 bg-slate-50"/>
 </div>

 <div className="container mx-auto px-4 sm:px-4 relative z-10 pt-16 md:pt-24 pb-32">
 <motion.div
 initial={{ opacity: 0, x: -30 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.8 }}
 className="max-w-3xl text-left rtl:text-right"
 >
 <Badge variant="secondary"className="bg-emerald-400/20 text-emerald-300 border-none px-4 py-1.5 mb-4 backdrop-blur-md">
 <span className="flex items-center gap-2">
 <Heart className="h-3 w-3 fill-emerald-300"/>
 {t.heroQuote}
 </span>
 </Badge>

 <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-4">
 {t.heroTitle}
 </h1>
 <p className="text-xl md:text-2xl text-emerald-100/90 font-medium mb-4">
 {t.heroSubtitle}
 </p>
 <p className="text-base md:text-lg text-emerald-100/70 max-w-xl leading-relaxed mb-10">
 {t.heroDesc}
 </p>

 <div className="flex flex-col sm:flex-row gap-4">
 <Button asChild size="lg"className="rounded-md h-14 px-4 text-base group">
 <Link href="/join">
 {t.heroCta1}
 <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"/>
 </Link>
 </Button>
 <Button asChild variant="outline"size="lg"className="rounded-md h-14 px-4 text-base border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 hover:border-white/40">
 <Link href="/vision">
 {t.heroCta2}
 </Link>
 </Button>
 </div>
 </motion.div>
 </div>

 {/* Decorative Wave */}
 <div className="absolute bottom-0 left-0 right-0 z-10">
 <svg viewBox="0 0 1440 120"fill="none"className="w-full text-slate-50 translate-y-1">
 <path d="M0,64L40,69.3C80,75,160,85,240,80C320,75,400,53,480,42.7C560,32,640,32,720,37.3C800,43,880,53,960,69.3C1040,85,1120,107,1200,106.7C1280,107,1360,85,1400,74.7L1440,64L1440,120L1400,120C1360,120,1280,120,1200,120C1120,120,1040,120,960,120C880,120,800,120,720,120C640,120,560,120,480,120C400,120,320,120,240,120C160,120,80,120,40,120L0,120Z"fill="currentColor"></path>
 </svg>
 </div>
 </section>

 {/* Purnea History Section */}
 <section className="bg-slate-50 py-4 relative overflow-hidden">
 <div className="container mx-auto px-4 sm:px-4 relative z-10">
 <div className="flex flex-col lg:flex-row gap-16 items-center">
 <motion.div
 {...fadeInUp}
 className="lg:w-1/2"
 >
 <Badge variant="outline"className="border-emerald-200 text-emerald-800 uppercase tracking-widest text-[10px] font-bold px-3 py-1 mb-4 rounded-md">
 {t.historyTag}
 </Badge>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
 {t.historyTitle} <span className="text-emerald-700">{t.historyHighlight}</span>
 </h2>
 <div className="space-y-6">
 <HistoryFeature icon={<Landmark className="h-6 w-6"/>} title={t.historyAncientTitle} desc={t.historyAncientDesc} />
 <HistoryFeature icon={<BookOpen className="h-6 w-6"/>} title={t.historyCultureTitle} desc={t.historyCultureDesc} />
 <HistoryFeature icon={<MapPin className="h-6 w-6"/>} title={t.historyGeoTitle} desc={t.historyGeoDesc} />
 </div>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 className="lg:w-1/2 relative group"
 >
 <div className="relative z-10 rounded-md overflow-hidden border-4 border-white transform transition-transform group-hover:rotate-1">
 <img
 src="/images/purnea_heritage.png"
 alt="Purnea Heritage"
 className="w-full aspect-[4/3] object-cover"
 />
 </div>
 <div className="absolute -top-6 -right-6 w-64 h-64 bg-emerald-100 rounded-md blur-3xl opacity-50 -z-0"/>
 <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-blue-100 rounded-md blur-3xl opacity-50 -z-0"/>
 </motion.div>
 </div>
 </div>
 </section>

 {/* Stats Counter Section */}
 <section className="bg-emerald-900 py-4 text-white overflow-hidden">
 <div className="container mx-auto px-4 sm:px-4">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4">
 <ImpactStat value="120+"label={t.impactPrograms} icon={<Globe className="h-6 w-6 opacity-30"/>} />
 <ImpactStat value="35+"label={t.impactVillages} icon={<MapPin className="h-6 w-6 opacity-30"/>} />
 <ImpactStat value="500+"label={t.impactVolunteers} icon={<Users className="h-6 w-6 opacity-30"/>} />
 <ImpactStat value="5+"label={t.impactYears} icon={<Calendar className="h-6 w-6 opacity-30"/>} />
 </div>
 </div>
 </section>

 {/* Great Personalities Section */}
 <section className="bg-white py-4">
 <div className="container mx-auto px-4 sm:px-4 text-center mb-10">
 <Badge variant="outline"className="border-emerald-200 text-emerald-800 uppercase tracking-widest text-[10px] font-bold px-3 py-1 mb-4 rounded-md">
 {t.personalitiesTag}
 </Badge>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
 {t.personalitiesTitle} <span className="text-emerald-700">{t.personalitiesHighlight}</span>
 </h2>
 <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
 {t.personalitiesSubtitle}
 </p>
 </div>

 <div className="container mx-auto px-4 sm:px-4">
 <motion.div
 variants={staggerContainer}
 initial="initial"
 whileInView="whileInView"
 viewport={{ once: true }}
 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
 >
 <PersonCard name={t.personRenuName} title={t.personRenuTitle} desc={t.personRenuDesc} icon={<Feather className="h-5 w-5"/>} color="bg-orange-50 text-orange-600"/>
 <PersonCard name={t.personMaharajaName} title={t.personMaharajaTitle} desc={t.personMaharajaDesc} icon={<Crown className="h-5 w-5"/>} color="bg-amber-50 text-amber-600"/>
 <PersonCard name={t.personSinhaName} title={t.personSinhaTitle} desc={t.personSinhaDesc} icon={<Scale className="h-5 w-5"/>} color="bg-blue-50 text-blue-600"/>
 <PersonCard name={t.personRahulName} title={t.personRahulTitle} desc={t.personRahulDesc} icon={<Globe2 className="h-5 w-5"/>} color="bg-emerald-50 text-emerald-600"/>
 <PersonCard name={t.personSaintName} title={t.personSaintTitle} desc={t.personSaintDesc} icon={<HandHeart className="h-5 w-5"/>} color="bg-purple-50 text-purple-600"/>
 <PersonCard name={t.personFreedomName} title={t.personFreedomTitle} desc={t.personFreedomDesc} icon={<Sword className="h-5 w-5"/>} color="bg-rose-50 text-rose-600"/>
 </motion.div>
 </div>
 </section>

 {/* Mission Section */}
 <section className="bg-slate-50 py-4 border-y border-slate-200">
 <div className="container mx-auto px-4 sm:px-4 text-center mb-10">
 <Badge variant="outline"className="border-emerald-200 text-emerald-800 uppercase tracking-widest text-[10px] font-bold px-3 py-1 mb-4 rounded-md">
 {t.missionTag}
 </Badge>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
 {t.missionTitle} <span className="text-emerald-700">{t.missionHighlight}</span>
 </h2>
 <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
 {t.missionSubtitle}
 </p>
 </div>

 <div className="container mx-auto px-4 sm:px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
 <MissionItem icon={<Globe className="h-10 w-10"/>} title={t.missionEduTitle} desc={t.missionEduDesc} percent="45%"color="bg-emerald-600"/>
 <MissionItem icon={<Users className="h-10 w-10"/>} title={t.missionHealthTitle} desc={t.missionHealthDesc} percent="35%"color="bg-blue-600"/>
 <MissionItem icon={<Heart className="h-10 w-10"/>} title={t.missionCommunityTitle} desc={t.missionCommunityDesc} percent="20%"color="bg-rose-600"/>
 </div>
 </section>

 {/* Call to Action Section */}
 <section className="py-4 relative overflow-hidden">
 <div className="absolute inset-0 bg-emerald-900">
 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:20px_20px]"></div>
 <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-emerald-950"></div>
 </div>

 <div className="container mx-auto px-4 sm:px-4 relative z-10 text-center">
 <motion.div
 {...fadeInUp}
 className="max-w-4xl mx-auto"
 >
 <p className="text-emerald-300 font-medium mb-4 italic tracking-wide">
 {t.ctaQuote}
 </p>
 <h2 className="text-3xl md:text-6xl font-extrabold text-white mb-5 tracking-tight leading-tight">
 {t.ctaTitle}
 </h2>
 <p className="text-lg md:text-xl text-emerald-100/70 mb-5 max-w-2xl mx-auto leading-relaxed">
 {t.ctaDesc}
 </p>

 <div className="flex flex-col sm:flex-row gap-3 justify-center">
 <Button asChild size="lg"className="rounded-md h-16 px-10 text-lg bg-white text-emerald-900 hover:bg-emerald-50 transition-all hover:scale-[1.02] active:scale-[0.98]">
 <Link href="/join">
 <Heart className="mr-2 h-6 w-6 fill-emerald-900"/>
 {t.ctaCta1}
 </Link>
 </Button>
 <Button asChild variant="outline"size="lg"className="rounded-md h-16 px-10 text-lg border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
 <Link href="/join">
 {t.ctaCta2}
 </Link>
 </Button>
 </div>
 </motion.div>
 </div>
 </section>
 </PublicLayout>
 );
}

{/* Helper Components */}

function HistoryFeature({ icon, title, desc }) {
 return (
 <div className="flex items-start gap-4 group">
 <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white text-emerald-700 group-hover:scale-110 transition-transform">
 {icon}
 </div>
 <div className="flex-1 border-b border-slate-200 pb-5">
 <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>
 <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
 </div>
 </div>
 );
}

function ImpactStat({ value, label, icon }) {
 return (
 <motion.div
 {...fadeInUp}
 className="text-center relative group"
 >
 <div className="mb-3 text-emerald-400 transform transition-transform group-hover:scale-110">
 {icon}
 </div>
 <div className="text-3xl md:text-5xl font-extrabold mb-2 tracking-tight">
 {value}
 </div>
 <div className="text-emerald-300/60 text-[10px] md:text-xs font-bold uppercase tracking-widest">
 {label}
 </div>
 </motion.div>
 );
}

function PersonCard({ name, title, desc, icon, color }) {
 return (
 <motion.div variants={fadeInUp}>
 <Card className="h-full border-slate-100 hover:-900/5 transition-all transform hover:-translate-y-2 rounded-md overflow-hidden group">
 <CardHeader className="pb-4">
 <div className="flex items-center gap-4">
 <div className={cn("w-14 h-14 rounded-md flex items-center justify-center text-xl transition-transform group-hover:rotate-12", color)}>
 {icon}
 </div>
 <div>
 <CardTitle className="text-xl font-bold text-slate-900">{name}</CardTitle>
 <CardDescription className="text-emerald-700 font-semibold text-xs mt-1 uppercase tracking-wide">
 {title}
 </CardDescription>
 </div>
 </div>
 </CardHeader>
 <CardContent>
 <p className="text-slate-500 text-sm leading-relaxed">
 {desc}
 </p>
 </CardContent>
 </Card>
 </motion.div>
 );
}

function MissionItem({ icon, title, desc, percent, color }) {
 return (
 <Card className="border-none bg-white p-4 rounded-md group hover: transition-all">
 <div className={cn("mb-4 h-16 w-16 rounded-md flex items-center justify-center text-white", color)}>
 {icon}
 </div>
 <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{title}</h3>
 <p className="text-slate-500 mb-5 leading-relaxed">
 {desc}
 </p>
 <div className="space-y-3">
 <div className="flex justify-between items-end">
 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Priority Impact</span>
 <span className="text-lg font-black text-slate-800">{percent}</span>
 </div>
 <div className="h-3 w-full bg-slate-100 rounded-md overflow-hidden">
 <motion.div
 initial={{ width: 0 }}
 whileInView={{ width: percent }}
 transition={{ duration: 1.5, ease:"easeOut"}}
 className={cn("h-full rounded-md", color)}
 />
 </div>
 </div>
 </Card>
 );
}
