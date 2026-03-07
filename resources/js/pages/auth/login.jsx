import { useState } from"react";
import { Link, useForm, Head } from"@inertiajs/react";
import { Button } from"@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Eye, EyeOff, Phone, Lock, ArrowRight, ShieldCheck } from"lucide-react";
import { motion } from"framer-motion";
import { cn } from"@/lib/utils";

export default function Login() {
 const [showPassword, setShowPassword] = useState(false);
 const { data, setData, post, processing, errors } = useForm({
 phone:'',
 password:'',
 });

 const submit = (e) => {
 e.preventDefault();
 post('/login_post');
 };

 return (
 <div className="min-h-screen bg-white">
 <Head title="Login — Bazm-e-Haidri"/>
 
 <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-white">
 {/* Decorative background elements */}
 <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-3xl -z-0 -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
 <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-3xl -z-0 translate-x-1/2 translate-y-1/2 opacity-60"></div>

 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 className="w-full max-w-[420px] relative z-10"
 >
 {/* Brand Logo and Header */}
 <div className="text-center mb-10">
 <motion.div 
 initial={{ scale: 0.8, rotate: -10 }}
 animate={{ scale: 1, rotate: 0 }}
 className="w-16 h-16 mx-auto rounded-3xl bg-red-600 text-white flex items-center justify-center mb-6 shadow-xl shadow-red-200"
 >
 <i className="fas fa-mosque text-2xl"></i>
 </motion.div>
 <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Member Portal</h1>
 <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Secure Access Only</p>
 </div>

 <Card className="border-none rounded-[32px] overflow-hidden bg-white shadow-2xl shadow-slate-200/60 ring-1 ring-slate-100/50">
 <CardHeader className="pt-10 pb-6 text-center">
 <CardTitle className="text-2xl font-black tracking-tight text-slate-900">Sign In</CardTitle>
 <CardDescription className="text-slate-400 mt-2 font-medium">
 Enter your credentials to continue
 </CardDescription>
 </CardHeader>
 
 <CardContent className="px-8 pb-10">
 <form className="space-y-6"onSubmit={submit}>
 <div className="space-y-2">
 <Label htmlFor="phone"className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</Label>
 <div className="relative">
 <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300"/>
 <Input
 id="phone"
 type="tel"
 value={data.phone}
 onChange={e => setData('phone', e.target.value)}
 placeholder="Enter your mobile"
 className="h-14 pl-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-sm font-bold shadow-none"
 />
 </div>
 {errors.phone && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-[10px] font-black mt-1 ml-1 uppercase">{errors.phone}</motion.p>}
 </div>

 <div className="space-y-2">
 <div className="flex justify-between items-center px-1">
 <Label htmlFor="password"className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</Label>
 <Link href="/forgot-password"title="Recover Password"className="text-[10px] font-black uppercase text-red-600 hover:underline tracking-tight">
 Forgot Password?
 </Link>
 </div>
 <div className="relative">
 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300"/>
 <Input
 id="password"
 type={showPassword ?"text":"password"}
 value={data.password}
 onChange={e => setData('password', e.target.value)}
 placeholder="••••••••"
 className="h-14 pl-12 pr-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-sm font-bold shadow-none"
 />
 <button
 type="button"
 onClick={() => setShowPassword(!showPassword)}
 className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-600 transition-colors"
 >
 {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
 </button>
 </div>
 {errors.password && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-[10px] font-black mt-1 ml-1 uppercase">{errors.password}</motion.p>}
 </div>

 <Button 
 type="submit"
 disabled={processing}
 className="w-full h-16 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all text-lg font-black group shadow-lg shadow-red-900/20 active:scale-[0.98]"
 >
 Sign In
 <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1"/>
 </Button>
 </form>
 </CardContent>
 
 <CardFooter className="bg-slate-50/50 px-8 py-4 border-t border-slate-50 flex flex-col gap-3 items-center">
 <div className="flex gap-4">
 <Link href="/privacy-policy"className="text-[10px] uppercase font-black text-slate-400 hover:text-red-600 tracking-widest transition-colors">Privacy Policy</Link>
 <Link href="/delete-account"className="text-[10px] uppercase font-black text-slate-400 hover:text-red-600 tracking-widest transition-colors">Delete Account</Link>
 </div>
 <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-slate-400 tracking-widest opacity-60">
 <ShieldCheck className="h-3.5 w-3.5 text-emerald-500"/>
 Secured Portal Login
 </div>
 </CardFooter>
 </Card>
 
 <div className="text-center mt-10">
 <p className="text-sm text-slate-400 font-bold mb-2 uppercase tracking-widest text-[10px]">New Member?</p>
 <Link href="/signup"className="inline-flex items-center h-12 px-8 rounded-full border border-slate-200 text-slate-600 font-black hover:bg-slate-50 hover:text-red-600 transition-all active:scale-[0.98]">
 Create Member Account
 </Link>
 </div>
 </motion.div>
 </div>
 </div>
 );
}
