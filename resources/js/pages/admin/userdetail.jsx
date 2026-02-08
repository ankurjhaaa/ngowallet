import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";

export default function UserDetail() {

    /* ================= DATA FROM LARAVEL ================= */
    const {
        user,
        plan,
        payments = [],
        stats = { payingAmount: 0, lifetimePaid: 0 },
        ngo_plans = [],
        due_plan = [],
    } = usePage().props;
    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    /* ================= FALLBACKS ================= */
    const payingAmount = stats.payingAmount ?? 0;
    const lifetimePaid = stats.lifetimePaid ?? 0;
    const [showUserDetails, setShowUserDetails] = useState(false);

    const totalDeu = payingAmount - lifetimePaid;
    const [openPayments, setOpenPayments] = useState({});

    const togglePayments = (planId) => {
        setOpenPayments(prev => ({
            ...prev,
            [planId]: !prev[planId],
        }));
    };


    const [showPlanModal, setShowPlanModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        amount: "",
        plan_id: "",
    });
    const addMoney = (e) => {
        e.preventDefault();
        if (!data.plan_id || !data.amount) return;

        post(`/admin/add-payment/${user.id}`, {
            amount: data.amount,
            plan_id: data.plan_id,
        });
        reset();
    }
    return (
        <AdminLayout>

            {/* ================= USER HEADER ================= */}
            <div className="bg-white rounded-md p-6 mb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            {user.name}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {user.phone ?? "—"}
                            <br />
                            Joined{" "}
                            {new Date(user.created_at).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <StatusBadge status={user.status ?? "active"} />

                        {/* TOGGLE BUTTON */}
                        <button
                            onClick={() => setShowUserDetails(!showUserDetails)}
                            className="text-gray-500 hover:text-gray-700"
                            title="View details"
                        >
                            {showUserDetails ? (
                                <i className="fa-solid fa-chevron-up text-sm"></i>
                            ) : (
                                <i className="fa-solid fa-chevron-down text-sm"></i>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {showUserDetails && (
                <div className="bg-white rounded-md p-6 mb-8 border border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        User Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">

                        <Detail label="Email" value={user.email} />
                        <Detail label="Phone" value={user.phone} />
                        <Detail label="Role" value={user.role} />
                        <Detail label="Status" value={user.status} />
                        <Detail
                            label="Date of Birth"
                            value={
                                user.date_of_birth
                                    ? new Date(user.date_of_birth).toLocaleDateString("en-GB")
                                    : "—"
                            }
                        />
                        <Detail label="Gender" value={user.gender} />
                        <Detail label="Email Verified"
                            value={user.email_verified_at ? "Yes" : "No"}
                        />

                        <div className="sm:col-span-2 lg:col-span-3">
                            <Detail label="Address" value={user.address} />
                        </div>
                    </div>
                </div>
            )}


            {/* ================= YEAR SUMMARY ================= */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <Stat title="Total Due" value={`₹${totalDeu}`} />
                <Stat title="Lifetime Paid" value={`₹${lifetimePaid}`} />
            </div>



            {/* ================= ACTIVE PLAN ================= */}
            <div className="bg-white rounded-md p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">
                        Active Plan
                    </h2>

                    <button
                        onClick={() => setShowPlanModal(true)}
                        className="h-9 px-4 rounded-md bg-red-800 text-white text-sm hover:bg-red-700"
                    >
                        Add Plan
                    </button>
                </div>

                {due_plan && due_plan.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {due_plan.map((plan) => (
                            <div
                                key={plan.id}
                                className="bg-white rounded-md p-4 border border-red-200"
                            >
                                {/* HEADER */}
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                                        {plan.name}
                                    </h3>
                                    <span className="text-[11px] px-2 py-0.5 rounded bg-red-100 text-red-700">
                                        Due
                                    </span>
                                </div>

                                {/* AMOUNTS */}
                                <div className="grid grid-cols-2 gap-3 mb-2">
                                    <div>
                                        <p className="text-[11px] text-gray-500">
                                            Yearly
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            ₹{plan.yearly_amount}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-base font-bold text-red-800">
                                            ₹{plan.due_amount}
                                        </p>
                                        <p className="text-[11px] text-gray-500">
                                            Pending
                                        </p>
                                    </div>
                                </div>

                                {/* DATE RANGE */}
                                <p className="text-[12px] text-gray-500">
                                    {formatDate(plan.start_date)} – {formatDate(plan.end_date)}
                                </p>
                                <div className="bg-white rounded-md mt-2">

                                    <div className="w-full bg-gray-200 h-1 rounded-full">
                                        <div
                                            className="bg-red-800 h-1 rounded-full"
                                            style={{ width: `${plan.percentage_paid}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        {plan.percentage_paid}% completed
                                    </p>
                                </div>
                                <div className="mt-3">
                                    <button
                                        type="button"
                                        onClick={() => togglePayments(plan.id)}
                                        className="text-xs text-red-800 font-medium hover:underline "
                                    >
                                        {openPayments[plan.id] ? "Hide payments" : "View payments"}
                                    </button>

                                    {openPayments[plan.id] && (
                                        <div className="mt-2 bg-gray-50 rounded-md p-3 ">
                                            <h4 className="text-xs font-semibold text-gray-900 mb-2">
                                                Payment History
                                            </h4>

                                            {plan.payments && plan.payments.length > 0 ? (
                                                <ul className="text-xs text-gray-600 space-y-1">
                                                    {plan.payments.map((payment, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex justify-between"
                                                        >
                                                            <span>
                                                                ₹{payment.amount} via {payment.payment_mode}
                                                            </span>
                                                            <span className="text-gray-500">
                                                                {formatDate(payment.payment_date)}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-xs text-gray-500">
                                                    No payments recorded
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">
                        No active due plan for this user
                    </p>
                )}

            </div>

            {showPlanModal && (
                <PlanModal onClose={() => setShowPlanModal(false)} plans={ngo_plans} user_id={user.id} />
            )}

            {/* ================= ADMIN ADD PAYMENT (DESIGN ONLY) ================= */}
            <div className="bg-white rounded-md p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4 text-red-800">
                    Add Payment (Admin)
                </h2>

                <form action="" onSubmit={addMoney}>
                    <div className="grid md:grid-cols-4 gap-4">

                        <select
                            value={data.plan_id}
                            onChange={(e) => setData("plan_id", e.target.value)}
                            className="h-11 rounded-md bg-gray-50 px-4 text-sm
               focus:outline-none focus:ring-2 focus:ring-red-200 border border-red-200"
                        >
                            {due_plan && due_plan.length > 0 ? (
                                <>
                                    <option value="">Select Due Plan</option>
                                    {due_plan.map((plan) => (
                                        <option key={plan.id} value={plan.id}>
                                            {plan.name} {plan.due_amount > 0 ? `- ₹${plan.due_amount} pending` : "- No Due"}
                                        </option>
                                    ))}
                                </>
                            ) : (
                                <option value="">No Due Plans</option>
                            )}

                        </select>
                        <input
                            value={data.amount}
                            onChange={(e) => setData("amount", e.target.value)}
                            disabled={!data.plan_id}
                            placeholder="Amount (₹)"
                            type="number"
                            className={`h-11 rounded-md bg-gray-50 px-4 text-sm focus:ring-2 focus:ring-red-200 border border-red-200`}
                        />

                        <button
                            disabled={!data.plan_id || !data.amount}
                            className="md:col-span-2 h-11 bg-red-800 text-white rounded-md text-sm cursor-pointer hover:bg-red-900 disabled:bg-gray-300 disabled:text-gray-600"
                        >
                            Add Payment
                        </button>
                    </div>

                </form>

            </div>
        </AdminLayout>
    );
}

/* ================= SMALL COMPONENTS ================= */

function Stat({ title, value }) {
    return (
        <div className="bg-white rounded-md p-5">
            <p className="text-xs text-gray-500">{title}</p>
            <p className="text-lg font-semibold mt-1 text-gray-900">{value}</p>
        </div>
    );
}

function Info({ label, value }) {
    return (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-medium mt-1">{value}</p>
        </div>
    );
}

function StatusBadge({ status }) {
    return (
        <span className="px-3 py-1 text-xs rounded-md bg-green-100 text-green-700">
            {status}
        </span>
    );
}

function PlanModal({ onClose, plans, user_id }) {

    const { data, setData, post, processing, errors } = useForm({
        plan_id: "",
    });

    const currentPlan = plans.find(p => p.id == data.plan_id);

    const submit = (e) => {
        e.preventDefault();

        post(`/admin/assign-plan/${data.plan_id}/${user_id}`);
        reset();

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
