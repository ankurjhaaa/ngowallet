import AdminLayout from "@/layouts/AdminLayout";
import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";


export default function Dashboard() {
    const {
        totalCommitment,
        fund_raised,
        totalSpent,
        totalBalance,
        totalDoner,
        recentPayments = [],
        recentExpenses = [],
        allUsers = {},
        filters = {}
    } = usePage().props;

    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [search, setSearch] = useState(filters.search || "");

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

            {/* ================= PAYMENT MODAL ================= */}
            {/* ================= PAYMENT MODAL ================= */}
            {openPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setOpenPaymentModal(false)}
                    ></div>

                    {/* Modal */}
                    <div className="
            relative bg-white w-full max-w-2xl
            rounded-lg shadow-xl
            p-6 z-10
            max-h-[80vh] flex flex-col
        ">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Select Member for Payment
                            </h2>

                            <button
                                onClick={() => setOpenPaymentModal(false)}
                                className="text-gray-400 hover:text-red-700"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        {/* 🔍 SERVER SIDE SEARCH */}
                        <input
                            type="text"
                            placeholder="Search by name or phone..."
                            value={search}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearch(value);

                                router.get(
                                    "/admin/dashboard",
                                    { search: value },
                                    {
                                        preserveState: true,
                                        replace: true
                                    }
                                );
                            }}
                            className="
                    w-full h-10 px-4 rounded-md
                    border border-gray-300
                    text-sm
                    focus:outline-none
                    focus:ring-2 focus:ring-red-200
                    focus:border-red-300
                    mb-4
                "
                        />

                        {/* User List */}
                        <div className="flex-1 overflow-y-auto space-y-2 pr-2">

                            {allUsers?.data?.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center py-6">
                                    No members found
                                </p>
                            ) : (
                                allUsers.data.map(user => (
                                    <Link
                                        key={user.id}
                                        href={`/admin/userdetail/${user.id}`}
                                        className="
                                block p-3 rounded-md
                                bg-gray-50
                                hover:bg-red-50
                                transition
                            "
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {user.phone || user.email}
                                                </p>
                                            </div>

                                            <i className="fas fa-arrow-right text-red-700 text-sm"></i>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>

                        {/* Pagination */}
                        {allUsers?.links?.length > 1 && (
                            <div className="mt-4 flex justify-end gap-1 flex-wrap">
                                {allUsers.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || "#"}
                                        className={`
                                px-3 py-1 rounded-md text-xs
                                ${link.active
                                                ? "bg-red-800 text-white"
                                                : "bg-white text-gray-600 hover:bg-red-50"}
                                ${!link.url && "opacity-40 pointer-events-none"}
                            `}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            )}

            {/* ================= FLOATING ADD PAYMENT ================= */}
            {/* ================= FLOATING ADD PAYMENT ================= */}
            <button
                onClick={() => setOpenPaymentModal(true)}
                className="
        fixed bottom-6 right-6 z-40
        flex items-center gap-2
        px-5 h-12
        rounded-full
        bg-red-800 text-white
        shadow-lg
        hover:bg-red-900 hover:shadow-xl
        active:scale-95
        transition-all duration-200
    "
            >
                <i className="fas fa-money-bill-wave text-sm"></i>

                <span className="text-sm font-medium">
                    Add Payment
                </span>
            </button>



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
