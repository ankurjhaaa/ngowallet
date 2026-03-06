import { Link, Head } from"@inertiajs/react";
import { Button } from"@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Phone, ArrowLeft, ShieldCheck } from"lucide-react";
import { motion } from"framer-motion";

export default function ForgotPassword() {
 return (
 <div className="min-h-screen bg-white">
 <Head title="Forgot Password — Bazm-e-Haidri"/>
 
 <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-white">
 {/* Decorative background elements */}
 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2 opacity-60"></div>
 <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-3xl -z-0 -translate-x-1/2 translate-y-1/2 opacity-60"></div>

 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 className="w-full max-w-[420px] relative z-10"
 >
 {/* Brand Logo */}
 <div className="text-center mb-10">
 <motion.div 
 initial={{ scale: 0.8 }}
 animate={{ scale: 1 }}
 className="w-16 h-16 mx-auto rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mb-6"
 >
 <ShieldCheck className="h-8 w-8"/>
 </motion.div>
 <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Reset Password</h1>
 <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Portal Security</p>
 </div>

 <Card className="border-none rounded-[32px] overflow-hidden bg-white shadow-2xl shadow-slate-200/60 ring-1 ring-slate-100/50">
 <CardHeader className="pt-10 pb-6 text-center">
 <CardTitle className="text-2xl font-black tracking-tight text-slate-900">Recovery</CardTitle>
 <CardDescription className="text-slate-400 mt-2 font-medium">
 Enter your phone to get reset link
 </CardDescription>
 </CardHeader>
 
 <CardContent className="px-8 pb-10">
 <form className="space-y-6">
 <div className="space-y-2">
 <Label htmlFor="phone"className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</Label>
 <div className="relative">
 <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300"/>
 <Input
 id="phone"
 type="tel"
 placeholder="10 digit mobile number"
 className="h-14 pl-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-sm font-bold shadow-none"
 />
 </div>
 </div>

 <Button 
 type="submit"
 className="w-full h-16 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all text-lg font-black group shadow-lg shadow-red-900/20 active:scale-[0.98]"
 >
 Send Reset Link
 </Button>
 </form>
 </CardContent>
 
 <CardFooter className="bg-slate-50/50 px-8 py-4 border-t border-slate-50 flex justify-center">
 <Link href="/login"className="inline-flex items-center gap-2 text-[10px] uppercase font-bold text-slate-400 tracking-widest hover:text-red-600 transition-colors">
 <ArrowLeft className="h-3.5 w-3.5"/>
 Back to Login
 </Link>
 </CardFooter>
 </Card>
 </motion.div>
 </div>
 </div>
 );
}
