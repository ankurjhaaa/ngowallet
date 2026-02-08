import PublicLayout from "@/layouts/PublicLayout";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

/* ================= HELPERS ================= */
const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export default function Profile() {

    const { user, userPlans = [] } = usePage().props;

    // active plan index
    const [active, setActive] = useState(0);

    const activePlan = userPlans[active];

    return (
        <PublicLayout>
            <div className=" max-w-4xl mx-auto px-4 py-6">

                {/* ================= HEADER ================= */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-sm text-gray-500">Welcome back,</p>
                        <h1 className="text-xl font-bold text-gray-900">
                            {user.name}
                        </h1>
                    </div>

                    <button
                        className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center"
                        title="Edit Profile"
                    >
                        <i className="fa-solid fa-user-pen text-red-700"></i>
                    </button>
                </div>

                {/* ================= PLAN CARD ================= */}
                {userPlans.length > 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">

                        {/* TITLE + SWITCH */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-sm font-semibold text-gray-900">
                                {activePlan.name}
                            </h2>

                            <div className="flex gap-2">
                                <button
                                    disabled={active === 0}
                                    onClick={() => setActive(active - 1)}
                                    className="h-7 w-7 rounded-full bg-gray-100 disabled:opacity-40"
                                >
                                    ‹
                                </button>
                                <button
                                    disabled={active === userPlans.length - 1}
                                    onClick={() => setActive(active + 1)}
                                    className="h-7 w-7 rounded-full bg-gray-100 disabled:opacity-40"
                                >
                                    ›
                                </button>
                            </div>
                        </div>

                        {/* PROGRESS */}
                        <div className="flex items-center gap-6 mb-5">

                            {/* CIRCLE */}
                            <div className="relative h-24 w-24">
                                <svg viewBox="0 0 36 36" className="h-full w-full">
                                    <path
                                        d="M18 2.0845
                                           a 15.9155 15.9155 0 0 1 0 31.831
                                           a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#e5e7eb"
                                        strokeWidth="4"
                                    />
                                    <path
                                        d="M18 2.0845
                                           a 15.9155 15.9155 0 0 1 0 31.831
                                           a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#16a34a"
                                        strokeWidth="4"
                                        strokeDasharray={`${activePlan.percentage_paid}, 100`}
                                    />
                                </svg>

                                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                                    {activePlan.percentage_paid}%
                                </div>
                            </div>

                            {/* LEGEND */}
                            <div className="text-sm space-y-2">
                                <Legend
                                    color="green"
                                    label="Paid"
                                    value={activePlan.yearly_amount - activePlan.due_amount}
                                />
                                <Legend
                                    color="red"
                                    label="Pending"
                                    value={activePlan.due_amount}
                                />
                            </div>
                        </div>

                        {/* STATS */}
                        <div className="grid grid-cols-3 text-center border-t pt-4 text-sm">
                            <Stat label="Commitment" value={activePlan.yearly_amount} />
                            <Stat
                                label="Paid"
                                value={activePlan.yearly_amount - activePlan.due_amount}
                                color="green"
                            />
                            <Stat
                                label="Pending"
                                value={activePlan.due_amount}
                                color="red"
                            />
                        </div>

                        {/* DATE RANGE */}
                        <p className="text-xs text-gray-500 text-center mt-3">
                            {formatDate(activePlan.start_date)} – {formatDate(activePlan.end_date)}
                        </p>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 mb-6">
                        No active plans assigned
                    </p>
                )}

                {/* ================= CONTRIBUTIONS ================= */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <h3 className="text-sm font-semibold mb-4">
                        Your Contributions
                    </h3>

                    {activePlan && activePlan.payments.length > 0 ? (
                        <div className="space-y-3">
                            {activePlan.payments.map((p, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3"
                                >
                                    <div>
                                        <p className="text-sm text-gray-900">
                                            {formatDate(p.payment_date)}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {p.payment_mode}
                                        </p>
                                    </div>

                                    <span className="text-green-600 font-semibold">
                                        ₹{p.amount}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">
                            No contributions for this plan
                        </p>
                    )}
                </div>

            </div>
        </PublicLayout>
    );
}

/* ================= UI ATOMS ================= */

function Legend({ color, label, value }) {
    return (
        <div className="flex items-center gap-2">
            <span
                className={`h-2 w-2 rounded-full ${
                    color === "green" ? "bg-green-500" : "bg-red-500"
                }`}
            />
            <span className="text-gray-600">
                {label} – ₹{value}
            </span>
        </div>
    );
}

function Stat({ label, value, color }) {
    return (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p
                className={`font-semibold ${
                    color === "green"
                        ? "text-green-600"
                        : color === "red"
                            ? "text-red-600"
                            : "text-gray-900"
                }`}
            >
                ₹{value}
            </p>
        </div>
    );
}
