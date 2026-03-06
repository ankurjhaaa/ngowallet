import PublicLayout from"@/layouts/PublicLayout";
import { Head, Link } from"@inertiajs/react";
import { useLanguage } from"@/contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from"@/components/ui/card";
import { Badge } from"@/components/ui/badge";
import { motion } from"framer-motion";
import { Target, Eye, GraduationCap, Hospital, Users, Sparkles, CheckCircle2 } from"lucide-react";
import { cn } from"@/lib/utils";

const fadeInUp = {
 initial: { opacity: 0, y: 30 },
 whileInView: { opacity: 1, y: 0 },
 viewport: { once: true },
 transition: { duration: 0.6 }
};

export default function Vision() {
 const { t } = useLanguage();

 return (
 <PublicLayout>
 <Head title="Our Vision — Bazm-e-Haidri"/>

 {/* Premium Header */}
 <section className="relative bg-emerald-950 py-4 md:py-32 overflow-hidden">
 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:30px_30px]"></div>
 <div className="absolute bottom-0 left-0 right-0 h-32 bg-emerald-950 opacity-50"></div>
 
 <div className="container mx-auto px-4 text-center relative z-10">
 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.5 }}
 >
 <Badge variant="secondary"className="bg-emerald-400/20 text-emerald-300 border-none px-4 py-1.5 mb-4 backdrop-blur-md uppercase tracking-widest text-[10px] font-bold">
 <i className="fas fa-mosque mr-2"></i>Bazm-e-Haidri
 </Badge>
 <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">{t.visionHeroTitle}</h1>
 <p className="mt-4 text-emerald-100/70 max-w-2xl mx-auto text-lg leading-relaxed">{t.visionHeroDesc}</p>
 </motion.div>
 </div>
 </section>

 {/* Mission & Vision Split */}
 <section className="py-4 bg-white relative -mt-5 z-20 rounded-md-[3rem]">
 <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
 <motion.div {...fadeInUp}>
 <Card className="h-full border-none bg-emerald-50/50 p-4 rounded-md group hover:bg-emerald-50 transition-colors">
 <div className="w-16 h-16 rounded-md bg-emerald-600 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
 <Target className="h-8 w-8"/>
 </div>
 <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.visionMissionTitle}</h2>
 <p className="text-slate-600 leading-relaxed text-lg italic pr-4 border-l-4 border-emerald-200 pl-6">
"{t.visionMissionDesc}"
 </p>
 </Card>
 </motion.div>

 <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
 <Card className="h-full border-none bg-blue-50/50 p-4 rounded-md group hover:bg-blue-50 transition-colors">
 <div className="w-16 h-16 rounded-md bg-blue-600 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
 <Eye className="h-8 w-8"/>
 </div>
 <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.visionVisionTitle}</h2>
 <p className="text-slate-600 leading-relaxed text-lg italic pr-4 border-l-4 border-blue-200 pl-6">
"{t.visionVisionDesc}"
 </p>
 </Card>
 </motion.div>
 </div>
 </section>

 {/* Core Pillars */}
 <section className="bg-slate-50 py-4 relative overflow-hidden">
 <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/50 rounded-md blur-3xl -z-0"></div>
 <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 rounded-md blur-3xl -z-0"></div>

 <div className="container mx-auto px-4 relative z-10">
 <div className="text-center mb-10">
 <Badge variant="outline"className="border-emerald-200 text-emerald-800 uppercase tracking-widest text-[10px] font-bold px-3 py-1 mb-4 rounded-md">
 Our Pillars
 </Badge>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">{t.visionWhatTitle}</h2>
 <p className="text-slate-500 text-center mt-4 max-w-xl mx-auto text-lg leading-relaxed">{t.visionWhatDesc}</p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <FocusCard icon={<GraduationCap className="h-8 w-8"/>} title={t.missionEduTitle} desc={t.missionEduDesc} color="bg-orange-50 text-orange-600"/>
 <FocusCard icon={<Hospital className="h-8 w-8"/>} title={t.missionHealthTitle} desc={t.missionHealthDesc} color="bg-emerald-50 text-emerald-600"/>
 <FocusCard icon={<Users className="h-8 w-8"/>} title={t.missionCommunityTitle} desc={t.missionCommunityDesc} color="bg-blue-50 text-blue-600"/>
 </div>
 </div>
 </section>

 {/* Future Goals with Roadmap Style */}
 <section className="py-4 bg-white">
 <div className="container mx-auto px-4">
 <div className="text-center mb-10">
 <Badge variant="outline"className="border-emerald-200 text-emerald-800 uppercase tracking-widest text-[10px] font-bold px-3 py-1 mb-4 rounded-md">
 Roadmap
 </Badge>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">{t.visionGoalsTitle}</h2>
 <p className="text-slate-500 text-center mt-4 max-w-xl mx-auto text-lg leading-relaxed">{t.visionGoalsDesc}</p>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
 <GoalCard index={1} title={t.visionGoal1Title} desc={t.visionGoal1Desc} />
 <GoalCard index={2} title={t.visionGoal2Title} desc={t.visionGoal2Desc} />
 <GoalCard index={3} title={t.visionGoal3Title} desc={t.visionGoal3Desc} />
 </div>
 </div>
 </section>
 </PublicLayout>
 );
}

function FocusCard({ icon, title, desc, color }) {
 return (
 <motion.div {...fadeInUp} className="group">
 <Card className="h-full bg-white rounded-md p-4 border-slate-100 hover:-900/5 transition-all text-center">
 <div className={cn("w-20 h-20 mx-auto rounded-md flex items-center justify-center group-hover:scale-110 transition-transform mb-5", color)}>
 {icon}
 </div>
 <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
 <p className="text-slate-500 leading-relaxed">{desc}</p>
 </Card>
 </motion.div>
 );
}

function GoalCard({ index, title, desc }) {
 return (
 <motion.div {...fadeInUp} transition={{ delay: index * 0.1 }}>
 <div className="relative p-4 rounded-md bg-slate-50 border border-slate-100 group hover:bg-emerald-50 transition-colors">
 <div className="absolute top-6 right-8 text-6xl font-black text-slate-200/50 select-none group-hover:text-emerald-100 transition-colors">
 0{index}
 </div>
 <div className="relative z-10">
 <CheckCircle2 className="h-8 w-8 text-emerald-600 mb-4"/>
 <h3 className="text-2xl font-bold text-slate-900 mb-4 pr-12">{title}</h3>
 <p className="text-slate-600 leading-relaxed">{desc}</p>
 </div>
 </div>
 </motion.div>
 );
}
