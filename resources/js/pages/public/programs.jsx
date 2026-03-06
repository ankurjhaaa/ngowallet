import PublicLayout from"@/layouts/PublicLayout";
import { Head, Link } from"@inertiajs/react";
import { useLanguage } from"@/contexts/LanguageContext";
import { Button } from"@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from"@/components/ui/card";
import { Badge } from"@/components/ui/badge";
import { motion } from"framer-motion";
import { GraduationCap, Hospital, Users, CheckCircle2, Heart, ArrowRight, ShieldCheck, Zap, Globe } from"lucide-react";
import { cn } from"@/lib/utils";

const fadeInUp = {
 initial: { opacity: 0, y: 30 },
 whileInView: { opacity: 1, y: 0 },
 viewport: { once: true },
 transition: { duration: 0.6 }
};

export default function Programs() {
 const { t } = useLanguage();

 return (
 <PublicLayout>
 <Head title="Our Programs — Bazm-e-Haidri"/>

 {/* Premium Header */}
 <section className="relative bg-emerald-950 py-4 md:py-32 overflow-hidden">
 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:30px_30px]"></div>
 <div className="absolute inset-0 bg-emerald-900/50"></div>
 
 <div className="container mx-auto px-4 text-center relative z-10">
 <motion.div
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 >
 <Badge variant="secondary"className="bg-emerald-400/20 text-emerald-300 border-none px-4 py-1.5 mb-4 backdrop-blur-md uppercase tracking-widest text-[10px] font-bold">
 Empowering Communities
 </Badge>
 <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">{t.progsHeroTitle}</h1>
 <p className="mt-4 text-emerald-100/70 max-w-2xl mx-auto text-lg leading-relaxed">{t.progsHeroDesc}</p>
 </motion.div>
 </div>
 </section>

 {/* Program Grid */}
 <section className="py-4 bg-slate-50 relative -mt-5 z-20 rounded-md-[3rem]">
 <div className="container mx-auto px-4">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <ProgramCard
 icon={<GraduationCap className="h-8 w-8"/>}
 title={t.progsEduTitle}
 desc={t.progsEduDesc}
 stats={["1,200+ students supported","35 schools covered"]}
 color="bg-orange-600"
 lightColor="bg-orange-50 text-orange-700"
 />
 <ProgramCard
 icon={<Hospital className="h-8 w-8"/>}
 title={t.progsHealthTitle}
 desc={t.progsHealthDesc}
 stats={["50+ medical camps","8,000+ patients treated"]}
 color="bg-emerald-600"
 lightColor="bg-emerald-50 text-emerald-700"
 />
 <ProgramCard
 icon={<Users className="h-8 w-8"/>}
 title={t.progsCommunityTitle}
 desc={t.progsCommunityDesc}
 stats={["25 villages impacted","500+ families supported"]}
 color="bg-blue-600"
 lightColor="bg-blue-50 text-blue-700"
 />
 </div>
 </div>
 </section>

 {/* Impact Feature */}
 <section className="py-4 bg-white overflow-hidden">
 <div className="container mx-auto px-4">
 <div className="flex flex-col lg:flex-row items-center gap-16">
 <motion.div {...fadeInUp} className="lg:w-1/2">
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-5 leading-tight">
 {t.progsCtaTitle}
 </h2>
 <p className="text-slate-600 mb-10 text-lg leading-relaxed">
 {t.progsCtaDesc}
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
 <ImpactItem icon={<ShieldCheck className="h-5 w-5"/>} title="Verified Impact"desc="Every donation is tracked and reported."/>
 <ImpactItem icon={<Zap className="h-5 w-5"/>} title="Direct Action"desc="95% of funds go directly to the field."/>
 <ImpactItem icon={<Globe className="h-5 w-5"/>} title="Wide Reach"iconColor="text-blue-600"/>
 <ImpactItem icon={<Heart className="h-5 w-5"/>} title="Community Driven"iconColor="text-rose-600"/>
 </div>
 <div className="flex flex-col sm:flex-row gap-3">
 <Button asChild size="lg"className="rounded-md h-16 px-10 text-lg bg-emerald-800 text-white hover:bg-emerald-700 transition-all hover:scale-[1.02]">
 <Link href="/join">
 <Heart className="mr-2 h-6 w-6 fill-white"/>
 {t.ctaCta1}
 </Link>
 </Button>
 <Button asChild variant="outline"size="lg"className="rounded-md h-16 px-10 text-lg border-emerald-100 text-emerald-900 hover:bg-emerald-50 transition-all hover:scale-[1.02]">
 <Link href="/signup">
 {t.ctaCta2}
 </Link>
 </Button>
 </div>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, x: 50 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 className="lg:w-1/2 relative"
 >
 <div className="relative rounded-md overflow-hidden border-8 border-slate-50 transform rotate-2">
 <img src="/images/purnea_heritage.png"alt="Community"className="w-full aspect-[4/5] object-cover"/>
 <div className="absolute inset-x-0 bottom-0 p-10 from-black/80">
 <p className="text-white text-xl font-bold italic">
"Small acts, when multiplied by millions of people, can transform the world."
 </p>
 </div>
 </div>
 {/* Floating stat card */}
 <div className="absolute -left-12 bottom-20 bg-white p-4 rounded-md border border-slate-100 hidden md:block animate-bounce-slow">
 <div className="text-4xl font-black text-emerald-600 mb-1">98%</div>
 <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Satisfaction Rate</div>
 </div>
 </motion.div>
 </div>
 </div>
 </section>
 </PublicLayout>
 );
}

function ProgramCard({ icon, title, desc, stats, color, lightColor }) {
 return (
 <motion.div {...fadeInUp} className="group h-full">
 <Card className="h-full bg-white rounded-md border-slate-100 hover:-900/5 transition-all flex flex-col overflow-hidden">
 <CardHeader className="pb-6">
 <div className={cn("w-20 h-20 rounded-md flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform", color)}>
 {icon}
 </div>
 <CardTitle className="text-2xl font-bold text-slate-900 mb-4">{title}</CardTitle>
 <CardDescription className="text-slate-500 leading-relaxed text-base">
 {desc}
 </CardDescription>
 </CardHeader>
 <CardContent className="flex-1">
 <div className="space-y-4 pt-4 border-t border-slate-50">
 {stats.map((item, i) => (
 <div key={i} className="flex items-center gap-3">
 <div className={cn("flex h-6 w-6 items-center justify-center rounded-md text-xs", lightColor)}>
 <CheckCircle2 className="h-4 w-4"/>
 </div>
 <span className="text-sm font-medium text-slate-600">{item}</span>
 </div>
 ))}
 </div>
 </CardContent>
 <CardFooter className="pt-8 pb-10">
 <Button asChild className={cn("w-full h-14 rounded-md text-base transition-all group-hover:scale-[1.02]", color)}>
 <Link href="/join">
 {title}
 <ArrowRight className="ml-2 h-5 w-5"/>
 </Link>
 </Button>
 </CardFooter>
 </Card>
 </motion.div>
 );
}

function ImpactItem({ icon, title, desc, iconColor ="text-emerald-600"}) {
 return (
 <div className="flex gap-4">
 <div className={cn("h-10 w-10 flex items-center justify-center rounded-md bg-slate-50 shrink-0", iconColor)}>
 {icon}
 </div>
 <div>
 <h4 className="font-bold text-slate-900 text-sm mb-1">{title}</h4>
 {desc && <p className="text-xs text-slate-500">{desc}</p>}
 </div>
 </div>
 );
}
