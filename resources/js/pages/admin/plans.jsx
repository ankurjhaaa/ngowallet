import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";

export default function plans() {

    const [plans, setPlans] = useState([
        { id: 1, name: "Silver Plan", amount: 12000, duration: "Yearly", status: "Active" },
        { id: 2, name: "Gold Plan", amount: 25000, duration: "Yearly", status: "Active" },
        { id: 3, name: "Platinum Plan", amount: 50000, duration: "Yearly", status: "Inactive" },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);

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

    return (
        <AdminLayout>

            {/* ================= HEADER ================= */}
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Plans
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage yearly donation plans
                    </p>
                </div>

                <button
                    onClick={openAdd}
                    className="bg-red-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-red-700"
                >
                    + Add Plan
                </button>
            </div>

            {/* ================= PLANS LIST ================= */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-6 py-4 text-left">Plan Name</th>
                            <th className="px-6 py-4 text-left">Amount (₹)</th>
                            <th className="px-6 py-4 text-left">Duration</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.map(plan => (
                            <tr key={plan.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {plan.name}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    ₹{plan.amount.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {plan.duration}
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={plan.status} />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => openEdit(plan)}
                                        className="text-red-800 text-sm font-medium hover:underline"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= MOBILE CARDS ================= */}
            <div className="md:hidden space-y-4">
                {plans.map(plan => (
                    <div
                        key={plan.id}
                        className="bg-white rounded-2xl shadow-sm p-5 space-y-3"
                    >
                        <div className="flex justify-between">
                            <h3 className="font-semibold text-gray-900">
                                {plan.name}
                            </h3>
                            <StatusBadge status={plan.status} />
                        </div>

                        <p className="text-sm text-gray-600">
                            ₹{plan.amount.toLocaleString()} • {plan.duration}
                        </p>

                        <button
                            onClick={() => openEdit(plan)}
                            className="text-red-800 text-sm font-medium"
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>

            {/* ================= MODAL ================= */}
            {showForm && (
                <PlanForm
                    plan={editingPlan}
                    onClose={closeForm}
                />
            )}

        </AdminLayout>
    );
}

/* ================= MODAL FORM ================= */

function PlanForm({ plan, onClose }) {
    const [name, setName] = useState(plan?.name || "");
    const [amount, setAmount] = useState(plan?.amount || "");
    const [status, setStatus] = useState(plan?.status || "Active");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    {plan ? "Edit Plan" : "Add New Plan"}
                </h2>

                <div className="space-y-4">
                    <Input label="Plan Name" value={name} onChange={setName} />
                    <Input label="Amount (₹ / Year)" value={amount} onChange={setAmount} />
                    <Select label="Status" value={status} onChange={setStatus} />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-red-800 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>
    );
}

/* ================= SMALL UI ================= */

function Input({ label, value, onChange }) {
    return (
        <div>
            <label className="text-sm text-gray-600">{label}</label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 w-full h-11 rounded-xl bg-gray-50 px-4 text-sm
                           focus:outline-none focus:ring-2 focus:ring-red-200"
            />
        </div>
    );
}

function Select({ label, value, onChange }) {
    return (
        <div>
            <label className="text-sm text-gray-600">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 w-full h-11 rounded-xl bg-gray-50 px-4 text-sm
                           focus:outline-none focus:ring-2 focus:ring-red-200"
            >
                <option>Active</option>
                <option>Inactive</option>
            </select>
        </div>
    );
}

function StatusBadge({ status }) {
    const active = status === "Active";
    return (
        <span className={`px-3 py-1 text-xs rounded-full
            ${active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}
        `}>
            {status}
        </span>
    );
}
