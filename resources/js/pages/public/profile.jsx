import AdminLayout from"@/layouts/AdminLayout";
import { useForm, usePage, Head, Link } from"@inertiajs/react";
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

 const activePlan = userPlans.length > 0 ? userPlans[activeIndex] : null;

 return (
 <AdminLayout title="My Profile">
 <Head title="My Profile — Bazm-e-Haidri"/>
 
 <div className="pb-20">
 {/* Header Section */}
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
 <motion.div 
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 >
 <Badge variant="outline"className="border-red-100 text-red-700 bg-red-50 px-3 py-1 mb-3 rounded-md uppercase tracking-widest text-[10px] font-bold">
 Member Account
 </Badge>
 <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
 Salam, {user?.name?.split(' ')[0] || 'User'}
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
 className="rounded-xl border-slate-200 bg-white hover:bg-slate-50 transition-all gap-2 shadow-sm font-bold h-12"
 >
 <PenSquare className="h-4 w-4"/>
 Edit Profile
 </Button>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
 
 {/* LEFT: Plan Details */}
 <div className="lg:col-span-2 space-y-8">
 {userPlans.length > 0 && activePlan ? (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 >
 <Card className="border-none bg-white rounded-[24px] overflow-hidden relative shadow-sm border border-slate-100">
 <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -z-0"></div>
 
 <CardHeader className="p-6 relative z-10">
 <div className="flex justify-between items-center mb-6">
 <Badge className="bg-red-600 text-white rounded-lg px-4 py-1.5 font-bold text-[10px] uppercase tracking-wider">
 Active Plan
 </Badge>
 <div className="flex items-center gap-2">
 <Button variant="ghost"size="icon"className="h-10 w-10 rounded-xl hover:bg-slate-50 text-slate-600 border border-slate-100"asChild>
 <a href={`/profile/plan/${activePlan.id}/pdf`} target="_blank"rel="noopener noreferrer">
 <Download className="h-4 w-4"/>
 </a>
 </Button>
 <div className="flex gap-1 ml-2">
 <Button 
 variant="ghost"
 size="icon"
 className="h-10 w-10 rounded-xl bg-slate-50 disabled:opacity-30 border border-slate-100"
 disabled={activeIndex === 0}
 onClick={() => setActiveIndex(activeIndex - 1)}
 >
 <ChevronLeft className="h-4 w-4"/>
 </Button>
 <Button 
 variant="ghost"
 size="icon"
 className="h-10 w-10 rounded-xl bg-slate-50 disabled:opacity-30 border border-slate-100"
 disabled={activeIndex === userPlans.length - 1}
 onClick={() => setActiveIndex(activeIndex + 1)}
 >
 <ChevronRight className="h-4 w-4"/>
 </Button>
 </div>
 </div>
 </div>
 <CardTitle className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">{activePlan.name}</CardTitle>
 <CardDescription className="font-bold text-red-600 uppercase tracking-widest text-[10px]">
 {formatDate(activePlan.start_date)} – {formatDate(activePlan.end_date)}
 </CardDescription>
 </CardHeader>

 <CardContent className="p-6 pt-2 relative z-10">
 <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
 {/* Progress Circle Wrapper */}
 <div className="relative h-44 w-44 shrink-0">
 <svg viewBox="0 0 36 36"className="h-full w-full transform -rotate-90">
 <path
 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
 fill="none"
 stroke="#f1f5f9"
 strokeWidth="3"
 strokeLinecap="round"
 />
 <motion.path
 initial={{ strokeDasharray:"0, 100"}}
 animate={{ strokeDasharray:`${activePlan.percentage_paid}, 100` }}
 transition={{ duration: 1.5, ease:"easeOut"}}
 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
 fill="none"
 stroke="url(#redGradient)"
 strokeWidth="3"
 strokeLinecap="round"
 />
 <defs>
 <linearGradient id="redGradient"x1="0%"y1="0%"x2="100%"y2="100%">
 <stop offset="0%"stopColor="#dc2626"/>
 <stop offset="100%"stopColor="#991b1b"/>
 </linearGradient>
 </defs>
 </svg>
 <div className="absolute inset-0 flex flex-col items-center justify-center">
 <span className="text-4xl font-black text-slate-900 leading-none">{activePlan.percentage_paid}%</span>
 <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Donated</span>
 </div>
 </div>

 <div className="flex-1 w-full space-y-6">
 <div className="grid grid-cols-2 gap-4">
 <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100/50">
 <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-2">Paid Amount</p>
 <p className="text-2xl font-black text-emerald-900 tracking-tight">₹{(activePlan.yearly_amount - activePlan.due_amount).toLocaleString()}</p>
 </div>
 <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Target</p>
 <p className="text-2xl font-black text-slate-800 tracking-tight">₹{activePlan.yearly_amount.toLocaleString()}</p>
 </div>
 </div>
 <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100 flex items-center justify-between">
 <div>
 <p className="text-[10px] font-black text-red-800 uppercase tracking-widest leading-none mb-1.5">Total Pending</p>
 <p className="text-xl font-black text-red-900">₹{activePlan.pending_amount.toLocaleString()}</p>
 </div>
 <ArrowUpRight className="h-6 w-6 text-red-400"/>
 </div>
 </div>
 </div>

 {/* Contributions Table/List */}
 <div className="pt-8 border-t border-slate-50">
 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5">Recent Contributions</h3>
 {activePlan.payments.length > 0 ? (
 <div className="space-y-3">
 {activePlan.payments.map((p, i) => (
 <ContributionRow key={i} amount={p.amount} date={p.payment_date} mode={p.payment_mode} />
 ))}
 </div>
 ) : (
 <div className="text-center py-8 rounded-2xl border-2 border-dashed border-slate-100 text-slate-400 text-sm font-medium italic">
 No contributions recorded yet for this plan.
 </div>
 )}
 </div>
 </CardContent>
 </Card>
 </motion.div>
 ) : (
 <Card className="border-none bg-white rounded-[24px] p-12 text-center shadow-sm border border-slate-100">
 <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-200">
 <ShieldCheck className="h-12 w-12"/>
 </div>
 <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">No Active Plan</h2>
 <p className="text-slate-500 max-w-xs mx-auto mb-10 leading-relaxed font-medium text-sm">
 You haven't joined any contribution plan yet. Your impact journey starts when you commit to a mission.
 </p>
 <Button asChild className="rounded-xl h-14 px-8 bg-red-600 hover:bg-red-700 font-bold shadow-lg shadow-red-900/20 active:scale-95 transition-all">
 <Link href="/programs">Explore Programs</Link>
 </Button>
 </Card>
 )}
 </div>

 {/* RIGHT: Member Info */}
 <div className="lg:col-span-1 space-y-6">
 <Card className="border-none bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 font-bold">Member Information</h3>
 <div className="space-y-6">
 <InfoField icon={<User className="h-4 w-4"/>} label="Full Name"value={user.name} />
 <InfoField icon={<Mail className="h-4 w-4"/>} label="Email Address"value={user.email ||'Not provided'} />
 <InfoField icon={<Calendar className="h-4 w-4"/>} label="D.O.B"value={formatDate(user.date_of_birth)} />
 <InfoField icon={<MapPin className="h-4 w-4"/>} label="Residential Address"value={user.address ||'Address not updated'} />
 </div>
 <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col gap-3">
 <Link href="/privacy-policy"className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-600 flex items-center gap-2 transition-colors">
 <ShieldCheck className="h-3.5 w-3.5"/>
 Privacy Policy
 </Link>
 <Link href="/delete-account"className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-600 flex items-center gap-2 transition-colors">
 <Trash2 className="h-3.5 w-3.5"/>
 Delete Account
 </Link>
 </div>
 </Card>

 <Card className="border-none bg-slate-900 text-white rounded-[24px] p-6 transform -rotate-1 group hover:rotate-0 transition-transform relative overflow-hidden shadow-xl">
 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-600/20 rounded-full blur-2xl"></div>
 <div className="relative z-10">
 <Heart className="h-10 w-10 text-red-500 mb-5 fill-red-500 animate-pulse"/>
 <h3 className="text-xl font-bold mb-4 tracking-tight">You're making a difference.</h3>
 <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
 Your regular contributions help us sustain educational programs and medical camps in rural Purnea.
 </p>
 <Button asChild variant="secondary"className="w-full rounded-xl h-12 font-bold bg-white text-slate-900 hover:bg-slate-50 border-none outline-none shadow-sm active:scale-95 transition-all">
 <Link href="/vision">Our Impact Vision</Link>
 </Button>
 </div>
 </Card>
 </div>
 </div>
 </div>

 {/* Edit Profile Modal */}
 <AnimatePresence>
 {showEdit && (
 <EditProfileModal user={user} onClose={() => setShowEdit(false)} />
 )}
 </AnimatePresence>
 </AdminLayout>
 );
}

function InfoField({ icon, label, value }) {
 return (
 <div className="flex gap-4">
 <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
 {icon}
 </div>
 <div className="min-w-0">
 <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 mb-1 leading-none">{label}</p>
 <p className="text-[13px] font-bold text-slate-800 truncate leading-snug">{value}</p>
 </div>
 </div>
 );
}

function ContributionRow({ amount, date, mode }) {
 return (
 <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50/50 border border-slate-50 hover:bg-white hover:border-slate-200 transition-all group active:scale-[0.99]">
 <div className="flex items-center gap-4">
 <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm transition-transform border border-slate-100">
 <CheckCircle2 className="h-5 w-5"/>
 </div>
 <div>
 <p className="text-sm font-bold text-slate-900 tracking-tight leading-none mb-1">{formatDate(date)}</p>
 <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{mode}</p>
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
 className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
 onClick={onClose}
 />
 <motion.div 
 initial={{ opacity: 0, scale: 0.95, y: 10 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.95, y: 10 }}
 className="relative bg-white w-full max-w-xl rounded-[32px] p-8 sm:p-10 overflow-hidden flex flex-col max-h-[90vh] shadow-2xl"
 >
 <div className="flex justify-between items-center mb-8">
 <div>
 <h2 className="text-2xl font-black text-slate-900 tracking-tight">Update Profile</h2>
 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2">Personal Details</p>
 </div>
 <Button variant="ghost"size="icon"className="rounded-full h-10 w-10 hover:bg-slate-100 flex items-center justify-center"onClick={onClose}>
 <X className="h-5 w-5 text-slate-400"/>
 </Button>
 </div>

 <form onSubmit={submit} className="flex-1 overflow-y-auto space-y-6 pr-2 hidden-scrollbar pb-6">
 <div className="space-y-2">
 <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Account Holder Name</Label>
 <Input
 value={data.name}
 onChange={e => setData("name", e.target.value)}
 className="h-14 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white px-5 transition-all font-bold shadow-none"
 />
 {errors.name && <p className="text-red-500 text-[10px] font-black uppercase mt-1 ml-1">{errors.name}</p>}
 </div>

 <div className="space-y-2">
 <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
 <Input
 type="email"
 value={data.email}
 onChange={e => setData("email", e.target.value)}
 className="h-14 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white px-5 transition-all font-bold shadow-none"
 />
 {errors.email && <p className="text-red-500 text-[10px] font-black uppercase mt-1 ml-1">{errors.email}</p>}
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Gender</Label>
 <select
 value={data.gender}
 onChange={e => setData("gender", e.target.value)}
 className="w-full h-14 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white px-5 transition-all font-bold text-sm focus:outline-none focus:ring-2 focus:ring-red-100 appearance-none"
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
 className="h-14 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white px-5 transition-all font-bold shadow-none"
 />
 </div>
 </div>

 <div className="space-y-2">
 <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Permanent Address</Label>
 <textarea
 value={data.address}
 onChange={e => setData("address", e.target.value)}
 rows="3"
 className="w-full rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white p-4 transition-all font-bold text-sm focus:outline-none focus:ring-2 focus:ring-red-100"
 />
 </div>

 <Button type="submit"disabled={processing} className="w-full h-16 rounded-xl bg-red-600 hover:bg-red-700 text-lg font-black transition-all shadow-lg shadow-red-900/20 active:scale-[0.98]">
 Update Member Profile
 </Button>
 </form>
 </motion.div>
 </div>
 );
}
