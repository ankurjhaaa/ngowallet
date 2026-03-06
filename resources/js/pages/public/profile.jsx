import PublicLayout from"@/layouts/PublicLayout";
import { useForm, usePage, Head } from"@inertiajs/react";
import { useState } from"react";
import { Button } from"@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from"@/components/ui/card";
import { Badge } from"@/components/ui/badge";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { 
 User, PenSquare, Download, ChevronLeft, ChevronRight, 
 Search, ShieldCheck, Mail, MapPin, Calendar, Heart,
 Activity, ArrowUpRight, CheckCircle2, X
} from"lucide-react";
import { motion, AnimatePresence } from"framer-motion";
import { cn } from"@/lib/utils";

const formatDate = (date) => {
 if (!date) return"-";
 return new Date(date).toLocaleDateString("en-GB", {
 day:"2-digit",
 month:"short",
 year:"numeric",
 });
};

export default function Profile() {
 const { user, userPlans = [] } = usePage().props;
 const [activeIndex, setActiveIndex] = useState(0);
 const [showEdit, setShowEdit] = useState(false);

 const activePlan = userPlans[activeIndex];

 return (
 <PublicLayout>
 <Head title="My Profile — Bazm-e-Haidri"/>
 
 <div className="bg-slate-50 min-h-screen py-4 md:py-4">
 <div className="container mx-auto px-4 max-w-5xl">

 {/* Header Section */}
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
 <motion.div 
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 >
 <Badge variant="outline"className="border-emerald-200 text-emerald-700 bg-emerald-50 px-3 py-1 mb-3 rounded-md uppercase tracking-widest text-[10px] font-bold">
 Member Portal
 </Badge>
 <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
 Salam, {user.name.split('')[0]}
 </h1>
 <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
 <Activity className="h-4 w-4 text-emerald-500"/>
 Track your contributions and impact in real-time
 </p>
 </motion.div>

 <div className="flex gap-3">
 <Button 
 onClick={() => setShowEdit(true)}
 variant="outline"
 size="lg"
 className="rounded-md border-slate-200 bg-white hover:bg-slate-50 transition-all gap-2"
 >
 <PenSquare className="h-4 w-4"/>
 Edit Profile
 </Button>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
 
 {/* LEFT: Plan Details */}
 <div className="lg:col-span-2 space-y-8">
 {userPlans.length > 0 ? (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 >
 <Card className="border-none bg-white rounded-md overflow-hidden relative">
 <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-md blur-3xl -z-0"></div>
 
 <CardHeader className="p-4 pb-4 relative z-10">
 <div className="flex justify-between items-center mb-4">
 <Badge className="bg-emerald-800 text-white rounded-md px-4 py-1">
 Active Plan
 </Badge>
 <div className="flex items-center gap-2">
 <Button variant="ghost"size="icon"className="h-10 w-10 rounded-md hover:bg-emerald-50 text-emerald-800"asChild>
 <a href={`/profile/plan/${activePlan.id}/pdf`} target="_blank"rel="noopener noreferrer">
 <Download className="h-5 w-5"/>
 </a>
 </Button>
 <div className="flex gap-1 ml-2">
 <Button 
 variant="ghost"
 size="icon"
 className="h-8 w-8 rounded-md bg-slate-50 disabled:opacity-30"
 disabled={activeIndex === 0}
 onClick={() => setActiveIndex(activeIndex - 1)}
 >
 <ChevronLeft className="h-4 w-4"/>
 </Button>
 <Button 
 variant="ghost"
 size="icon"
 className="h-8 w-8 rounded-md bg-slate-50 disabled:opacity-30"
 disabled={activeIndex === userPlans.length - 1}
 onClick={() => setActiveIndex(activeIndex + 1)}
 >
 <ChevronRight className="h-4 w-4"/>
 </Button>
 </div>
 </div>
 </div>
 <CardTitle className="text-3xl font-black text-slate-900 tracking-tight">{activePlan.name}</CardTitle>
 <CardDescription className="font-bold text-emerald-700 uppercase tracking-widest text-[10px] mt-2">
 {formatDate(activePlan.start_date)} – {formatDate(activePlan.end_date)}
 </CardDescription>
 </CardHeader>

 <CardContent className="p-4 pt-6 relative z-10">
 <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
 {/* Progress Circle Wrapper */}
 <div className="relative h-40 w-40 shrink-0">
 <svg viewBox="0 0 36 36"className="h-full w-full transform -rotate-90">
 <path
 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
 fill="none"
 stroke="#f1f5f9"
 strokeWidth="3.5"
 strokeLinecap="round"
 />
 <motion.path
 initial={{ strokeDasharray:"0, 100"}}
 animate={{ strokeDasharray:`${activePlan.percentage_paid}, 100` }}
 transition={{ duration: 1.5, ease:"easeOut"}}
 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
 fill="none"
 stroke="url(#emeraldGradient)"
 strokeWidth="3.5"
 strokeLinecap="round"
 />
 <defs>
 <linearGradient id="emeraldGradient"x1="0%"y1="0%"x2="100%"y2="100%">
 <stop offset="0%"stopColor="#10b981"/>
 <stop offset="100%"stopColor="#065f46"/>
 </linearGradient>
 </defs>
 </svg>
 <div className="absolute inset-0 flex flex-col items-center justify-center">
 <span className="text-4xl font-black text-slate-900 leading-none">{activePlan.percentage_paid}</span>
 <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Paid</span>
 </div>
 </div>

 <div className="flex-1 w-full space-y-6">
 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 rounded-md bg-emerald-50/50 border border-emerald-100/50">
 <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest mb-1">Paid Amount</p>
 <p className="text-2xl font-black text-emerald-900">₹{(activePlan.yearly_amount - activePlan.due_amount).toLocaleString()}</p>
 </div>
 <div className="p-4 rounded-md bg-slate-50 border border-slate-100">
 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Target</p>
 <p className="text-2xl font-black text-slate-800">₹{activePlan.yearly_amount.toLocaleString()}</p>
 </div>
 </div>
 <div className="p-3 rounded-md bg-red-50/30 border border-red-100 flex items-center justify-between">
 <div>
 <p className="text-[10px] font-bold text-red-800 uppercase tracking-widest leading-none mb-1">Total Pending</p>
 <p className="text-xl font-black text-red-900">₹{activePlan.pending_amount.toLocaleString()}</p>
 </div>
 <ArrowUpRight className="h-6 w-6 text-red-400"/>
 </div>
 </div>
 </div>

 {/* Contributions Table/List */}
 <div className="pt-8 border-t border-slate-50">
 <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Recent Contributions</h3>
 {activePlan.payments.length > 0 ? (
 <div className="space-y-3">
 {activePlan.payments.map((p, i) => (
 <ContributionRow key={i} amount={p.amount} date={p.payment_date} mode={p.payment_mode} />
 ))}
 </div>
 ) : (
 <div className="text-center py-4 rounded-md border-2 border-dashed border-slate-100 text-slate-400 text-sm font-medium italic">
 No contributions recorded yet for this plan.
 </div>
 )}
 </div>
 </CardContent>
 </Card>
 </motion.div>
 ) : (
 <Card className="border-none bg-white rounded-md p-12 text-center">
 <div className="w-24 h-24 mx-auto mb-5 rounded-md bg-slate-50 flex items-center justify-center text-slate-300">
 <ShieldCheck className="h-12 w-12"/>
 </div>
 <h2 className="text-2xl font-bold text-slate-900 mb-4">No Active Contribution Plan</h2>
 <p className="text-slate-500 max-w-sm mx-auto mb-10 leading-relaxed font-medium">
 You haven't joined any contribution plan yet. Your impact journey starts when you commit to a mission.
 </p>
 <Button asChild className="rounded-md h-14 px-4 bg-emerald-800 hover:bg-emerald-700">
 <Link href="/programs">Explore Programs</Link>
 </Button>
 </Card>
 )}
 </div>

 {/* RIGHT: Member Info */}
 <div className="lg:col-span-1 space-y-8">
 <Card className="border-none bg-white rounded-md p-4">
 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-5">Personal Information</h3>
 <div className="space-y-6">
 <InfoField icon={<User className="h-4 w-4"/>} label="Full Name"value={user.name} />
 <InfoField icon={<Mail className="h-4 w-4"/>} label="Email Address"value={user.email ||'Not provided'} />
 <InfoField icon={<Calendar className="h-4 w-4"/>} label="D.O.B"value={formatDate(user.date_of_birth)} />
 <InfoField icon={<MapPin className="h-4 w-4"/>} label="Residential Address"value={user.address ||'Address not updated'} />
 </div>
 </Card>

 <Card className="border-none bg-slate-900 text-white rounded-md p-4 transform -rotate-1 group hover:rotate-0 transition-transform">
 <div className="relative z-10">
 <Heart className="h-10 w-10 text-emerald-500 mb-4 fill-emerald-500 animate-pulse"/>
 <h3 className="text-xl font-bold mb-4">You're making a difference.</h3>
 <p className="text-slate-400 text-sm leading-relaxed mb-4">
 Your regular contributions help us sustain educational programs and medical camps in rural Purnea.
 </p>
 <Button asChild variant="secondary"className="w-full rounded-md h-12 font-bold bg-white text-slate-900 hover:bg-slate-100">
 <Link href="/vision">Our Impact Vision</Link>
 </Button>
 </div>
 </Card>
 </div>
 </div>
 </div>
 </div>

 {/* Edit Profile Modal */}
 <AnimatePresence>
 {showEdit && (
 <EditProfileModal user={user} onClose={() => setShowEdit(false)} />
 )}
 </AnimatePresence>
 </PublicLayout>
 );
}

function InfoField({ icon, label, value }) {
 return (
 <div className="flex gap-4">
 <div className="h-9 w-9 rounded-md bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
 {icon}
 </div>
 <div className="min-w-0">
 <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 mb-1">{label}</p>
 <p className="text-sm font-bold text-slate-800 truncate">{value}</p>
 </div>
 </div>
 );
}

function ContributionRow({ amount, date, mode }) {
 return (
 <div className="flex items-center justify-between p-4 rounded-md bg-slate-50/50 border border-slate-50 hover:bg-white hover:-200/50 transition-all group">
 <div className="flex items-center gap-4">
 <div className="h-10 w-10 flex items-center justify-center rounded-md bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
 <CheckCircle2 className="h-5 w-5"/>
 </div>
 <div>
 <p className="text-sm font-bold text-slate-900 tracking-tight">{formatDate(date)}</p>
 <p className="text-[10px] text-slate-400 font-bold uppercase">{mode}</p>
 </div>
 </div>
 <div className="text-lg font-black text-emerald-700 tracking-tighter">
 + ₹{amount.toLocaleString()}
 </div>
 </div>
 );
}

function EditProfileModal({ user, onClose }) {
 const { data, setData, post, processing, errors } = useForm({
 name: user.name ||"",
 email: user.email ||"",
 address: user.address ||"",
 gender: user.gender ||"",
 date_of_birth: user.date_of_birth ||"",
 });

 const submit = (e) => {
 e.preventDefault();
 post('/profile_update', {
 onSuccess: () => onClose(),
 });
 };

 return (
 <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
 <motion.div 
 initial={{ opacity: 0 }} 
 animate={{ opacity: 1 }} 
 exit={{ opacity: 0 }}
 className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
 onClick={onClose}
 />
 <motion.div 
 initial={{ opacity: 0, scale: 0.95, y: 10 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.95, y: 10 }}
 className="relative bg-white w-full max-w-xl rounded-md p-10 overflow-hidden flex flex-col max-h-[90vh]"
 >
 <div className="flex justify-between items-center mb-5">
 <div>
 <h2 className="text-2xl font-black text-slate-900 tracking-tight">Update Profile</h2>
 <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Personal Details</p>
 </div>
 <Button variant="ghost"size="icon"className="rounded-md h-10 w-10 hover:bg-slate-100"onClick={onClose}>
 <X className="h-5 w-5"/>
 </Button>
 </div>

 <form onSubmit={submit} className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar pb-6">
 <div className="space-y-2">
 <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Account Holder Name</Label>
 <Input
 value={data.name}
 onChange={e => setData("name", e.target.value)}
 className="h-14 rounded-md border-slate-100 bg-slate-50/50 focus:bg-white px-5 transition-all font-bold"
 />
 {errors.name && <p className="text-red-500 text-[10px] font-black uppercase mt-1 ml-1">{errors.name}</p>}
 </div>

 <div className="space-y-2">
 <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
 <Input
 type="email"
 value={data.email}
 onChange={e => setData("email", e.target.value)}
 className="h-14 rounded-md border-slate-100 bg-slate-50/50 focus:bg-white px-5 transition-all font-bold"
 />
 {errors.email && <p className="text-red-500 text-[10px] font-black uppercase mt-1 ml-1">{errors.email}</p>}
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Gender</Label>
 <select
 value={data.gender}
 onChange={e => setData("gender", e.target.value)}
 className="w-full h-14 rounded-md border border-slate-100 bg-slate-50/50 focus:bg-white px-5 transition-all font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100"
 >
 <option value="">Select</option>
 <option value="male">Male</option>
 <option value="female">Female</option>
 <option value="other">Other</option>
 </select>
 </div>
 <div className="space-y-2">
 <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">D.O.B</Label>
 <Input
 type="date"
 value={data.date_of_birth}
 onChange={e => setData("date_of_birth", e.target.value)}
 className="h-14 rounded-md border-slate-100 bg-slate-50/50 focus:bg-white px-5 transition-all font-bold"
 />
 </div>
 </div>

 <div className="space-y-2">
 <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Permanent Address</Label>
 <textarea
 value={data.address}
 onChange={e => setData("address", e.target.value)}
 rows="3"
 className="w-full rounded-md border border-slate-100 bg-slate-50/50 focus:bg-white p-3 transition-all font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100"
 />
 </div>

 <Button type="submit"disabled={processing} className="w-full h-16 rounded-md bg-emerald-800 hover:bg-emerald-700 text-lg font-black transition-all">
 Update Member Profile
 </Button>
 </form>
 </motion.div>
 </div>
 );
}
