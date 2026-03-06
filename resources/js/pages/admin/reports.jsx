import AdminLayout from"@/layouts/AdminLayout";
import { usePage, router } from"@inertiajs/react";
import { useMemo, useState } from"react";
import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 BarElement,
 Tooltip,
 Legend,
} from"chart.js";
import { Line, Bar } from"react-chartjs-2";

ChartJS.register(
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 BarElement,
 Tooltip,
 Legend
);

export default function Reports() {
 const {
 filters,
 plans = [],
 payment_modes = [],
 charts,
 plan_breakdown,
 monthly_totals,
 top_donors,
 kpis,
 } = usePage().props;

 const [form, setForm] = useState({
 from: filters?.from ||"",
 to: filters?.to ||"",
 role: filters?.role ||"all",
 plan_id: filters?.plan_id ||"all",
 payment_mode: filters?.payment_mode ||"all",
 });
 const [showFilters, setShowFilters] = useState(false);

 const applyFilters = (e) => {
 e.preventDefault();
 router.get("/admin/reports", form, { preserveState: true, replace: true });
 setShowFilters(false);
 };

 const resetFilters = () => {
 router.get("/admin/reports", {}, { preserveState: false, replace: true });
 setShowFilters(false);
 };

 const lineData = useMemo(() => {
 return {
 labels: charts?.labels || [],
 datasets: [
 {
 label:"Collections",
 data: charts?.collections || [],
 borderColor:"#b91c1c",
 backgroundColor:"rgba(185, 28, 28, 0.15)",
 tension: 0.35,
 },
 {
 label:"Expenses",
 data: charts?.expenses || [],
 borderColor:"#0f766e",
 backgroundColor:"rgba(15, 118, 110, 0.12)",
 tension: 0.35,
 },
 ],
 };
 }, [charts]);

 const planBarData = useMemo(() => {
 return {
 labels: plan_breakdown?.labels || [],
 datasets: [
 {
 label:"Plan-wise Collection",
 data: plan_breakdown?.values || [],
 backgroundColor:"rgba(15, 118, 110, 0.7)",
 },
 ],
 };
 }, [plan_breakdown]);

 const monthlyBarData = useMemo(() => {
 return {
 labels: monthly_totals?.labels || [],
 datasets: [
 {
 label:"Monthly Collections",
 data: monthly_totals?.values || [],
 backgroundColor:"rgba(185, 28, 28, 0.7)",
 },
 ],
 };
 }, [monthly_totals]);

 const chartOptions = {
 responsive: true,
 maintainAspectRatio: false,
 plugins: {
 legend: { display: true, position:"top"},
 },
 scales: {
 y: { beginAtZero: true },
 },
 };

 return (
 <AdminLayout>
 <div className="mb-4">
 <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
 <p className="text-xs sm:text-sm text-gray-500 mt-1">
 Dynamic reports with filters and real-time totals.
 </p>
 </div>

 {/* FILTERS */}
 <div className="mb-4">
 <div className="sm:hidden flex items-center justify-between mb-3">
 <p className="text-sm font-semibold text-gray-900">Filters</p>
 <button
 type="button"
 onClick={() => setShowFilters(!showFilters)}
 className="h-9 px-4 rounded-md bg-red-800 text-white text-xs font-semibold cursor-pointer"
 >
 {showFilters ?"Hide Filters":"Show Filters"}
 </button>
 </div>

 <form
 onSubmit={applyFilters}
 className={`bg-white rounded-md p-4 sm:p-3 ${showFilters ?"block":"hidden sm:block"}`}
 >
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
 <div className="rounded-md p-3">
 <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-widest">From</label>
 <input
 type="date"
 value={form.from}
 onChange={(e) => setForm({ ...form, from: e.target.value })}
 className="w-full h-10 px-3 rounded-md border border-gray-200 text-sm bg-white"
 />
 </div>
 <div className="rounded-md p-3">
 <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-widest">To</label>
 <input
 type="date"
 value={form.to}
 onChange={(e) => setForm({ ...form, to: e.target.value })}
 className="w-full h-10 px-3 rounded-md border border-gray-200 text-sm bg-white"
 />
 </div>
 <div className="rounded-md p-3">
 <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-widest">Role</label>
 <select
 value={form.role}
 onChange={(e) => setForm({ ...form, role: e.target.value })}
 className="w-full h-10 px-3 rounded-md border border-gray-200 text-sm bg-white"
 >
 <option value="all">All</option>
 <option value="user">User</option>
 <option value="member">Member</option>
 <option value="admin">Admin</option>
 </select>
 </div>
 <div className="rounded-md p-3">
 <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-widest">Plan</label>
 <select
 value={form.plan_id}
 onChange={(e) => setForm({ ...form, plan_id: e.target.value })}
 className="w-full h-10 px-3 rounded-md border border-gray-200 text-sm bg-white"
 >
 <option value="all">All Plans</option>
 {plans.map((plan) => (
 <option key={plan.id} value={plan.id}>
 {plan.name}
 </option>
 ))}
 </select>
 </div>
 <div className="rounded-md p-3">
 <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-widest">Payment Mode</label>
 <select
 value={form.payment_mode}
 onChange={(e) => setForm({ ...form, payment_mode: e.target.value })}
 className="w-full h-10 px-3 rounded-md border border-gray-200 text-sm bg-white"
 >
 <option value="all">All</option>
 {payment_modes.map((mode) => (
 <option key={mode} value={mode}>
 {mode}
 </option>
 ))}
 </select>
 </div>
 </div>

 <div className="mt-4 flex flex-col sm:flex-row gap-3">
 <button
 type="submit"
 className="h-11 px-5 rounded-md bg-red-800 text-white text-sm font-semibold hover:bg-red-900 cursor-pointer"
 >
 Apply Filters
 </button>
 <button
 type="button"
 onClick={resetFilters}
 className="h-11 px-5 rounded-md border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
 >
 Reset
 </button>
 </div>
 </form>
 </div>

 {/* KPI CARDS */}
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
 <KpiCard label="Total Collection"value={`₹ ${kpis?.total_collection || 0}`} icon="fa-wallet"/>
 <KpiCard label="Total Expense"value={`₹ ${kpis?.total_expense || 0}`} icon="fa-receipt"/>
 <KpiCard label="Net Balance"value={`₹ ${kpis?.net_balance || 0}`} icon="fa-scale-balanced"/>
 <KpiCard label="Active Donors"value={kpis?.donor_count || 0} icon="fa-user-group"/>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
 <div className="lg:col-span-2 bg-white rounded-md p-3">
 <h2 className="text-sm font-semibold text-gray-900 mb-3">Collections vs Expenses</h2>
 <div className="h-[280px]">
 {lineData.labels.length === 0 ? (
 <EmptyChart />
 ) : (
 <Line data={lineData} options={chartOptions} />
 )}
 </div>
 </div>

 <div className="bg-white rounded-md p-3">
 <h2 className="text-sm font-semibold text-gray-900 mb-3">Top Donors</h2>
 {top_donors?.length ? (
 <div className="space-y-3">
 {top_donors.map((d, i) => (
 <div key={i} className="flex items-center justify-between bg-gray-50 rounded-md px-3 py-2">
 <div>
 <p className="text-sm font-medium text-gray-900">{d.name}</p>
 <p className="text-xs text-gray-500">{d.count} payments</p>
 </div>
 <span className="text-sm font-semibold text-emerald-700">₹ {d.total}</span>
 </div>
 ))}
 </div>
 ) : (
 <p className="text-sm text-gray-500">No donors found.</p>
 )}
 </div>

 <div className="bg-white rounded-md p-3">
 <h2 className="text-sm font-semibold text-gray-900 mb-3">Plan-wise Collection</h2>
 <div className="h-[240px]">
 {planBarData.labels.length === 0 ? (
 <EmptyChart />
 ) : (
 <Bar data={planBarData} options={chartOptions} />
 )}
 </div>
 </div>

 <div className="bg-white rounded-md p-3 lg:col-span-2">
 <h2 className="text-sm font-semibold text-gray-900 mb-3">Monthly Totals</h2>
 <div className="h-[240px]">
 {monthlyBarData.labels.length === 0 ? (
 <EmptyChart />
 ) : (
 <Bar data={monthlyBarData} options={chartOptions} />
 )}
 </div>
 </div>
 </div>
 </AdminLayout>
 );
}

function KpiCard({ label, value, icon }) {
 return (
 <div className="bg-white rounded-md p-4">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-xs text-gray-500">{label}</p>
 <p className="text-lg font-semibold text-gray-900 mt-1">{value}</p>
 </div>
 <div className="w-9 h-9 rounded-md bg-red-50 text-red-800 flex items-center justify-center">
 <i className={`fas ${icon} text-sm`}></i>
 </div>
 </div>
 </div>
 );
}

function EmptyChart() {
 return (
 <div className="h-full w-full flex items-center justify-center text-sm text-gray-400">
 No data available
 </div>
 );
}
