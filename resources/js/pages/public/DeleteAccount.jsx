import { Head, Link } from "@inertiajs/react";
import { Trash2, ArrowLeft, Mail, Phone, AlertCircle, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function DeleteAccount() {
    return (
        <div className="min-h-screen bg-slate-50/50">
            <Head title="Delete Account — Bazm-e-Haidri" />
            
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
                        <div className="h-14 w-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-200">
                            <Trash2 className="h-7 w-7" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Account Deletion</h1>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Request Process</p>
                        </div>
                    </div>

                    <div className="space-y-8 mt-12">
                        <div className="bg-red-50 border border-red-100 p-6 rounded-[24px]">
                            <div className="flex gap-4">
                                <AlertCircle className="h-6 w-6 text-red-600 shrink-0" />
                                <div>
                                    <h3 className="font-black text-red-900 tracking-tight">Important Notice</h3>
                                    <p className="text-red-700/80 text-sm font-medium mt-1">
                                        Deleting your account will permanently remove your access to the contribution portal and receipt history. This action cannot be undone by members directly for security reasons.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight mb-6">How to Delete Your Account</h2>
                            <p className="text-slate-600 leading-relaxed font-medium mb-8">
                                To ensure that your account is deleted securely and all pending commitments are settled, we require a manual request. Please follow one of the methods below:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-[24px] bg-slate-50 border border-slate-100 group hover:border-red-200 transition-all">
                                    <Mail className="h-6 w-6 text-slate-400 mb-4 group-hover:text-red-600 transition-colors" />
                                    <h3 className="font-bold text-slate-900 mb-1">Email Request</h3>
                                    <p className="text-sm text-slate-500 font-medium">Send an email from your registered address to support@bazm-e-haidri.org</p>
                                </div>

                                <div className="p-6 rounded-[24px] bg-slate-50 border border-slate-100 group hover:border-red-200 transition-all">
                                    <Phone className="h-6 w-6 text-slate-400 mb-4 group-hover:text-red-600 transition-colors" />
                                    <h3 className="font-bold text-slate-900 mb-1">Call Support</h3>
                                    <p className="text-sm text-slate-500 font-medium">Call our helpline at +91 90000 00000 to verify and process deletion.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <Info className="h-5 w-5 text-slate-900" />
                                <h2 className="text-xl font-black text-slate-900 tracking-tight">What Happens Next?</h2>
                            </div>
                            <ol className="space-y-4 list-decimal list-inside text-slate-600 font-medium">
                                <li>Our team will verify your identity via a brief call or email response.</li>
                                <li>Your active plans and payment history will be archived for audit trailing.</li>
                                <li>You will receive a confirmation once your record has been deactivated.</li>
                            </ol>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
