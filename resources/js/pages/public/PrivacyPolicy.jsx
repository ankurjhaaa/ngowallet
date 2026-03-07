import { Head, Link } from "@inertiajs/react";
import { Shield, ArrowLeft, Lock, Eye, FileText, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-50/50">
            <Head title="Privacy Policy — Bazm-e-Haidri" />
            
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
                        <div className="h-14 w-14 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-200">
                            <Shield className="h-7 w-7" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Last Updated: March 2026</p>
                        </div>
                    </div>

                    <div className="space-y-12 mt-12">
                        <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <Lock className="h-5 w-5 text-red-600" />
                                <h2 className="text-xl font-black text-slate-900 tracking-tight">Information We Collect</h2>
                            </div>
                            <p className="text-slate-600 leading-relaxed font-medium">
                                At Bazm-e-Haidri, we collect minimal personal information necessary to manage your membership and contributions. This includes your name, phone number, and address provided during registration. We do not share this data with any third-party marketing agencies.
                            </p>
                        </section>

                        <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <Eye className="h-5 w-5 text-red-600" />
                                <h2 className="text-xl font-black text-slate-900 tracking-tight">How We Use Your Data</h2>
                            </div>
                            <p className="text-slate-600 leading-relaxed font-medium">
                                Your data is used exclusively for:
                            </p>
                            <ul className="mt-4 space-y-3">
                                {[
                                    "Managing your monthly/yearly contribution plans",
                                    "Generating contribution receipts and statements",
                                    "Sending important updates regarding our NGO's activities",
                                    "Ensuring secure access to your member portal"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-slate-600 font-medium">
                                        <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="h-5 w-5 text-red-600" />
                                <h2 className="text-xl font-black text-slate-900 tracking-tight">Data Security</h2>
                            </div>
                            <p className="text-slate-600 leading-relaxed font-medium">
                                We implement industry-standard security measures to protect your information. Your passwords are encrypted, and access to the portal is secured via modern authentication protocols.
                            </p>
                        </section>

                        <div className="text-center pt-8">
                            <p className="text-slate-400 text-sm font-medium">
                                If you have any questions regarding your privacy, please contact our support team.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
