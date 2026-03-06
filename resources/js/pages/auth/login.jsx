import { useState } from"react";
import PublicLayout from"@/layouts/PublicLayout";
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
 <PublicLayout>
 <Head title="Login — Bazm-e-Haidri"/>
 <div className="min-h-[85vh] flex items-center justify-center px-4 py-5 relative overflow-hidden bg-slate-50">
 {/* Decorative background elements */}
 <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100/50 rounded-md blur-3xl -z-0 -translate-x-1/2 -translate-y-1/2"></div>
 <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/30 rounded-md blur-3xl -z-0 translate-x-1/2 translate-y-1/2"></div>

 <motion.div 
 initial={{ opacity: 0, scale: 0.95, y: 20 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 className="w-full max-w-md relative z-10"
 >
 <Card className="border-slate-100 rounded-md overflow-hidden bg-white/80 backdrop-blur-xl">
 <CardHeader className="pt-10 pb-6 text-center">
 <motion.div 
 initial={{ rotate: -10 }}
 animate={{ rotate: 0 }}
 className="w-16 h-16 mx-auto rounded-md bg-emerald-800 text-white flex items-center justify-center mb-4"
 >
 <i className="fas fa-mosque text-2xl"></i>
 </motion.div>
 <CardTitle className="text-3xl font-black tracking-tight text-slate-900">Welcome Back</CardTitle>
 <CardDescription className="text-slate-500 mt-2 font-medium">
 Securely access your NGO account
 </CardDescription>
 </CardHeader>
 
 <CardContent className="px-4 pb-10">
 {/* Segmented Control */}
 <div className="flex p-1 bg-slate-100 rounded-md mb-5">
 <Button variant="default"className="flex-1 rounded-md h-11 text-sm font-bold bg-emerald-800 text-white hover:bg-emerald-800">
 Login
 </Button>
 <Button asChild variant="ghost"className="flex-1 rounded-md h-11 text-sm font-bold text-slate-500 hover:text-slate-900 hover:bg-transparent">
 <Link href="/signup">Sign Up</Link>
 </Button>
 </div>

 <form className="space-y-6"onSubmit={submit}>
 <div className="space-y-2">
 <Label htmlFor="phone"className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Phone Number</Label>
 <div className="relative">
 <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"/>
 <Input
 id="phone"
 type="tel"
 value={data.phone}
 onChange={e => setData('phone', e.target.value)}
 placeholder="Enter registered mobile"
 className="h-14 pl-12 rounded-md border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-sm font-medium"
 />
 </div>
 {errors.phone && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase">{errors.phone}</motion.p>}
 </div>

 <div className="space-y-2">
 <div className="flex justify-between items-center px-1">
 <Label htmlFor="password"className="text-xs font-bold uppercase tracking-widest text-slate-400">Password</Label>
 <Link href="/forgot-password"title="Recover Password"className="text-[10px] font-black uppercase text-emerald-700 hover:underline">
 Forgot?
 </Link>
 </div>
 <div className="relative">
 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"/>
 <Input
 id="password"
 type={showPassword ?"text":"password"}
 value={data.password}
 onChange={e => setData('password', e.target.value)}
 placeholder="••••••••"
 className="h-14 pl-12 pr-12 rounded-md border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-sm font-medium"
 />
 <button
 type="button"
 onClick={() => setShowPassword(!showPassword)}
 className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-700 transition-colors"
 >
 {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
 </button>
 </div>
 {errors.password && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase">{errors.password}</motion.p>}
 </div>

 <Button 
 type="submit"
 disabled={processing}
 className="w-full h-14 rounded-md bg-emerald-800 text-white hover:bg-emerald-700 transition-all text-base font-bold group"
 >
 Login to Account
 <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"/>
 </Button>
 </form>
 </CardContent>
 
 <CardFooter className="bg-slate-50/50 px-4 py-4 border-t border-slate-100 flex justify-center">
 <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
 <ShieldCheck className="h-3 w-3 text-emerald-500"/>
 Secure 256-bit Encrypted Login
 </div>
 </CardFooter>
 </Card>
 
 <p className="text-center mt-10 text-sm text-slate-500 font-medium">
 Don't have an account? <Link href="/signup"className="text-emerald-700 font-bold hover:underline">Create one here</Link>
 </p>
 </motion.div>
 </div>
 </PublicLayout>
 );
}
