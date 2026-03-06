import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { useForm, usePage, router } from "@inertiajs/react";

export default function UserDetail() {

    /* ================= DATA FROM LARAVEL ================= */
    const {
        user,
        plan,
        payments = [],
        stats = { payingAmount: 0, lifetimePaid: 0 },
        ngo_plans = [],
        user_plans = [],
        due_plans =[],
    } = usePage().props;

    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    /* ================= STATE ================= */
    const payingAmount = stats.payingAmount ?? 0;
    const lifetimePaid = stats.lifetimePaid ?? 0;
    const [showUserDetails, setShowUserDetails] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [openPayments, setOpenPayments] = useState({});
    const [showPlanModal, setShowPlanModal] = useState(false);

    // Only sum up positive due amounts. Over-payments (negative dues) are ignored.
    const totalDeu = user_plans.reduce((acc, up) => acc + Math.max(0, up.due_amount), 0);

    const togglePayments = (planId) => {
        setOpenPayments(prev => ({
            ...prev,
            [planId]: !prev[planId],
        }));
    };

    const { data, setData, post, processing, reset } = useForm({
        amount: "",
        plan_id: "",
    });

    const addMoney = (e) => {
        e.preventDefault();
        if (!data.plan_id || !data.amount) return;

        post(`/admin/add-payment/${user.id}`, {
            onSuccess: () => reset(),
        });
    }

    return (
        <AdminLayout>
            <div className="w-full min-w-0 overflow-x-hidden px-1">
                {/* ================= BREADCRUMB + HEADER SECTION ================= */}
                <div className="mb-2">
                    <a href="/admin/users" className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-400 hover:text-red-700 transition font-medium">
                        <i className="fas fa-arrow-left text-[8px]"></i>
                        Back to Users
                    </a>
                </div>
                <div className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 leading-tight">User Dashboard</h1>
                        <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5">Profile & commitments for {user.name}{user.nickname ? ` (${user.nickname})` : ''}</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="flex-1 sm:flex-none h-8 sm:h-9 px-3 rounded-lg bg-white border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                        >
                            <i className="fas fa-user-edit text-red-700"></i>
                            Edit
                        </button>
                        <button
                            onClick={() => setShowPasswordModal(true)}
                            className="flex-1 sm:flex-none h-8 sm:h-9 px-3 rounded-lg bg-white border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                        >
                            <i className="fas fa-shield-alt text-amber-600"></i>
                            Security
                        </button>
                    </div>
                </div>

                {/* ================= SUMMARY STATS ================= */}
                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-red-800 rounded-lg p-4 text-white shadow-lg shadow-red-900/10 relative overflow-hidden group">
                        <div className="absolute -right-2 -top-2 w-16 h-16 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                        <p className="text-red-100/70 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase mb-0.5">Lifetime Contribution</p>
                        <h3 className="text-xl sm:text-2xl font-black">₹{lifetimePaid.toLocaleString()}</h3>
                        <div className="mt-2 flex items-center gap-2 text-red-200 text-[9px] font-medium">
                            <span className="w-4 h-4 rounded-full bg-red-700 flex items-center justify-center text-[8px]">
                                <i className="fas fa-check"></i>
                            </span>
                            Verified
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-md relative overflow-hidden group">
                        <div className="absolute -right-2 -top-2 w-16 h-16 bg-gray-50 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                        <p className="text-gray-400 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase mb-0.5">
                            Pending Amount
                        </p>
                        <h3 className={`text-xl sm:text-2xl font-black ${totalDeu > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                            ₹{totalDeu.toLocaleString()}
                        </h3>
                        <div className="mt-2 flex items-center gap-2 text-[9px] font-medium">
                            {totalDeu > 0 ? (
                                <div className="flex items-center gap-2 text-red-400">
                                    <span className="w-4 h-4 rounded-full bg-red-50 flex items-center justify-center text-red-600 text-[8px]">
                                        <i className="fas fa-clock"></i>
                                    </span>
                                    Due
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-emerald-600">
                                    <span className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-[8px]">
                                        <i className="fas fa-check"></i>
                                    </span>
                                    Settled
                                </div>
                            )}
                        </div>
                    </div>


                </div>

                {/* ================= USER PROFILE (COLLAPSIBLE) ================= */}
                <div className="bg-white rounded-lg border border-gray-100 shadow-sm mb-6 overflow-hidden transition-all duration-300">
                    <button
                        onClick={() => setShowUserDetails(!showUserDetails)}
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition group cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-100 text-red-800 flex items-center justify-center font-bold text-xs shrink-0">
                                {user.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <div className="text-left overflow-hidden">
                                <p className="text-xs font-bold text-gray-900 truncate">
                                    {user.name}
                                    {user.nickname && <span className="text-gray-400 font-normal ml-1">({user.nickname})</span>}
                                </p>
                                <p className="text-[10px] text-gray-500 font-medium tracking-tight truncate">{user.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 group-hover:text-red-700 transition shrink-0">
                            <span className="text-[9px] font-bold uppercase tracking-widest hidden xs:inline">
                                {showUserDetails ? 'Hide' : 'More'}
                            </span>
                            <i className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ${showUserDetails ? 'rotate-180' : ''}`}></i>
                        </div>
                    </button>

                    <div className={`transition-all duration-300 ease-in-out ${showUserDetails ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                        <div className="px-4 pb-4 pt-1 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-50 bg-gray-50/20">
                            <Info label="Email" value={user.email} icon="fa-envelope" />
                            <Info label="Nickname" value={user.nickname} icon="fa-id-badge" />
                            <Info label="Role" value={user.role} icon="fa-user-tag" />
                            <Info label="Gender" value={user.gender} icon="fa-venus-mars" />
                            <Info label="DOB" value={user.date_of_birth ? formatDate(user.date_of_birth) : '—'} icon="fa-birthday-cake" />
                            <div className="xs:col-span-2 md:col-span-4">
                                <Info label="Address" value={user.address} icon="fa-map-marker-alt" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= CONTRIBUTION TIMELINE ================= */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2">
                            <i className="fas fa-history text-red-800"></i>
                            Commitment Timeline
                        </h2>
                        <button
                            onClick={() => setShowPlanModal(true)}
                            className="h-7 px-3 rounded-lg bg-red-800 text-white text-[9px] font-bold hover:bg-red-700 transition shadow-md shadow-red-900/20 cursor-pointer"
                        >
                            Add Plan
                        </button>
                    </div>

                    {user_plans && user_plans.length > 0 ? (
                        <div className="relative w-full min-w-0 max-w-full">
                            <div className="w-full max-w-full overflow-x-auto overflow-y-hidden overscroll-x-contain pb-1 [scrollbar-width:none] [-ms-overflow-style:none] touch-pan-x">
                                <div className="grid grid-flow-col auto-cols-[85vw] sm:auto-cols-[300px] gap-3 min-w-max px-1 pb-3 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden">
                                {user_plans.map((up) => (
                                    <div
                                        key={up.id}
                                        className={`w-full max-w-[300px] bg-white rounded-lg p-4 border transition shadow-sm snap-start ${up.status === 'completed' ? 'border-emerald-100' : 'border-red-50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${up.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-700'
                                                    }`}>
                                                    <i className={`fas ${up.status === 'completed' ? 'fa-medal' : 'fa-donate'} text-[10px]`}></i>
                                                </div>
                                                <div className="overflow-hidden">
                                                    <h3 className="text-xs font-bold text-gray-900 truncate">{up.name}</h3>
                                                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter">
                                                        {formatDate(up.start_date)} – {formatDate(up.end_date)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <a
                                                    href={`/admin/userdetail/${user.id}/plan/${up.id}/pdf`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="h-7 w-7 rounded-lg border border-gray-100 bg-white text-red-700 flex items-center justify-center hover:bg-red-50 cursor-pointer"
                                                    title="Download PDF"
                                                >
                                                    <i className="fas fa-file-pdf text-[10px]"></i>
                                                </a>
                                                <StatusBadge status={up.status} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div>
                                                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Committed</p>
                                                <p className="text-xs font-black text-gray-900">₹{up.yearly_amount.toLocaleString()}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Due</p>
                                                <p className={`text-xs font-black ${up.due_amount > 0 ? 'text-red-700' : 'text-emerald-600'}`}>
                                                    ₹{Math.max(0, up.due_amount).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex items-center justify-between text-[9px] font-bold mb-1">
                                                <span className="text-gray-400 uppercase">Progress</span>
                                                <span className="text-gray-900">{up.percentage_paid}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-1000 ${up.status === 'completed' ? 'bg-emerald-500' : 'bg-red-700'
                                                        }`}
                                                    style={{ width: `${up.percentage_paid}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-3 border-t border-gray-50">
                                            <button
                                                onClick={() => togglePayments(up.id)}
                                                className="text-[9px] font-bold text-gray-400 hover:text-red-800 uppercase tracking-widest flex items-center gap-1.5 transition cursor-pointer"
                                            >
                                                <i className={`fas ${openPayments[up.id] ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                {openPayments[up.id] ? "Hide Ledger" : "View Ledger"}
                                            </button>
                                        </div>

                                        {openPayments[up.id] && (
                                            <div className="mt-3 bg-gray-50/50 rounded-lg p-2 border border-gray-100 animate-in fade-in slide-in-from-top-1 duration-200">
                                                {up.payments && up.payments.length > 0 ? (
                                                    <div className="space-y-1.5 max-h-[100px] overflow-y-auto pr-1 text-[9px]">
                                                        {up.payments.map((p, i) => (
                                                            <div key={i} className="flex items-center justify-between gap-2 bg-white px-2 py-1 rounded-md border border-gray-50 shadow-sm">
                                                                <div className="flex items-center gap-1.5 min-w-0">
                                                                    <span className="font-black text-gray-900 shrink-0">₹{p.amount}</span>
                                                                    <span className="text-gray-400 font-medium uppercase truncate">{p.payment_mode}</span>
                                                                </div>
                                                                <span className="text-gray-400 font-medium shrink-0">{formatDate(p.payment_date)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-[9px] text-center py-2 text-gray-400 italic">No payments yet.</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg p-8 border border-dashed border-gray-200 text-center">
                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-3">
                                <i className="fas fa-folder-open text-lg"></i>
                            </div>
                            <h3 className="text-[10px] text-gray-900 font-bold mb-1">No Active Commitments</h3>
                            <p className="text-[9px] text-gray-500">Wait for commitment assignment.</p>
                        </div>
                    )}
                </div>

                {/* ================= RECORD PAYMENT FORM ================= */}
                <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm mb-4">
                    <h2 className="text-xs sm:text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-plus-circle text-red-800"></i>
                        Collect Payment
                    </h2>

                    <form onSubmit={addMoney}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-3">
                            <div className="lg:col-span-4">
                                <label className="block text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Target Plan</label>
                                <select
                                    value={data.plan_id}
                                    onChange={(e) => setData("plan_id", e.target.value)}
                                    className="w-full h-9 rounded-lg bg-gray-50 border border-gray-100 text-[10px] font-semibold focus:ring-red-500 focus:border-red-500 transition"
                                >
                                    <option value="">Select a commitment</option>
                                    {due_plans.map((up) => (
                                        <option key={up.id} value={up.id}>
                                            {up.name} {up.due_amount > 0 ? `(₹${up.due_amount} due)` : `(Fulfilled)`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="lg:col-span-3">
                                <label className="block text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Paid Amount (₹)</label>
                                <input
                                    value={data.amount}
                                    onChange={(e) => setData("amount", e.target.value)}
                                    disabled={!data.plan_id}
                                    placeholder="0.00"
                                    type="number"
                                    className="w-full h-9 rounded-lg bg-gray-50 border border-gray-100 text-[10px] font-black focus:ring-red-500 focus:border-red-500 transition disabled:opacity-50 px-3"
                                />
                            </div>

                            <div className="lg:col-span-3">
                                <label className="hidden sm:block text-[8px] font-bold text-transparent mb-1 opacity-0 pointer-events-none">Submit</label>
                                <button
                                    disabled={!data.plan_id || !data.amount || processing}
                                    className="w-full h-9 bg-red-800 border border-red-800 text-white rounded-lg text-[10px] font-bold hover:bg-red-900 disabled:bg-gray-100 disabled:text-gray-400 transition shadow-lg shadow-red-900/10 cursor-pointer"
                                >
                                    <i className="fas fa-file-invoice-dollar mr-2"></i>
                                    Save Log
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modals remain mostly the same but could use minor styling tweaks to match the new theme */}
            {showPlanModal && <PlanModal onClose={() => setShowPlanModal(false)} plans={ngo_plans} user_id={user.id} />}
            {showEditModal && <EditUserModal user={user} onClose={() => setShowEditModal(false)} />}
            {showPasswordModal && <ChangePasswordModal userId={user.id} onClose={() => setShowPasswordModal(false)} />}

        </AdminLayout>
    );
}

/* ================= REFINED SMALL COMPONENTS ================= */

function Info({ label, value, icon }) {
    return (
        <div className="flex gap-2">
            <div className="w-7 h-7 rounded-lg bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 shrink-0">
                <i className={`fas ${icon} text-[10px]`}></i>
            </div>
            <div>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{label}</p>
                <p className="text-[11px] font-bold text-gray-800 break-all leading-tight">{value ?? "—"}</p>
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    if (status === 'completed') {
        return (
            <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1 shrink-0">
                <span className="w-1 h-1 rounded-full bg-emerald-700 animate-pulse"></span>
                Done
            </span>
        );
    }
    return (
        <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full bg-red-100 text-red-700 flex items-center gap-1 shrink-0">
            <span className="w-1 h-1 rounded-full bg-red-700 animate-pulse"></span>
            Due
        </span>
    );
}

/* ================= MODAL COMPONENTS ================= */

function PlanModal({ onClose, plans, user_id }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        plan_id: "",
    });

    const currentPlan = plans.find(p => p.id == data.plan_id);

    const submit = (e) => {
        e.preventDefault();

        post(`/admin/assign-plan/${data.plan_id}/${user_id}`, {
            onSuccess: () => {
                reset();
                onClose();
            },
        });

    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5">
            <div className="bg-white rounded-md w-full max-w-md p-6">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                        Assign Plan
                    </h3>
                    <button onClick={onClose} className="text-gray-400">✕</button>
                </div>

                <form onSubmit={submit}>

                    {/* PLAN SELECT */}
                    <div className="mb-4">
                        <label className="text-xs text-gray-500">
                            Select Plan
                        </label>
                        <select
                            value={data.plan_id}
                            onChange={(e) => setData('plan_id', e.target.value)}
                            className="w-full h-11 mt-1 rounded-md bg-gray-50 px-4 text-sm"
                        >
                            <option value="">-- Choose Plan --</option>
                            {plans.map(plan => (
                                <option key={plan.id} value={plan.id}>
                                    {plan.name}
                                </option>
                            ))}
                        </select>

                        {errors.plan_id && (
                            <p className="text-xs text-red-600 mt-1">
                                {errors.plan_id}
                            </p>
                        )}
                    </div>

                    {/* AMOUNT PREVIEW */}
                    {currentPlan && (
                        <div className="mb-4 bg-gray-50 rounded-md p-4">
                            <p className="text-xs text-gray-500">
                                Yearly Amount
                            </p>
                            <p className="text-lg font-semibold">
                                ₹{currentPlan.yearly_amount}
                            </p>
                        </div>
                    )}

                    {/* ACTIONS */}
                    <div className="flex gap-3 mt-6">
                        <button type="button" onClick={onClose} className="flex-1 h-11 rounded-md bg-gray-200 text-sm" >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={!data.plan_id || processing}
                            className={`flex-1 h-11 rounded-md text-sm
                            ${data.plan_id ? "bg-red-800 text-white" : "bg-gray-300 text-gray-500"}`} >
                            Generate Plan
                        </button>
                    </div>
                </form>

                <p className="text-xs text-gray-500 mt-3">
                    Plan will be assigned for 1 year from today.
                </p>
            </div>
        </div>
    );
}

function Detail({ label, value }) {
    return (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-medium text-gray-900 mt-1">
                {value ?? "—"}
            </p>
        </div>
    );
}

/* ================= EDIT USER MODAL ================= */

function EditUserModal({ user, onClose }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || "",
        nickname: user.nickname || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "user",
        status: user.status || "active",
        gender: user.gender || "",
        address: user.address || "",
        date_of_birth: user.date_of_birth || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/user/${user.id}`, {
            onSuccess: () => onClose(),
        });
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-md w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">

                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Edit User
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>

                <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* NAME */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData("name", e.target.value)}
                            className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                        />
                        {errors.name && <p className="text-xs text-red-700 mt-1">{errors.name}</p>}
                    </div>

                    {/* NICKNAME */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Nickname</label>
                        <input
                            type="text"
                            value={data.nickname}
                            onChange={e => setData("nickname", e.target.value)}
                            placeholder="Optional"
                            className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                        />
                        {errors.nickname && <p className="text-xs text-red-700 mt-1">{errors.nickname}</p>}
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData("email", e.target.value)}
                            className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                        />
                        {errors.email && <p className="text-xs text-red-700 mt-1">{errors.email}</p>}
                    </div>

                    {/* PHONE */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Phone (10 digits)</label>
                        <input
                            type="tel"
                            value={data.phone}
                            onChange={e => setData("phone", e.target.value.replace(/\D/g, ''))}
                            placeholder="9876543210"
                            maxLength="10"
                            pattern="[6-9][0-9]{9}"
                            className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                        />
                        {errors.phone && <p className="text-xs text-red-700 mt-1">{errors.phone}</p>}
                    </div>

                    {/* ROLE */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Role</label>
                        <select
                            value={data.role}
                            onChange={e => setData("role", e.target.value)}
                            className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="member">Member</option>
                        </select>
                        {errors.role && <p className="text-xs text-red-700 mt-1">{errors.role}</p>}
                    </div>

                    {/* STATUS */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                        <select
                            value={data.status}
                            onChange={e => setData("status", e.target.value)}
                            className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        {errors.status && <p className="text-xs text-red-700 mt-1">{errors.status}</p>}
                    </div>

                    {/* GENDER */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Gender</label>
                        <select
                            value={data.gender}
                            onChange={e => setData("gender", e.target.value)}
                            className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* DATE OF BIRTH */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Date of Birth</label>
                        <input
                            type="date"
                            value={data.date_of_birth}
                            onChange={e => setData("date_of_birth", e.target.value)}
                            className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                        />
                    </div>

                    {/* ADDRESS */}
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Address</label>
                        <textarea
                            rows="2"
                            value={data.address}
                            onChange={e => setData("address", e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-200"
                        />
                    </div>

                    {/* ACTIONS */}
                    <div className="sm:col-span-2 flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 h-10 rounded-md bg-gray-200 text-sm text-gray-700">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 h-10 rounded-md bg-red-800 text-white text-sm disabled:opacity-60"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* ================= CHANGE PASSWORD MODAL ================= */

function ChangePasswordModal({ userId, onClose }) {
    const { data, setData, put, processing, errors } = useForm({
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/user/${userId}/password`, {
            onSuccess: () => onClose(),
        });
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-md w-full max-w-md p-6">

                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Change Password
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>

                <form onSubmit={submit} className="space-y-4">

                    {/* NEW PASSWORD */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">New Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={e => setData("password", e.target.value)}
                            className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                        />
                        {errors.password && <p className="text-xs text-red-700 mt-1">{errors.password}</p>}
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={e => setData("password_confirmation", e.target.value)}
                            className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                        />
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 h-10 rounded-md bg-gray-200 text-sm text-gray-700">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 h-10 rounded-md bg-red-800 text-white text-sm disabled:opacity-60"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
