import AdminLayout from "@/layouts/AdminLayout";
import { Link, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { totalCommitment, fund_raised, totalSpent, totalBalance, totalDoner, recentPayments = [], recentExpenses = [] } = usePage().props;
    return (
        <AdminLayout>

            {/* ================= HEADER ================= */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Dashboard Overview
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Complete snapshot of NGO commitments & activities
                </p>
            </div>

            {/* ================= STATS ================= */}
            <div className="
                grid grid-cols-2
                lg:grid-cols-4
                gap-4 sm:gap-6
            ">
                <StatCard
                    title="Total Commitment"
                    value={`₹ ${totalCommitment}`}
                    icon="fa-hand-holding-heart"
                />
                <StatCard
                    title="Amount Received"
                    value={`₹ ${fund_raised}`}

                    icon="fa-wallet"
                />
                <StatCard
                    title="Remaining Balance"
                    value={`₹ ${totalBalance}`}
                    icon="fa-piggy-bank"
                />
                <StatCard
                    title="Active Supporters"
                    value={totalDoner}
                    icon="fa-users"
                />
            </div>

            {/* ================= LOWER GRID ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10 items-start">


                {/* ================= ACTIVITY ================= */}
                <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-5">
                    <h2 className="text-sm font-semibold text-gray-900 mb-4">
                        Recent Payments
                    </h2>

                    <div className="space-y-3">
                        {recentPayments.map((payment, index) => (
                            <div
                                key={`payment-${index}`}
                                className="bg-gray-50 rounded-md p-3"
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-sm font-semibold text-red-800">
                                        ₹ {payment.amount}
                                    </p>
                                    <span className="text-xs text-gray-400">
                                        {payment.payment_date}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-700 truncate">
                                    Received from {payment.user.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-5">
                    <h2 className="text-sm font-semibold text-gray-900 mb-4">
                        Recent Expenses
                    </h2>

                    <div className="space-y-3">
                        {recentExpenses.map((expense, index) => (
                            <div
                                key={`expense-${index}`}
                                className="bg-gray-50 rounded-md p-3"
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-sm font-semibold text-red-800">
                                        ₹ {expense.amount}
                                    </p>
                                    <span className="text-xs text-gray-400">
                                        {expense.date}
                                    </span>
                                </div>

                                {/* DESCRIPTION WITH TRUNCATE */}
                                <p className="text-sm text-gray-700 line-clamp-2">
                                    {expense.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="bg-white rounded-lg shadow-sm p-5">
                    <h2 className="text-sm font-semibold text-gray-900 mb-4">
                        Quick Actions
                    </h2>

                    <div className="space-y-2">
                        <Action label="Add New Member" icon="fa-user" href="/admin/add-member-page" />
                        <Action label="Add Commitment" icon="fa-calendar-plus" href="/admin/commitments/create" />
                        <Action label="View Reports" icon="fa-file-alt" href="/admin/reports" />
                    </div>
                </div>


            </div>

        </AdminLayout>
    );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, icon }) {
    return (
        <div className="
            bg-white rounded-lg shadow-sm
            px-5 py-4
            hover:shadow transition
        ">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray-500">
                        {title}
                    </p>
                    <p className="text-xl font-semibold text-gray-900 mt-1">
                        {value}
                    </p>
                </div>

                <div className="
                    w-10 h-10 rounded-md
                    bg-red-50 text-red-700
                    flex items-center justify-center
                ">
                    <i className={`fas ${icon} text-sm`}></i>
                </div>
            </div>
        </div>
    );
}

function Activity({ text, time }) {
    return (
        <div className="flex items-start justify-between gap-4">
            <p className="text-sm text-gray-700 leading-relaxed">
                {text}
            </p>
            <span className="text-xs text-gray-400 whitespace-nowrap">
                {time}
            </span>
        </div>
    );
}

function Action({ label, icon, href }) {
    return (
        <Link
            href={href}
            className="
                flex items-center gap-3 px-3 py-2 rounded-md
                text-sm text-gray-700
                hover:bg-red-50 transition
            "
        >
            <div className="
                w-8 h-8 rounded-md
                bg-red-50 text-red-700
                flex items-center justify-center
            ">
                <i className={`fas ${icon} text-xs`}></i>
            </div>
            {label}
        </Link>
    );
}
