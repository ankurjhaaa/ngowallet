import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, HeartPulse, ShieldAlert, CheckSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function ChildSafety() {
    return (
        <div className="min-h-screen bg-slate-50/50">
            <Head title="Child Safety Policy — Bazm-e-Haidri" />
            
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <Link 
                    href="/login" 
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-red-600 font-bold text-[10px] uppercase tracking-widest mb-10 transition-colors"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to Portal
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-14 w-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                            <HeartPulse className="h-7 w-7" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Child Safety Policy</h1>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Our Commitment to Protection</p>
                        </div>
                    </div>

                    <div className="space-y-12 mt-12">
                        <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <ShieldAlert className="h-5 w-5 text-emerald-600" />
                                <h2 className="text-xl font-black text-slate-900 tracking-tight">Zero Tolerance Commitment</h2>
                            </div>
                            <p className="text-slate-600 leading-relaxed font-medium">
                                Bazm-e-Haidri has a zero-tolerance approach to child exploitation and abuse. We are dedicated to promoting the safety, well-being, and proper development of children who intersect with our programs and members.
                            </p>
                        </section>

                        <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckSquare className="h-5 w-5 text-emerald-600" />
                                <h2 className="text-xl font-black text-slate-900 tracking-tight">Core Guidelines</h2>
                            </div>
                            <ul className="mt-4 space-y-3">
                                {[
                                    "All staff, volunteers, and associated members must undergo appropriate checks.",
                                    "Strict adherence to safe communication and physical contact protocols.",
                                    "Immediate reporting of any suspected abuse or neglect to the concerned authorities.",
                                    "Continuous awareness to recognize, prevent, and respond to child safety concerns."
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-slate-600 font-medium">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 mt-2" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <div className="text-center pt-8">
                            <p className="text-slate-400 text-sm font-medium">
                                For any reports or concerns about our initiatives, please contact our helpline immediately.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
