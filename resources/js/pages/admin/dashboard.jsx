import AdminLayout from"@/layouts/AdminLayout";
import { useState } from"react";
import { Link, usePage, router } from"@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Badge } from"@/components/ui/badge";
import { 
 HandHeart, Wallet, PiggyBank, Users, 
 ArrowUpRight, ArrowDownRight, Activity as ActivityIcon, 
 PlusCircle, FileText, Search, X, ChevronRight, TrendingUp, ClipboardList, Settings
} from"lucide-react";
import { cn } from"@/lib/utils";
import { motion } from"framer-motion";

const fadeInUp = {
 initial: { opacity: 0, y: 15 },
 animate: { opacity: 1, y: 0 },
 transition: { duration: 0.4 }
};

export default function Dashboard() {
 const {
 totalCommitment,
 fund_raised,
 totalBalance,
 totalDoner,
 recentPayments = [],
 recentExpenses = [],
 allUsers = {},
 filters = {}
 } = usePage().props;

 const [openPaymentModal, setOpenPaymentModal] = useState(false);
 const [search, setSearch] = useState(filters.search ||"");

 return (
 <AdminLayout title="Dashboard Overview">
 <div className="pb-20">
 {/* Page Header */}
 <div className="flex flex-row items-center justify-end gap-3 mb-4 mt-2">
 <Button asChild variant="outline"size="sm"className="rounded-md border-slate-200 transition-all hover:bg-slate-100">
 <Link href="/admin/reports">
 <FileText className="h-4 w-4 mr-2"/>
 View Analytics
 </Link>
 </Button>
 <Button size="sm"className="rounded-md bg-red-600 hover:bg-red-700 transition-all active:scale-95 px-5"onClick={() => setOpenPaymentModal(true)}>
 <PlusCircle className="h-4 w-4 mr-2"/>
 Quick Payment
 </Button>
 </div>

 {/* Core Stats */}
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
 <StatCard 
 title="Total Commitment"
 value={`₹${totalCommitment?.toLocaleString()}`} 
 icon={<HandHeart className="h-5 w-5"/>} 
 description="Total pledged amount"
 color="bg-red-50 text-red-700"
 trend="+12% from last month"
 />
 <StatCard 
 title="Amount Received"
 value={`₹${fund_raised?.toLocaleString()}`} 
 icon={<Wallet className="h-5 w-5"/>} 
 description="Successfully collected"
 color="bg-emerald-50 text-emerald-700"
 trend="+8% collections up"
 />
 <StatCard 
 title="Remaining Balance"
 value={`₹${totalBalance?.toLocaleString()}`} 
 icon={<PiggyBank className="h-5 w-5"/>} 
 description="Pending collection"
 color="bg-blue-50 text-blue-700"
 trend="Needs attention"
 />
 <StatCard 
 title="Active Supporters"
 value={totalDoner} 
 icon={<Users className="h-5 w-5"/>} 
 description="Total registered donors"
 color="bg-purple-50 text-purple-700"
 trend="Active this week"
 />
 </div>

 {/* Middle Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-3 items-start">
 {/* Recent Payments */}
 <Card className="lg:col-span-1 border-slate-100 rounded-md overflow-hidden hover: transition-all h-full">
 <CardHeader className="flex flex-row items-center justify-between px-4 py-4 border-b border-slate-50">
 <div>
 <CardTitle className="text-lg font-bold">Recent Payments</CardTitle>
 <CardDescription className="text-xs">Latest 5 contributions</CardDescription>
 </div>
 <Link href="/admin/transactions"className="text-xs text-red-600 hover:underline font-bold uppercase tracking-widest">
 See All
 </Link>
 </CardHeader>
 <CardContent className="px-3 py-3 space-y-2">
 {recentPayments.map((p, i) => (
 <ActivityItem 
 key={i} 
 title={p.user.name} 
 amount={p.amount} 
 date={p.payment_date} 
 type="payment"
 />
 ))}
 {recentPayments.length === 0 && <EmptyState text="No recent payments"/>}
 </CardContent>
 </Card>

 {/* Recent Expenses */}
 <Card className="lg:col-span-1 border-slate-100 rounded-md overflow-hidden hover: transition-all h-full">
 <CardHeader className="flex flex-row items-center justify-between px-4 py-4 border-b border-slate-50">
 <div>
 <CardTitle className="text-lg font-bold">Recent Expenses</CardTitle>
 <CardDescription className="text-xs">Operational outgoing funds</CardDescription>
 </div>
 <Link href="/admin/expense"className="text-xs text-blue-600 hover:underline font-bold uppercase tracking-widest">
 Details
 </Link>
 </CardHeader>
 <CardContent className="px-3 py-3 space-y-2">
 {recentExpenses.map((e, i) => (
 <ActivityItem 
 key={i} 
 title={e.description} 
 amount={e.amount} 
 date={e.date} 
 type="expense"
 />
 ))}
 {recentExpenses.length === 0 && <EmptyState text="No recent expenses"/>}
 </CardContent>
 </Card>

 {/* Quick Actions & Insights */}
 <div className="lg:col-span-1 space-y-8">
 <Card className="border-none bg-slate-900 text-white rounded-md p-4 transform rotate-1 overflow-hidden group">
 <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-md blur-3xl opacity-20 -z-0"></div>
 <div className="relative z-10">
 <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
 <TrendingUp className="h-5 w-5 text-red-400"/>
 Action Center
 </h3>
 <div className="space-y-3">
 <ActionLink href="/admin/add-member-page"label="Onboard Member"icon={<Users className="h-4 w-4"/>} color="bg-red-500/20 text-red-300"/>
 <ActionLink href="/admin/plans"label="Manage Plans"icon={<ClipboardList className="h-4 w-4"/>} color="bg-blue-500/20 text-blue-300"/>
 <ActionLink href="/admin/settings"label="System Settings"icon={<Settings className="h-4 w-4"/>} color="bg-purple-500/20 text-purple-300"/>
 </div>
 </div>
 </Card>

 <Card className="border-slate-100 rounded-md p-4 bg-white">
 <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-1">Growth Index</h4>
 <div className="space-y-5">
 <GrowthIndicator label="Fund Recovery"percent={75} color="bg-emerald-500"/>
 <GrowthIndicator label="Target Completion"percent={45} color="bg-red-500"/>
 </div>
 </Card>
 </div>
 </div>
 </div>
 {/* Payment Modal */}
 {openPaymentModal && (
 <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
 <motion.div 
 initial={{ opacity: 0 }} 
 animate={{ opacity: 1 }} 
 className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
 onClick={() => setOpenPaymentModal(false)}
 />
 <motion.div 
 initial={{ opacity: 0, scale: 0.95, y: 10 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 className="relative bg-white w-full max-w-xl rounded-md p-4 overflow-hidden flex flex-col max-h-[90vh]"
 >
 <div className="flex justify-between items-center mb-5">
 <div>
 <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Add Payment</h2>
 <p className="text-xs text-slate-500">Pick a member to record an amount</p>
 </div>
 <Button variant="ghost"size="icon"className="rounded-md h-10 w-10 hover:bg-slate-100"onClick={() => setOpenPaymentModal(false)}>
 <X className="h-5 w-5"/>
 </Button>
 </div>

 <div className="relative mb-4">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"/>
 <input 
 type="text"
 placeholder="Search by name or phone..."
 value={search}
 onChange={(e) => {
 const val = e.target.value;
 setSearch(val);
 router.get("/admin/dashboard", { search: val }, { preserveState: true, replace: true });
 }}
 className="w-full h-14 pl-12 pr-6 bg-slate-50 border-none rounded-md focus:ring-2 focus:ring-red-100 transition-all text-sm"
 />
 </div>

 <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
 {allUsers?.data?.map(user => (
 <Link 
 key={user.id} 
 href={`/admin/userdetail/${user.id}`}
 className="group flex items-center justify-between p-4 rounded-md border border-slate-50 hover:bg-slate-50 transition-all"
 >
 <div className="flex items-center gap-4">
 <div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-600 font-bold group-hover:bg-red-500 group-hover:text-white transition-colors">
 {user.name.charAt(0)}
 </div>
 <div>
 <p className="text-sm font-bold text-slate-800 tracking-tight leading-none mb-1">{user.name}</p>
 <p className="text-[10px] text-slate-500 font-medium">{user.phone || user.email}</p>
 </div>
 </div>
 <div className="h-8 w-8 rounded-md bg-white flex items-center justify-center text-slate-400 group-hover:bg-red-500 group-hover:text-white transition-all transform translate-x-1 group-hover:translate-x-0">
 <ChevronRight className="h-4 w-4"/>
 </div>
 </Link>
 ))}
 {allUsers?.data?.length === 0 && (
 <div className="text-center py-4 opacity-40 italic text-sm">No members matching search</div>
 )}
 </div>

 {allUsers?.links?.length > 3 && (
 <div className="mt-5 pt-6 border-t border-slate-50 flex justify-center gap-1">
 {allUsers.links.filter(l => l.url).map((l, i) => (
 <Link 
 key={i} 
 href={l.url} 
 className={cn(
"w-8 h-8 flex items-center justify-center rounded-md text-xs font-bold transition-all",
 l.active ?"bg-red-600 text-white":"bg-slate-100 text-slate-500 hover:bg-slate-200"
 )}
 dangerouslySetInnerHTML={{ __html: l.label }}
 />
 ))}
 </div>
 )}
 </motion.div>
 </div>
 )}
 </AdminLayout>
 );
}

function StatCard({ title, value, icon, description, color, trend }) {
 return (
 <motion.div {...fadeInUp} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
 <Card className="h-full border-slate-100 rounded-md overflow-hidden hover: transition-all group p-3">
 <div className="flex justify-between items-start mb-2">
 <div className={cn("p-2 rounded-md transform transition-transform group-hover:rotate-6", color)}>
 {icon}
 </div>
 </div>
 <div>
 <h3 className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 mb-1 leading-tight">{title}</h3>
 <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">{value}</div>
 <p className="text-[9px] text-slate-400 font-medium mb-2 leading-tight hidden sm:block">{description}</p>
 <div className="flex items-center gap-1.5 pt-2 border-t border-slate-50">
 <ArrowUpRight className="h-3 w-3 text-emerald-500"/>
 <span className="text-[10px] font-bold text-slate-500">{trend}</span>
 </div>
 </div>
 </Card>
 </motion.div>
 );
}

function ActivityItem({ title, amount, date, type }) {
 return (
 <div className="flex items-center justify-between p-2 rounded-md bg-slate-50/50 border border-slate-50 group hover:bg-white transition-all">
 <div className="flex items-center gap-3 min-w-0">
 <div className={cn("h-8 w-8 flex items-center justify-center rounded-md", type ==="payment"?"bg-emerald-50 text-emerald-600":"bg-red-50 text-red-600")}>
 {type ==="payment"? <ArrowUpRight className="h-5 w-5"/> : <ArrowDownRight className="h-5 w-5"/>}
 </div>
 <div className="min-w-0">
 <p className="text-xs font-bold text-slate-900 truncate tracking-tight">{title}</p>
 <p className="text-[10px] text-slate-400 font-medium">{date}</p>
 </div>
 </div>
 <div className={cn("text-base font-black tracking-tighter whitespace-nowrap", type ==="payment"?"text-emerald-700":"text-red-700")}>
 {type ==="payment"?"+":"-"} ₹{amount}
 </div>
 </div>
 );
}

function ActionLink({ href, label, icon, color }) {
 return (
 <Link href={href} className="group flex items-center gap-3 p-2 rounded-md hover:bg-white/10 transition-all">
 <div className={cn("w-8 h-8 flex items-center justify-center rounded-md transform group-hover:scale-110 group-hover:-rotate-3 transition-transform", color)}>
 {icon}
 </div>
 <span className="text-sm font-semibold tracking-wide flex-1">{label}</span>
 <ChevronRight className="h-4 w-4 opacity-30 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all"/>
 </Link>
 );
}

function GrowthIndicator({ label, percent, color }) {
 return (
 <div className="space-y-2">
 <div className="flex justify-between items-end">
 <span className="text-xs font-bold text-slate-600">{label}</span>
 <span className="text-xs font-black text-slate-400">{percent}%</span>
 </div>
 <div className="h-2 w-full bg-slate-100 rounded-md overflow-hidden">
 <motion.div 
 initial={{ width: 0 }} 
 whileInView={{ width:`${percent}%` }} 
 transition={{ duration: 1, ease:"easeOut"}}
 className={cn("h-full rounded-md", color)} 
 />
 </div>
 </div>
 );
}

function EmptyState({ text }) {
 return <div className="text-center py-4 opacity-40 text-xs italic">{text}</div>;
}
