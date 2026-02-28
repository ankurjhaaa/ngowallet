import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { useForm, usePage, router } from "@inertiajs/react";

export default function Plans() {

    const { plans } = usePage().props;
    const [showForm, setShowForm] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const openAdd = () => {
        setEditingPlan(null);
        setShowForm(true);
    };

    const openEdit = (plan) => {
        setEditingPlan(plan);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingPlan(null);
    };

    const confirmDelete = (id) => {
        router.delete(`/admin/plans/${id}`, {
            onSuccess: () => setDeletingId(null),
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-full overflow-hidden px-1 min-w-0">
                {/* ================= HEADER ================= */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 leading-tight">Plans Management</h1>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Configure and manage yearly commitment plans</p>
                    </div>

                    <button
                        onClick={openAdd}
                        className="h-10 px-5 rounded-lg bg-red-800 text-white text-xs font-bold hover:bg-red-700 transition shadow-lg shadow-red-900/10 flex items-center justify-center gap-2"
                    >
                        <i className="fas fa-plus-circle"></i>
                        New Plan
                    </button>
                </div>

                {/* ================= DESKTOP TABLE ================= */}
                <div className="hidden md:block bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Plan Details</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-center">Commitment (₹)</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-center">Duration</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {plans.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-16 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-3">
                                                <i className="fas fa-folder-open text-xl"></i>
                                            </div>
                                            <p className="text-sm font-medium text-gray-400">No active plans found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                plans.map(plan => (
                                    <tr key={plan.id} className="group hover:bg-red-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-800 flex items-center justify-center text-xs">
                                                    <i className="fas fa-gem"></i>
                                                </div>
                                                <span className="text-sm font-bold text-gray-900 group-hover:text-red-800 transition">
                                                    {plan.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-sm font-black text-gray-900">
                                                ₹{Number(plan.yearly_amount).toLocaleString()}
                                            </span>
                                            <span className="text-[10px] text-gray-400 block font-medium">per year</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-600">
                                                <i className="fas fa-clock text-[8px]"></i>
                                                {plan.duration_years} {plan.duration_years > 1 ? "Years" : "Year"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openEdit(plan)}
                                                    className="h-8 w-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-red-800 hover:bg-red-800 hover:text-white transition shadow-sm"
                                                    title="Edit Plan"
                                                >
                                                    <i className="fas fa-edit text-xs"></i>
                                                </button>
                                                {/* <button
                                                    onClick={() => setDeletingId(plan.id)}
                                                    className="h-8 w-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition shadow-sm"
                                                    title="Delete Plan"
                                                >
                                                    <i className="fas fa-trash-alt text-xs"></i>
                                                </button> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ================= MOBILE CARDS ================= */}
                <div className="md:hidden space-y-3">
                    {plans.length === 0 ? (
                        <div className="bg-white rounded-lg p-12 border border-dashed border-gray-200 text-center">
                            <i className="fas fa-folder-open text-3xl text-gray-200 mb-3 block"></i>
                            <p className="text-xs font-bold text-gray-400">No active plans</p>
                        </div>
                    ) : (
                        plans.map(plan => (
                            <div
                                key={plan.id}
                                className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm relative overflow-hidden group active:bg-red-50/50 transition"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-red-100 text-red-800 flex items-center justify-center">
                                            <i className="fas fa-gem text-base"></i>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-gray-900 leading-tight">{plan.name}</h3>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Yearly Plan</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => openEdit(plan)}
                                        className="h-8 px-3 rounded-lg bg-gray-50 text-red-800 text-[10px] font-bold hover:bg-red-100 transition flex items-center gap-1.5"
                                    >
                                        <i className="fas fa-edit"></i>
                                        Edit
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-3 mt-1">
                                    <div>
                                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Commitment</p>
                                        <p className="text-base font-black text-gray-900">₹{Number(plan.yearly_amount).toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Duration</p>
                                        <div className="inline-flex items-center gap-1 text-sm font-black text-gray-900">
                                            {plan.duration_years}
                                            <span className="text-[10px] text-gray-400 font-medium">Years</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* ================= PLAN FORM MODAL ================= */}
                {showForm && (
                    <PlanForm
                        plan={editingPlan}
                        onClose={closeForm}
                    />
                )}

                {/* ================= DELETE CONFIRM MODAL ================= */}
                {deletingId && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setDeletingId(null)}></div>
                        <div className="bg-white w-full max-w-sm rounded-lg shadow-2xl p-6 text-center relative z-10 animate-in fade-in zoom-in-95 duration-200">
                            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-600 mx-auto mb-4">
                                <i className="fas fa-trash-alt text-xl"></i>
                            </div>
                            <h3 className="text-lg font-black text-gray-900 mb-2">Delete this plan?</h3>
                            <p className="text-xs font-medium text-gray-500 leading-relaxed mb-6">
                                If this plan is assigned to any user, it cannot be deleted. Are you sure you want to proceed?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeletingId(null)}
                                    className="flex-1 h-11 rounded-lg bg-gray-100 text-xs font-bold text-gray-600 hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => confirmDelete(deletingId)}
                                    className="flex-1 h-11 rounded-lg bg-red-800 text-white text-xs font-bold hover:bg-red-900 transition shadow-lg shadow-red-900/20"
                                >
                                    Delete Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

/* ================= MODAL FORM ================= */

function PlanForm({ plan, onClose }) {

    const { data, setData, post, put, processing, errors } = useForm({
        name: plan?.name || "",
        yearly_amount: plan?.yearly_amount || "",
        duration_years: plan?.duration_years || 1,
    });

    const submit = (e) => {
        e.preventDefault();
        if (plan) {
            put(`/admin/plans/${plan.id}`, { onSuccess: () => onClose() });
        } else {
            post("/admin/plans", { onSuccess: () => onClose() });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-md rounded-lg shadow-2xl p-6 relative z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-black text-gray-900">
                            {plan ? "Update Plan" : "Create New Plan"}
                        </h2>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                            {plan ? "Modify existing configuration" : "Define a new commitment tier"}
                        </p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition">
                        <i className="fas fa-times text-xs"></i>
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-5 overflow-y-auto pr-1 flex-1">
                    {/* NAME */}
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1 flex items-center gap-2">
                            <i className="fas fa-tag text-red-800 text-[10px]"></i>
                            Plan Title
                        </label>
                        <input
                            autoFocus
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="e.g. Premium Membership"
                            className="w-full h-11 rounded-lg bg-gray-50 border border-gray-100 px-4 text-xs font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-red-100 focus:border-red-800 transition"
                        />
                        {errors.name && <p className="text-[10px] font-medium text-red-700 mt-1.5 ml-1">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                        {/* AMOUNT */}
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1 flex items-center gap-2">
                                <i className="fas fa-rupee-sign text-red-800 text-[10px]"></i>
                                Yearly Fee
                            </label>
                            <input
                                type="number"
                                value={data.yearly_amount}
                                onChange={(e) => setData("yearly_amount", e.target.value)}
                                placeholder="0.00"
                                className="w-full h-11 rounded-xl bg-gray-50 border border-gray-100 px-4 text-xs font-black text-gray-900 focus:bg-white focus:ring-2 focus:ring-red-100 focus:border-red-800 transition"
                            />
                            {errors.yearly_amount && <p className="text-[10px] font-medium text-red-700 mt-1.5 ml-1">{errors.yearly_amount}</p>}
                        </div>

                        {/* DURATION */}
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1 flex items-center gap-2">
                                <i className="fas fa-hourglass-half text-red-800 text-[10px]"></i>
                                Duration
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    min="1"
                                    value={data.duration_years}
                                    onChange={(e) => setData("duration_years", e.target.value)}
                                    className="w-full h-11 rounded-xl bg-gray-50 border border-gray-100 px-4 text-xs font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-red-100 focus:border-red-800 transition pr-12"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 uppercase pointer-events-none">Years</span>
                            </div>
                            {errors.duration_years && <p className="text-[10px] font-medium text-red-700 mt-1.5 ml-1">{errors.duration_years}</p>}
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-3 pt-4 border-t border-gray-50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-11 rounded-xl bg-gray-50 text-xs font-bold text-gray-500 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-2 h-11 px-8 rounded-xl bg-red-800 text-white text-xs font-extrabold hover:bg-red-900 transition disabled:opacity-60 shadow-lg shadow-red-900/20"
                        >
                            {processing ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-check-circle mr-2"></i>}
                            {plan ? "Update Configuration" : "Deploy New Plan"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
